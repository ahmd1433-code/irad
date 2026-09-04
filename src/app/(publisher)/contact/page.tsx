import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getContactEmail, publisher } from "@/data/publisher";

export const metadata: Metadata = { title: "تواصل" };

export default function ContactPage() {
  const email = getContactEmail();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">تواصل</h1>
      <p className="mt-4 text-sm leading-8 text-muted-foreground">
        للتصحيحات والشكاوى واقتراحات المقالات. {publisher.name} موقع محتوى، ولسنا
        خدمة عملاء لمتجر إلكتروني.
      </p>
      {email ? (
        <p className="mt-4 text-sm leading-8">
          البريد:{" "}
          <a href={`mailto:${email}`} className="font-medium text-primary underline">
            {email}
          </a>
        </p>
      ) : (
        <p className="mt-4 text-sm leading-8 text-muted-foreground">
          ضع بريد الناشر في متغير{" "}
          <span dir="ltr">NEXT_PUBLIC_CONTACT_EMAIL</span> عند النشر حتى يظهر
          هنا لمراجع البرامج.
        </p>
      )}
      <ContactForm />
    </article>
  );
}
