import type { Metadata } from "next";
import Link from "next/link";
import { ZeroCapitalSetup } from "@/components/zero-capital-setup";

export const metadata: Metadata = {
  title: "تجهيز بلا رأس مال",
  description:
    "حزمة برامج العمولة التي لا تحتاج شراء بضاعة: أمازون، أوين، بوكينغ، تيك توك شوب، وعلي إكسبريس.",
};

export default function ZeroCapitalPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <p className="text-sm font-medium text-primary">بدون مخزون ولا إعلان مدفوع</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        تجهيز البرامج التي لا تحتاج رأس مال
      </h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        هذا ليس دروب شيبينغ ولا FBA. أنت تسوّق محتوى، والمنصة تبيع. الحزمة
        تضيف البرامج إلى خطتك وتربطها بمقالات موقع اختيار. التسجيل الرسمي
        والضريبة يبقيان بيدك. أولًا{" "}
        <Link href="/irad/deploy" className="text-foreground underline">
          انشر نطاقًا علنيًا
        </Link>
        ، ثم عبّئ{" "}
        <Link href="/irad/apply/amazon" className="text-foreground underline">
          طلب أمازون
        </Link>
        .
      </p>
      <div className="mt-8">
        <ZeroCapitalSetup />
      </div>
    </div>
  );
}
