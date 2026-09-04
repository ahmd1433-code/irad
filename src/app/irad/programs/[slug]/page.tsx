import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgramCard } from "@/components/program-card";
import { SaveProgramButton } from "@/components/plan-board";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getProgram, getRelatedPrograms, programs } from "@/data/programs";
import { playbooks } from "@/data/playbooks";
import {
  capitalLabels,
  difficultyLabels,
  menaFitLabels,
  modelLabels,
  regionLabels,
} from "@/lib/labels";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "برنامج غير موجود" };
  return {
    title: program.nameAr,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const related = getRelatedPrograms(program.slug);
  const relatedPlaybook = playbooks.find((playbook) =>
    playbook.relatedPrograms.includes(program.slug)
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-muted-foreground">
        <Link href="/irad/programs" className="hover:text-primary">
          البرامج
        </Link>
        <span className="mx-2">/</span>
        {program.brand}
      </p>

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span
              className="flex size-12 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: program.accent }}
            >
              {program.brand.slice(0, 2)}
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {program.nameAr}
              </h1>
              <p className="text-sm text-muted-foreground">{program.nameEn}</p>
            </div>
          </div>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            {program.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {program.models.map((model) => (
              <Badge key={model} variant="secondary">
                {modelLabels[model]}
              </Badge>
            ))}
            <Badge variant="outline">{menaFitLabels[program.menaFit]}</Badge>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <a
            href={program.applyUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "justify-center")}
          >
            صفحة التسجيل الرسمية
          </a>
          {program.slug === "amazon-associates" ? (
            <Link
              href="/irad/apply/amazon"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "justify-center"
              )}
            >
              ماذا أكتب في الموقع والجوال
            </Link>
          ) : null}
          <SaveProgramButton slug={program.slug} />
        </div>
      </div>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="العمولة / الهامش" value={program.commission} />
        <Fact
          label="مدة الارتباط"
          value={
            program.cookieDays
              ? `${program.cookieDays} يوم`
              : "لا ينطبق — أنت البائع"
          }
        />
        <Fact label="رأس المال" value={capitalLabels[program.capital]} />
        <Fact label="الصعوبة" value={difficultyLabels[program.difficulty]} />
        <Fact label="الدفع" value={program.payout} />
        <Fact
          label="المناطق"
          value={program.regions.map((region) => regionLabels[region]).join("، ")}
        />
      </dl>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Block title="كيف يعمل" items={program.howItWorks} />
        <Block title="كيف تبدأ" items={program.howToStart} numbered />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold">لماذا يناسبك</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {program.pros.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold">ما الذي يعيقك</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {program.cons.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-7">
        <span className="font-medium">الأنسب لـ: </span>
        {program.bestFor}
      </p>

      {relatedPlaybook && (
        <p className="mt-6 text-sm">
          مسار عملي مرتبط:{" "}
          <Link
            href={`/irad/playbooks/${relatedPlaybook.slug}`}
            className="font-medium text-primary hover:underline"
          >
            {relatedPlaybook.title}
          </Link>
        </p>
      )}

      <section className="mt-14">
        <h2 className="text-xl font-semibold">برامج قريبة</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <ProgramCard key={item.slug} program={item} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm leading-6 font-medium">{value}</dd>
    </div>
  );
}

function Block({
  title,
  items,
  numbered,
}: {
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <ol className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-7">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {numbered ? index + 1 : "•"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
