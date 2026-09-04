"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyField({
  label,
  value,
  hint,
  multiline,
}: {
  label: string;
  value: string;
  hint?: string;
  multiline?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          {hint ? (
            <p className="mt-1 text-xs leading-6 text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={copy}
          disabled={!value}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          {copied ? <Check /> : <Copy />}
          {copied ? "نُسخ" : "نسخ"}
        </button>
      </div>
      {multiline ? (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7">{value || "—"}</p>
      ) : (
        <p className="mt-3 break-all font-mono text-xs leading-6" dir="ltr">
          {value || "أدخل النطاق العلني أولًا"}
        </p>
      )}
    </div>
  );
}
