"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= questions.length;
  const question = questions[step];
  const result = useMemo(
    () => (done ? recommend(answers) : null),
    [answers, done]
  );

  return (
    <Card className="border-primary/15 bg-card">
      <CardHeader>
        <CardTitle>أي مسار يناسبك الآن؟</CardTitle>
        <CardDescription>
          أربعة أسئلة. لا خوارزمية سحرية: النتيجة تمنعك من تقليد فيديو دروب شيبينغ إن كان رأس مالك صفرًا.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {!done && question && (
          <>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                سؤال {step + 1} من {questions.length}
              </span>
              <span className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full bg-primary transition-all"
                  style={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                />
              </span>
            </div>
            <p className="text-base font-medium">{question.title}</p>
            <div className="grid gap-2">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: option.value,
                    }));
                    setStep((current) => current + 1);
                  }}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-start text-sm leading-6 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}

        {result && (
          <div className="space-y-4">
            <div className="rounded-xl bg-primary/8 p-4">
              <p className="text-xs font-medium text-primary">التوصية</p>
              <h3 className="mt-1 text-xl font-semibold">{result.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {result.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.programSlugs.map((slug) => {
                const program = programs.find((item) => item.slug === slug);
                if (!program) return null;
                return (
                  <Link
                    key={slug}
                    href={`/programs/${slug}`}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:border-primary"
                  >
                    {program.nameAr}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/playbooks/${result.playbookSlug}`}
                className={cn(buttonVariants())}
              >
                اقرأ المسار كاملًا
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                }}
              >
                أعد الأسئلة
              </Button>
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
