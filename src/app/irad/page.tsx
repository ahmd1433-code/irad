import Link from "next/link";
import { PathQuiz } from "@/components/path-quiz";
import { ProgramCard } from "@/components/program-card";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedPrograms } from "@/data/programs";
import { modelHints, modelLabels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { Model } from "@/lib/types";

const models: Model[] = ["affiliate", "dropship", "reseller"];

export default function HomePage() {
  const featured = getFeaturedPrograms();

  return (
    <div>
      <section className="border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="text-sm font-medium text-primary">
              أمازون · إيباي · علي إكسبريس · نون · وأكثر
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.25] tracking-tight sm:text-5xl">
              المواقع الكبيرة لديها برامج شراكة. هذا الدليل يحوّلها إلى مسار إيراد.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              التسويق بالعمولة، الدروب شيبينغ، وإعادة البيع ثلاثة أعمال مختلفة.
              الخلط بينها هو سبب خسارة معظم من يقلّد فيديوهات «اربح من أمازون».
              اختر النموذج، ثم البرنامج، ثم خطوة واحدة هذا الأسبوع.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/irad/zero" className={cn(buttonVariants({ size: "lg" }))}>
                جهّز برامج بلا رأس مال
              </Link>
              <Link
                href="/"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                موقع المحتوى
              </Link>
            </div>
          </div>
          <PathQuiz />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold">ثلاثة نماذج — لا تخلطها</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          جيميني قد يذكر المنصات. ما ينقص عادة هو الفصل: هل تأخذ نسبة من بيع
          غيرك، أم تبيع بلا مخزون، أم تشتري بضاعة وتتحمّل المخاطرة؟
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {models.map((model) => (
            <article
              key={model}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="text-lg font-semibold">{modelLabels[model]}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {modelHints[model]}
              </p>
              <Link
                href={`/irad/programs?model=${model}`}
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                برامج هذا النموذج
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <Stat
            title="بلا رأس مال"
            body="عمولة أمازون، أوين، بوكينغ، وتيك توك شوب. وقودك المحتوى لا المخزون."
          />
          <Stat
            title="برامج لا تُذكر غالبًا"
            body="شبكات أوين وسي جيه وشير أسيل تفتح علامات سفر وأزياء وبرمجيات أبعد من ثلاث منصات."
          />
          <Stat
            title="المنطقة أولًا"
            body="جمهور الرياض ودبي والقاهرة يشتري من نون وأمازون المحلي وجوميا، لا من رابط أمريكي بطيء."
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">برامج تستحق البداية</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              المنصات التي سألت عنها، وأخرى تعمل في السوق العربي.
            </p>
          </div>
          <Link href="/irad/programs" className="text-sm font-medium text-primary">
            الدليل كاملًا
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.slice(0, 6).map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-primary-foreground/80">{body}</p>
    </div>
  );
}
