import type { Metadata } from "next";
import Link from "next/link";
import { playbooks } from "@/data/playbooks";
import { capitalLabels, modelLabels } from "@/lib/labels";

export const metadata: Metadata = {
  title: "المسارات",
  description: "خطوات عملية للانطلاق في العمولة أو الدروب شيبينغ أو إعادة البيع.",
};

export default function PlaybooksPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">المسارات</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        البرنامج بلا ترتيب عمل يبقى حسابًا مفتوحًا بلا إيراد. كل مسار هنا يحدد
        ماذا تفعل هذا الأسبوع، وما الذي يجب أن تتجاهله.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {playbooks.map((playbook) => (
          <Link
            key={playbook.slug}
            href={`/playbooks/${playbook.slug}`}
            className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-xs text-muted-foreground">{playbook.duration}</p>
            <h2 className="mt-2 text-xl font-semibold">{playbook.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {playbook.subtitle}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {capitalLabels[playbook.capital]} ·{" "}
              {playbook.models.map((model) => modelLabels[model]).join("، ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
