"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { programs } from "@/data/programs";
import {
  capitalLabels,
  difficultyLabels,
  menaFitLabels,
  modelLabels,
} from "@/lib/labels";
import { cn } from "@/lib/utils";

export function CompareBoard() {
  const [selected, setSelected] = useState<string[]>([
    "amazon-associates",
    "aliexpress-affiliate",
    "noon-seller",
  ]);

  const chosen = useMemo(
    () => programs.filter((program) => selected.includes(program.slug)),
    [selected]
  );

  function toggle(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }
      if (current.length >= 3) {
        return [...current.slice(1), slug];
      }
      return [...current, slug];
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm text-muted-foreground">
          اختر حتى ثلاثة برامج
        </p>
        <div className="flex flex-wrap gap-2">
          {programs.map((program) => {
            const active = selected.includes(program.slug);
            return (
              <button
                key={program.slug}
                type="button"
                onClick={() => toggle(program.slug)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50"
                )}
              >
                {program.nameAr}
              </button>
            );
          })}
        </div>
      </div>

      {chosen.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          اختر برنامجًا واحدًا على الأقل لتظهر المقارنة.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-start">
                <th className="p-4 font-medium">البند</th>
                {chosen.map((program) => (
                  <th key={program.slug} className="p-4 font-medium">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="hover:text-primary hover:underline"
                    >
                      {program.nameAr}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row
                label="النموذج"
                values={chosen.map((program) =>
                  program.models.map((model) => modelLabels[model]).join("، ")
                )}
              />
              <Row
                label="العمولة / الهامش"
                values={chosen.map((program) => program.commission)}
              />
              <Row
                label="مدة الارتباط"
                values={chosen.map((program) =>
                  program.cookieDays
                    ? `${program.cookieDays} يوم`
                    : "لا ينطبق — أنت البائع"
                )}
              />
              <Row
                label="رأس المال"
                values={chosen.map(
                  (program) => capitalLabels[program.capital]
                )}
              />
              <Row
                label="الصعوبة"
                values={chosen.map(
                  (program) => difficultyLabels[program.difficulty]
                )}
              />
              <Row
                label="ملاءمة المنطقة"
                values={chosen.map((program) => menaFitLabels[program.menaFit])}
              />
              <Row
                label="الدفع"
                values={chosen.map((program) => program.payout)}
              />
              <Row
                label="الأنسب لـ"
                values={chosen.map((program) => program.bestFor)}
              />
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {chosen.map((program) => (
          <Button key={program.slug} variant="outline" size="sm" render={<a href={program.applyUrl} target="_blank" rel="noreferrer" />}>
            سجّل في {program.brand}
          </Button>
        ))}
      </div>
    </div>
  );
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b last:border-0">
      <th className="bg-secondary/30 p-4 text-start align-top font-medium text-muted-foreground">
        {label}
      </th>
      {values.map((value, index) => (
        <td key={`${label}-${index}`} className="p-4 align-top leading-7">
          {value}
        </td>
      ))}
    </tr>
  );
}
