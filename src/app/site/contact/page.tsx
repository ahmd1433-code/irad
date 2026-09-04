"use client";

import { useState } from "react";
import { publisher } from "@/data/publisher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">تواصل</h1>
      <p className="mt-4 text-sm leading-8 text-muted-foreground">
        للتصحيحات والشكاوى والشراكات الإعلامية. لا نستخدم هذا النموذج للتسجيل في
        أمازون بالنيابة عنك. {publisher.emailPlaceholder}.
      </p>
      {sent ? (
        <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-7">
          وصلت الرسالة على هذا الجهاز فقط كتأكيد محلي. اربط النموذج لاحقًا
          ببريدك أو خدمة نماذج عندما تنشر الموقع على نطاق عام.
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <label className="block text-sm">
            الاسم
            <input
              required
              name="name"
              className="mt-1 h-10 w-full rounded-lg border border-input bg-transparent px-3"
            />
          </label>
          <label className="block text-sm">
            البريد
            <input
              required
              type="email"
              name="email"
              className="mt-1 h-10 w-full rounded-lg border border-input bg-transparent px-3"
            />
          </label>
          <label className="block text-sm">
            الرسالة
            <textarea
              required
              name="message"
              className="mt-1 min-h-32 w-full rounded-lg border border-input bg-transparent p-3"
            />
          </label>
          <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            إرسال
          </button>
        </form>
      )}
    </article>
  );
}
