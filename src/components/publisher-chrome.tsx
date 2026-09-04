import Link from "next/link";
import { publisher } from "@/data/publisher";

const links = [
  { href: "/site", label: "الرئيسية" },
  { href: "/site/about", label: "من نحن" },
  { href: "/site/disclosure", label: "إفصاح العمولة" },
  { href: "/site/privacy", label: "الخصوصية" },
  { href: "/site/contact", label: "تواصل" },
];

export function PublisherHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/site" className="leading-tight">
          <span className="block text-lg font-semibold">{publisher.name}</span>
          <span className="block text-[11px] text-muted-foreground">
            {publisher.nameEn}
          </span>
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function PublisherFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-7 text-muted-foreground">
        <p>
          {publisher.name} موقع محتوى مستقل عن منصات البيع. بعض الروابط قد تكون
          روابط عمولة. راجع{" "}
          <Link href="/site/disclosure" className="text-foreground underline">
            إفصاح العمولة
          </Link>{" "}
          و{" "}
          <Link href="/site/privacy" className="text-foreground underline">
            سياسة الخصوصية
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
