"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { programs } from "@/data/programs";
import { useSavedPrograms } from "@/hooks/use-saved-programs";
import { statusLabels } from "@/lib/labels";
import type { SavedStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SaveProgramButton({ slug }: { slug: string }) {
  const { isSaved, save, remove } = useSavedPrograms();
  const saved = isSaved(slug);

  if (saved) {
    return (
      <div className="flex flex-wrap gap-2">
        <Link
          href="/irad/plan"
          className={cn(buttonVariants({ variant: "secondary" }), "justify-center")}
        >
          داخل خطتك — اعرضها
        </Link>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "ghost" }))}
          onClick={() => remove(slug)}
        >
          إزالة
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "outline" }), "justify-center")}
      onClick={() => save(slug)}
    >
      احفظ في خطتي
    </button>
  );
}

export function PlanBoard() {
  const { items, update, remove } = useSavedPrograms();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <p className="text-lg font-medium">خطتك فارغة</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          أضف برامجًا من دليل البرامج حتى لا تبقى الفكرة في المحادثة. الخطة
          تُحفظ في هذا المتصفح فقط.
        </p>
        <Link
          href="/irad/programs"
          className={cn(buttonVariants(), "mt-5 inline-flex")}
        >
          تصفح البرامج
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const program = programs.find((entry) => entry.slug === item.slug);
        if (!program) return null;
        return (
          <article
            key={item.slug}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link
                  href={`/irad/programs/${program.slug}`}
                  className="text-lg font-semibold hover:text-primary"
                >
                  {program.nameAr}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {program.commission}
                </p>
              </div>
              <select
                className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                value={item.status}
                onChange={(event) =>
                  update(item.slug, {
                    status: event.target.value as SavedStatus,
                  })
                }
              >
                {(Object.keys(statusLabels) as SavedStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="mt-4 min-h-24 w-full rounded-xl border border-input bg-transparent p-3 text-sm"
              placeholder="ملاحظة: تاريخ التقديم، رابط الحساب، ما الذي يمنعك..."
              value={item.note}
              onChange={(event) =>
                update(item.slug, { note: event.target.value })
              }
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={program.applyUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                صفحة التسجيل
              </a>
              <button
                type="button"
                className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
                onClick={() => remove(item.slug)}
              >
                حذف
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
