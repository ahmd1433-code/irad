import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgramCard } from "@/components/program-card";
import { getPlaybook, playbooks } from "@/data/playbooks";
import { getProgram } from "@/data/programs";
import { capitalLabels } from "@/lib/labels";

export function generateStaticParams() {
  return playbooks.map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const playbook = getPlaybook(slug);
  if (!playbook) return { title: "مسار غير موجود" };
  return { title: playbook.title, description: playbook.subtitle };
}

export default async function PlaybookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = getPlaybook(slug);
  if (!playbook) notFound();

  const related = playbook.relatedPrograms
    .map((item) => getProgram(item))
    .filter((item) => item !== undefined);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <p className="text-sm text-muted-foreground">
        <Link href="/irad/playbooks" className="hover:text-primary">
          المسارات
        </Link>
        <span className="mx-2">/</span>
        {playbook.duration}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {playbook.title}
      </h1>
      <p className="mt-3 text-base leading-8 text-muted-foreground">
        {playbook.subtitle}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        {capitalLabels[playbook.capital]}
      </p>

      <ol className="mt-10 space-y-6">
        {playbook.steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-medium text-primary">خطوة {index + 1}</p>
            <h2 className="mt-1 text-lg font-semibold">{step.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-2xl bg-secondary p-5">
        <h2 className="font-semibold">أخطاء توقف الإيراد</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
          {playbook.pitfalls.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">برامج هذا المسار</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((program) => (
            <ProgramCard key={program.slug} program={program} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
