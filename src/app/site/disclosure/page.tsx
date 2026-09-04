import type { Metadata } from "next";

export const metadata: Metadata = { title: "إفصاح العمولة" };

export default function DisclosurePage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">إفصاح روابط العمولة</h1>
      <div className="mt-6 space-y-4 text-sm leading-8 text-muted-foreground">
        <p>
          بعض الروابط في {`اختيار`} قد تكون روابط تسويق بالعمولة. إذا اشتريت عبرها
          قد نحصل على عمولة دون زيادة السعر عليك. هذا لا يغيّر ترتيب النص حسب
          أعلى عمولة؛ إن فعلنا ذلك لاحقًا سنذكره في المقال.
        </p>
        <p>
          نشارك في برامج مثل Amazon Associates وبرامج شبكات أخرى عندما نُقبل
          فيها. إلى أن يُربط رقم التتبع، قد يفتح الرابط بحث أمازون أو الصفحة
          الرسمية بلا عمولة.
        </p>
        <p>
          أنت تشتري من المنصة لا منا. الضمان، الشحن، والإرجاع حسب سياسة البائع
          والمتجر.
        </p>
      </div>
    </article>
  );
}
