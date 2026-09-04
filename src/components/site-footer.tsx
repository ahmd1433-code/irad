import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="max-w-md">
          <p className="font-semibold">إيراد</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            دليل عملي لبرامج التسويق بالعمولة والدروب شيبينغ وإعادة البيع.
            النسب والشروط تتغير؛ تحقق دائمًا من الصفحة الرسمية قبل التسجيل.
            هذا المحتوى تعليمي وليس استشارة مالية. هذه الصفحات ليست جزءًا من
            موقع «اختيار» الذي يراجعه أمازون.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/irad/programs" className="hover:text-primary">
            البرامج
          </Link>
          <Link href="/irad/playbooks" className="hover:text-primary">
            المسارات
          </Link>
          <Link href="/irad/calculator" className="hover:text-primary">
            الحاسبة
          </Link>
          <Link href="/irad/compare" className="hover:text-primary">
            المقارنة
          </Link>
          <Link href="/irad/zero" className="hover:text-primary">
            بلا رأس مال
          </Link>
          <Link href="/irad/deploy" className="hover:text-primary">
            نطاق علني
          </Link>
          <Link href="/irad/apply/amazon" className="hover:text-primary">
            طلب أمازون
          </Link>
          <Link href="/" className="hover:text-primary">
            موقع المحتوى
          </Link>
          <Link href="/irad/agent" className="hover:text-primary">
            الوكيل
          </Link>
          <Link href="/irad/plan" className="hover:text-primary">
            خطتي
          </Link>
        </div>
      </div>
    </footer>
  );
}
