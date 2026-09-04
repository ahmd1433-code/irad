"use client";

import { useState } from "react";
import Link from "next/link";
import { getProgram } from "@/data/programs";
import { zeroCapitalPack, zeroCapitalWeek } from "@/data/zero-capital";
import { useAgentSettings } from "@/hooks/use-agent-settings";
import { useSavedPrograms } from "@/hooks/use-saved-programs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ZeroCapitalSetup() {
  const { save, update, isSaved } = useSavedPrograms();
  const { profile, setProfile } = useAgentSettings();
  const [done, setDone] = useState(false);

  function prepare() {
    setProfile({ ...profile, capital: "none" });
    for (const item of zeroCapitalPack) {
      save(item.slug, "considering");
      update(item.slug, {
        note: `[بلا رأس مال] ${item.weekTask}`,
      });
    }
    setDone(true);
  }

  return (
    <div className="space-y-8">
      <ol className="space-y-3 text-sm leading-7">
        {zeroCapitalWeek.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <div className="grid gap-4">
        {zeroCapitalPack.map((item) => {
          const program = getProgram(item.slug);
          if (!program) return null;
          return (
            <article
              key={item.slug}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">{program.nameAr}</h2>
                <span className="text-xs text-muted-foreground">
                  {isSaved(item.slug) ? "في خطتك" : "بدون رأس مال"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {program.summary}
              </p>
              <p className="mt-3 text-sm leading-7">
                <span className="font-medium">هذا الأسبوع: </span>
                {item.weekTask}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {program.slug === "amazon-associates" ? (
                  <Link
                    href="/apply/amazon"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    تعبئة الموقع والجوال
                  </Link>
                ) : null}
                <Link
                  href={`/programs/${program.slug}`}
                  className="text-xs text-primary hover:underline"
                >
                  تفاصيل البرنامج
                </Link>
                {item.siteHrefs.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-xs text-primary hover:underline"
                  >
                    محتوى جاهز
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {done ? (
        <p className="rounded-2xl bg-primary p-5 text-sm leading-7 text-primary-foreground">
          أُضيفت الحزمة إلى خطتك مع ملاحظات الأسبوع، وجُعل ملف الوكيل «بلا رأس
          مال». سجّل في المنصات بنفسك بعد نشر موقع اختيار على نطاق عام.{" "}
          <Link href="/plan" className="underline">
            افتح خطتي
          </Link>
        </p>
      ) : (
        <button
          type="button"
          className={cn(buttonVariants({ size: "lg" }))}
          onClick={prepare}
        >
          أضف الحزمة إلى خطتي بلا إنفاق
        </button>
      )}
    </div>
  );
}
