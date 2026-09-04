import Link from "next/link";
import { articles, publisher } from "@/data/publisher";

export default function PublisherHomePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-sm text-primary">{publisher.nameEn}</p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight">
        {publisher.name}
      </h1>
      <p className="mt-4 text-base leading-8 text-muted-foreground">
        {publisher.tagline} لا نبيع منتجات من مستودعنا. نكتب كيف تختار، ونوضح
        عندما يكون الرابط عمولة.
      </p>
      <ul className="mt-10 space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-border pb-6">
            <p className="text-xs text-muted-foreground">{article.category}</p>
            <h2 className="mt-1 text-xl font-semibold">
              <Link href={`/${article.slug}`} className="hover:text-primary">
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {article.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
