import type { Metadata } from "next";
import { publisher } from "@/data/publisher";

export const metadata: Metadata = { title: "سياسة الخصوصية" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">سياسة الخصوصية</h1>
      <div className="mt-6 space-y-4 text-sm leading-8 text-muted-foreground">
        <p>آخر تحديث: ٤ سبتمبر ٢٠٢٦.</p>
        <p>
          {publisher.name} موقع محتوى. لا نطلب إنشاء حساب لقراءة المقالات. إن
          راسلتنا عبر النموذج، نستخدم اسمك وبريدك فقط للرد، ولا نبيعهما.
        </p>
        <p>
          قد يُخزَّن تفضيل محلي في متصفحك لأدوات إيراد (الخطة والوكيل) عبر
          localStorage على نفس النطاق. هذا لا يُرسل إلى خادمنا ما لم تنشر الموقع
          على استضافة تجمع سجلات تقنية اعتيادية (عنوان IP، المتصفح) لتشغيل
          الخدمة.
        </p>
        <p>
          روابط العمولة قد تضع ملفات تعريف ارتباط لدى أمازون أو الشبكة الشريكة
          وفق سياساتهم. راجع سياسة خصوصية تلك المنصات.
        </p>
        <p>
          للاستفسار عن البيانات استخدم صفحة التواصل والبريد الظاهر عليها.
        </p>
      </div>
    </article>
  );
}
