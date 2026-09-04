import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/publisher";

export const metadata: Metadata = { title: "تجهيز الموقع للتقديم" };

const checks = [
  {
    title: "موقع محتوى أصلي",
    href: "/site",
    body: "اختيار: خمسة أدلة شراء بالعربية، ليست قائمة روابط.",
  },
  {
    title: "من نحن",
    href: "/site/about",
    body: "يوضح من يكتب ولماذا، وأنكم لستم متجر أمازون.",
  },
  {
    title: "سياسة خصوصية",
    href: "/site/privacy",
    body: "مطلوبة لشبكات العمولة وكثير من برامج أمازون.",
  },
  {
    title: "إفصاح العمولة",
    href: "/site/disclosure",
    body: "شرط أمانة للمعلن وللمنصات.",
  },
  {
    title: "صفحة تواصل",
    href: "/site/contact",
    body: "جهة اتصال ظاهرة. ضع بريدك الحقيقي قبل التقديم.",
  },
];

export default function SiteChecklistPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">المواقع والصفحات المطلوبة</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        أمازون أسوشيتس وأوين وبوكينغ يطلبون موقعًا حيًا بمحتوى حقيقي لا
        localhost على جهازك فقط.{" "}
        <Link href="/deploy" className="text-foreground underline">
          كيف تحصل على نطاق علني
        </Link>{" "}
        ثم عبّئ{" "}
        <Link href="/apply/amazon" className="text-foreground underline">
          طلب أسوشيتس
        </Link>
        .
      </p>
      <ol className="mt-8 space-y-4">
        {checks.map((item, index) => (
          <li key={item.href} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground">صفحة {index + 1}</p>
            <h2 className="mt-1 text-lg font-semibold">
              <Link href={item.href} className="hover:text-primary">
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>
      <section className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-7">
        <h2 className="font-semibold">المقالات الجاهزة ({articles.length})</h2>
        <ul className="mt-3 list-disc ps-5">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/site/${article.slug}`} className="hover:text-primary">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted-foreground">
          بعد القبول، أضف رقم تتبع أمازون إلى الروابط. لا نفتح الحساب عنك ولا
          نرفع هويتك.
        </p>
      </section>
    </div>
  );
}
