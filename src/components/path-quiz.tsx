"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { programs } from "@/data/programs";
import { playbooks } from "@/data/playbooks";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: "capital",
    title: "كم رأس المال الذي تستطيع المخاطرة به؟",
    options: [
      { value: "none", label: "صفر: لا أريد شراء بضاعة" },
      { value: "low", label: "منخفض: تجربة إعلانات أو عينات" },
      { value: "medium", label: "متوسط: مخزون صغير محلي" },
      { value: "high", label: "عالٍ: جاهز لـ FBA أو مستودع" },
    ],
  },
  {
    id: "audience",
    title: "هل لديك جمهور يثق بك؟",
    options: [
      { value: "none", label: "لا، أبدأ من صفر" },
      { value: "small", label: "حساب صغير أو موقع جديد" },
      { value: "large", label: "جمهور يتفاعل ويشتري" },
    ],
  },
  {
    id: "time",
    title: "كم ساعة في الأسبوع؟",
    options: [
      { value: "low", label: "أقل من ٦ ساعات" },
      { value: "mid", label: "٦ إلى ١٥ ساعة" },
      { value: "high", label: "أكثر من ١٥ ساعة" },
    ],
  },
  {
    id: "skill",
    title: "أين قوتك؟",
    options: [
      { value: "content", label: "كتابة أو فيديو أو شرح" },
      { value: "store", label: "تسعير وتوريد وخدمة عميل" },
      { value: "social", label: "الظهور أمام الكاميرا يوميًا" },
    ],
  },
] as const;

type Answers = Record<string, string>;

function recommend(answers: Answers) {
  const { capital, audience, skill } = answers;
  if (skill === "social") {
    return {
      title: "البيع بالمحتوى القصير",
      body: "ابدأ بتيك توك شوب أو برنامج مؤثرين أمازون. العمولة تأتي من المشاهدة، لا من بناء متجر معقّد.",
      programSlugs: ["tiktok-shop", "amazon-influencer", "shein-affiliate"],
      playbookSlug: "short-video-commerce",
    };
  }
  if (capital === "high" || (capital === "medium" && skill === "store")) {
    return {
      title: "التاجر على المنصات",
      body: "رأس مالك يسمح بإعادة البيع. أمازون FBA أو نون أقرب لجمهور الخليج من الدروب شيبينغ البطيء.",
      programSlugs: ["amazon-fba", "noon-seller", "salla-zid"],
      playbookSlug: "gulf-marketplaces",
    };
  }
  if (capital === "low" && skill === "store") {
    return {
      title: "اختبار دروب شيبينغ محدود",
      body: "لا تفتح إمبراطورية. متجر فئة واحدة، مورّد شحنه سريع، وسقف إعلانات واضح.",
      programSlugs: ["aliexpress-dropship", "salla-zid", "aliexpress-affiliate"],
      playbookSlug: "dropship-eyes-open",
    };
  }
  if (audience === "none") {
    return {
      title: "ابنِ أصلًا ثم عمولة",
      body: "بدون جمهور لا تشتري إعلانات عمولة عشوائية. اكتب مقارنات في نيش يُشترى، وقدّم على أمازون وأوين.",
      programSlugs: ["amazon-associates", "awin", "booking-affiliate"],
      playbookSlug: "affiliate-week",
    };
  }
  return {
    title: "مسوّق بالعمولة متعدد البرامج",
    body: "لديك محتوى أو نواة جمهور. أمازون للمحلي، شبكة للعلامات، وكليك بانك فقط إن كنت تبيع معرفة تثق بها.",
    programSlugs: ["amazon-associates", "awin", "clickbank"],
    playbookSlug: "beyond-amazon",
  };
}

export function PathQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const complete = questions.every((question) => answers[question.id]);
  const result = useMemo(
    () => (submitted && complete ? recommend(answers) : null),
    [answers, complete, submitted]
  );

  function choose(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setSubmitted(false);
  }

  return (
    <Card className="border-primary/15 bg-card">
      <CardHeader>
        <CardTitle>أي مسار يناسبك الآن؟</CardTitle>
        <CardDescription>
          أجب عن الأسئلة الأربعة ثم اعرض التوصية. النتيجة تمنعك من تقليد فيديو
          دروب شيبينغ إن كان رأس مالك صفرًا.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!result ? (
          <>
            {questions.map((question, index) => (
              <fieldset key={question.id} className="space-y-2">
                <legend className="text-sm font-medium">
                  {index + 1}. {question.title}
                </legend>
                <div className="grid gap-2">
                  {question.options.map((option) => {
                    const active = answers[question.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => choose(question.id, option.value)}
                        className={cn(
                          "cursor-pointer rounded-xl border px-4 py-3 text-start text-sm leading-6 transition-colors",
                          active
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background hover:border-primary hover:bg-primary/5"
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <button
              type="button"
              disabled={!complete}
              onClick={() => setSubmitted(true)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full cursor-pointer disabled:opacity-50"
              )}
            >
              اعرض التوصية
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl bg-primary p-4 text-primary-foreground">
              <p className="text-xs font-medium opacity-80">التوصية</p>
              <h3 className="mt-1 text-xl font-semibold">{result.title}</h3>
              <p className="mt-2 text-sm leading-7 opacity-90">{result.body}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.programSlugs.map((slug) => {
                const program = programs.find((item) => item.slug === slug);
                if (!program) return null;
                return (
                  <Link
                    key={slug}
                    href={`/irad/programs/${slug}`}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:border-primary"
                  >
                    {program.nameAr}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/irad/playbooks/${result.playbookSlug}`}
                className={cn(buttonVariants())}
              >
                اقرأ المسار كاملًا
              </Link>
              <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                }}
              >
                أعد الأسئلة
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              المسار المقترح:{" "}
              {playbooks.find((item) => item.slug === result.playbookSlug)?.title}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
