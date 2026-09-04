import type { Metadata } from "next";
import Link from "next/link";
import { publisher } from "@/data/publisher";

export const metadata: Metadata = { title: "من نحن" };

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">من نحن</h1>
      <div className="mt-6 space-y-4 text-sm leading-8 text-muted-foreground">
        <p>
          {publisher.name} ({publisher.nameEn}) موقع تحريري عربي يشرح قرارات
          الشراء اليومية: المنزل في المناخ المغبر، مستلزمات المولود، أدوات العمل
          من البيت، والسفر القصير. نكتب لنقلّل الشراء العشوائي، لا لنملأ سلة.
        </p>
        <p>
          لسنا متجرًا ولا مستودعًا ولا خدمة شحن. المقالات أدلة اختيار؛ الشراء — إن
          قررت — يتم على المنصة التي تختارها، بضمانها وسياسة إرجاعها.
        </p>
        <p>
          عندما يحتوي المقال على رابط قد يدرّ عمولة، نذكر ذلك في الصفحة وفي{" "}
          <Link href="/site/disclosure" className="text-foreground underline">
            إفصاح العمولة
          </Link>
          . الترتيب في النص حسب فائدة القارئ لا حسب أعلى نسبة.
        </p>
        <p>
          إن وجدت خطأً في دليل أو أردت تصحيح تجربة استخدام، راسلنا من صفحة
          التواصل. لا نقدم استشارة طبية أو مالية.
        </p>
      </div>
    </article>
  );
}
