import type { Metadata } from "next";
import { publisher } from "@/data/publisher";

export const metadata: Metadata = { title: "من نحن" };

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">من نحن</h1>
      <div className="mt-6 space-y-4 text-sm leading-8 text-muted-foreground">
        <p>
          {publisher.name} موقع تحريري عربي يشرح قرارات الشراء اليومية: المنزل،
          المطبخ، الأطفال، وأدوات العمل من البيت. نكتب لنقلّل الشراء العشوائي،
          لا لنملأ سلة.
        </p>
        <p>
          الموقع جزء من مشروع إيراد لتجهيز ناشر يمكنه التقديم على برامج العمولة
          (أمازون أسوشيتس، أوين، بوكينغ وغيرها) بمحتوى أصلي وصفحات قانونية
          واضحة. نحن لسنا أمازون ولسنا متجرًا.
        </p>
        <p>
          إن وجدت خطأً في دليل أو أردت تصحيح تجربة استخدام، راسلنا من صفحة
          التواصل. لا نقدم استشارة طبية أو مالية.
        </p>
      </div>
    </article>
  );
}
