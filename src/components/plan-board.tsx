"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { programs } from "@/data/programs";
import { useSavedPrograms } from "@/hooks/use-saved-programs";
import { statusLabels } from "@/lib/labels";
import type { SavedStatus } from "@/lib/types";

export function SaveProgramButton({ slug }: { slug: string }) {
  const { isSaved, save, remove, ready } = useSavedPrograms();
  const saved = isSaved(slug);

  if (!ready) {
    return (
      <Button variant="outline" disabled>
        حفظ في خطتي
      </Button>
    );
  }

  if (saved) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" render={<Link href="/plan" />}>
          داخل خطتك
        </Button>
        <Button variant="ghost" onClick={() => remove(slug)}>
          إزالة
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={() => save(slug)}>
      احفظ في خطتي
    </Button>
  );
}

export function PlanBoard() {
  const { items, ready, update, remove } = useSavedPrograms();

  if (!ready) {
    return (
      <p className="text-sm text-muted-foreground">نحمّل خطتك المحفوظة…</p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <p className="text-lg font-medium">خطتك فارغة</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          أضف برامجًا من دليل البرامج حتى لا تبقى الفكرة في المحادثة. الخطة
          تُحفظ في هذا المتصفح فقط.
        </p>
        <Button className="mt-5" render={<Link href="/programs" />}>
          تصفح البرامج
        </Button>
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
                  href={`/programs/${program.slug}`}
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
              <Button
                size="sm"
                render={
                  <a
                    href={program.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                صفحة التسجيل
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => remove(item.slug)}
              >
                حذف
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
