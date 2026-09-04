import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/publisher";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "مقال غير موجود" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const amazonUrl = `https://www.amazon.sa/s?k=${encodeURIComponent(article.amazonQuery)}`;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-xs text-muted-foreground">
        {article.category} · محدّث {article.updated}
      </p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight">{article.title}</h1>
      <p className="mt-4 rounded-xl bg-secondary p-4 text-sm leading-7 text-muted-foreground">
        إفصاح: قد يحتوي المقال على روابط عمولة. إن اشتريت عبرها قد نحصل على
        عمولة. التفاصيل في{" "}
        <Link href="/site/disclosure" className="underline">
          صفحة الإفصاح
        </Link>
        .
      </p>
      <div className="mt-8 space-y-6">
        {article.body.map((block) => (
          <section key={block.heading ?? block.paragraphs[0]}>
            {block.heading ? (
              <h2 className="text-xl font-semibold">{block.heading}</h2>
            ) : null}
            {block.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-3 text-sm leading-8 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm">
        ابحث عن المنتج على أمازون السعودية:{" "}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline"
        >
          {article.amazonQuery}
        </a>
      </p>
    </article>
  );
}
