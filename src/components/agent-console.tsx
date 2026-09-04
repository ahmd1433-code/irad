"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { runAgent } from "@/lib/agent/engine";
import {
  defaultPermissions,
  delegatedLabels,
  lockedLabels,
  type AgentAction,
  type AgentRun,
  type DelegatedPermission,
} from "@/lib/agent/types";
import { useAgentSettings } from "@/hooks/use-agent-settings";
import { useSavedPrograms } from "@/hooks/use-saved-programs";
import type { SavedProgram } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const presets = [
  "شغّل أسبوع العمل",
  "أضف برامج بدون رأس مال",
  "اقترح مسارًا يناسبني",
  "سجّلني في أمازون",
];

function commandsFromDo(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (part === "week" || part === "weekly") return "شغّل أسبوع العمل";
      if (part === "amazon") return "سجّلني في أمازون";
      if (part === "zero") return "أضف برامج بدون رأس مال";
      return part;
    });
}

export function AgentConsole({ initialDo }: { initialDo?: string }) {
  const { items, save, update } = useSavedPrograms();
  const { permissions, profile, log, setPermissions, setProfile, appendRun } =
    useAgentSettings();
  const queued = commandsFromDo(initialDo);
  const [command, setCommand] = useState(
    queued[0] ?? "شغّل أسبوع العمل"
  );
  const [sessionRuns, setSessionRuns] = useState<AgentRun[]>([]);
  const didAutorun = useRef(false);

  function applyToPlan(run: AgentRun, plan: SavedProgram[]): SavedProgram[] {
    let next = plan;
    for (const item of run.executed) {
      if (item.kind === "add_program" && item.slug) {
        save(item.slug, "considering");
        if (!next.some((entry) => entry.slug === item.slug)) {
          next = [
            ...next,
            { slug: item.slug, status: "considering", note: "" },
          ];
        }
      }
      if (item.kind === "write_note" && item.slug && item.note) {
        update(item.slug, { note: item.note });
        next = next.map((entry) =>
          entry.slug === item.slug ? { ...entry, note: item.note ?? "" } : entry
        );
      }
      if (item.kind === "update_status" && item.slug && item.status) {
        save(item.slug, item.status);
        update(item.slug, { status: item.status });
        next = next.map((entry) =>
          entry.slug === item.slug ? { ...entry, status: item.status! } : entry
        );
      }
    }
    return next;
  }

  function runSequence(commands: string[]) {
    let plan = items;
    const produced: AgentRun[] = [];
    for (const nextCommand of commands) {
      const result = runAgent({
        command: nextCommand,
        plan,
        permissions,
        profile,
      });
      plan = applyToPlan(result, plan);
      appendRun(result);
      produced.push(result);
    }
    if (produced.length) setSessionRuns(produced);
  }

  useEffect(() => {
    if (!queued.length || didAutorun.current) return;
    didAutorun.current = true;
    runSequence(queued);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run URL commands a single time
  }, []);

  const visibleRuns = sessionRuns.length ? sessionRuns : log[0] ? [log[0]] : [];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold">حدود لا يتجاوزها</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          الإدارة كاملة داخل خطتك المحلية. الأمور الضرورية — المال، الهوية،
          والتسجيل الرسمي — تبقى بيدك حتى لو طلبت منه ذلك صراحة.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.values(lockedLabels).map((item) => (
            <li key={item.title} className="rounded-xl bg-secondary/70 p-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">الصلاحيات الممنوحة</h2>
          <p className="text-sm text-muted-foreground">
            عطّل ما لا تريد أن ينفّذه وحده. الطلبات خارج هذه القائمة تُعرض
            ولا تُنفَّذ.
          </p>
          {(Object.keys(delegatedLabels) as DelegatedPermission[]).map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3"
            >
              <input
                type="checkbox"
                className="mt-1 size-4"
                checked={permissions[key]}
                onChange={(event) =>
                  setPermissions({
                    ...permissions,
                    [key]: event.target.checked,
                  })
                }
              />
              <span>
                <span className="block text-sm font-medium">
                  {delegatedLabels[key].title}
                </span>
                <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                  {delegatedLabels[key].body}
                </span>
              </span>
            </label>
          ))}
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            onClick={() => setPermissions(defaultPermissions)}
          >
            إعادة الصلاحيات الافتراضية
          </button>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">ملف العمل</h2>
          <Field
            label="رأس المال"
            value={profile.capital}
            onChange={(value) =>
              setProfile({
                ...profile,
                capital: value as typeof profile.capital,
              })
            }
            options={[
              ["none", "صفر"],
              ["low", "منخفض"],
              ["medium", "متوسط"],
              ["high", "عالٍ"],
            ]}
          />
          <Field
            label="السوق"
            value={profile.region}
            onChange={(value) =>
              setProfile({
                ...profile,
                region: value as typeof profile.region,
              })
            }
            options={[
              ["mena", "الشرق الأوسط"],
              ["ksa", "السعودية"],
              ["uae", "الإمارات"],
              ["egypt", "مصر"],
            ]}
          />
          <Field
            label="قوتك"
            value={profile.skill}
            onChange={(value) =>
              setProfile({ ...profile, skill: value as typeof profile.skill })
            }
            options={[
              ["content", "محتوى"],
              ["store", "متجر وتوريد"],
              ["social", "كاميرا ومقاطع"],
            ]}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold">أمر للوكيل</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary"
              onClick={() => setCommand(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <textarea
          className="mt-4 min-h-24 w-full rounded-xl border border-input bg-transparent p-3 text-sm"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
        />
        <button
          type="button"
          className={cn(buttonVariants({ size: "lg" }), "mt-4")}
          onClick={() => runSequence([command])}
        >
          نفّذ ضمن صلاحياتي
        </button>
      </section>

      {visibleRuns.map((run) => (
        <RunCard key={`${run.at}-${run.command}`} run={run} />
      ))}

      {log.length > visibleRuns.length ? (
        <section>
          <h2 className="text-lg font-semibold">سجل التشغيل</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {log
              .filter(
                (item) =>
                  !visibleRuns.some(
                    (run) => run.at === item.at && run.command === item.command
                  )
              )
              .slice(0, 6)
              .map((item) => (
              <li key={item.at} className="rounded-xl border border-border p-3">
                <p className="font-medium text-foreground">{item.command}</p>
                <p className="mt-1">{item.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <select
        className="mt-1 h-9 w-full rounded-lg border border-input bg-transparent px-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(([key, name]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function RunCard({ run }: { run: AgentRun }) {
  return (
    <section className="space-y-4 rounded-2xl border border-primary/20 bg-card p-5">
      <div>
        <p className="text-xs text-muted-foreground">آخر تشغيل</p>
        <h2 className="mt-1 text-lg font-semibold">{run.command}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {run.summary}
        </p>
        <Link href="/irad/plan" className="mt-3 inline-block text-sm text-primary">
          اعرض خطتي بعد التنفيذ
        </Link>
      </div>
      <Group title="نُفِّذ" items={run.executed} empty="لا شيء ضمن الصلاحيات الحالية." />
      <Group
        title="بانتظار صلاحية"
        items={run.needsYou}
        empty="لا إجراءات معلّقة على صلاحية."
      />
      <Group
        title="ضروري — بيدك أنت"
        items={run.locked}
        empty="لا قرارات حرجة في هذا الأمر."
      />
    </section>
  );
}

function Group({
  title,
  items,
  empty,
}: {
  title: string;
  items: AgentAction[];
  empty: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl bg-secondary/60 p-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                {item.detail}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-2 inline-block text-xs font-medium text-primary"
                >
                  {item.kind === "open_apply" ? "افتح الصفحة الرسمية بنفسك" : "افتح"}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
