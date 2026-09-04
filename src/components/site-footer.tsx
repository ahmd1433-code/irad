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
            هذا المحتوى تعليمي وليس استشارة مالية.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/programs" className="hover:text-primary">
            البرامج
          </Link>
          <Link href="/playbooks" className="hover:text-primary">
            المسارات
          </Link>
          <Link href="/calculator" className="hover:text-primary">
            الحاسبة
          </Link>
          <Link href="/compare" className="hover:text-primary">
            المقارنة
          </Link>
          <Link href="/plan" className="hover:text-primary">
            خطتي
          </Link>
        </div>
      </div>
    </footer>
  );
}
