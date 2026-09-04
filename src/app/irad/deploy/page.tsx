import type { Metadata } from "next";
import Link from "next/link";
import { PublicDomainGuide } from "@/components/public-domain-guide";

export const metadata: Metadata = {
  title: "كيف تحصل على نطاق علني",
  description:
    "انشر موقع اختيار على Vercel مجانًا حتى يفتح أمازون الرابط من الإنترنت.",
};

export default function DeployPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <p className="text-sm font-medium text-primary">بدون شراء دومين</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        كيف تحصل على نطاق علني
      </h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        النطاق العلني هنا يعني عنوان https يفتح من هاتف صديقك. بعد أن يعمل، ارجع
        إلى{" "}
        <Link href="/irad/apply/amazon" className="text-foreground underline">
          تعبئة طلب أمازون
        </Link>{" "}
        والصق الرابط هناك.
      </p>
      <div className="mt-8">
        <PublicDomainGuide />
      </div>
    </div>
  );
}
