"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-7">
        وصلت الرسالة على هذا الجهاز فقط كتأكيد محلي. عندما يُربط النموذج ببريد
        الناشر على الاستضافة، تصلك الرسائل هناك.
      </p>
    );
  }

  return (
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
  );
}
