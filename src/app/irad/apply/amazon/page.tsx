import type { Metadata } from "next";
import { AmazonApplyGuide } from "@/components/amazon-apply-guide";

export const metadata: Metadata = {
  title: "تعبئة طلب أمازون أسوشيتس",
  description:
    "ماذا تضع في حقول الموقع والجوال عند التقديم على أمازون أسوشيتس، ولماذا يُرفض localhost.",
};

export default function AmazonApplyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <p className="text-sm font-medium text-primary">نموذج أسوشيتس</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        أمازون يطلب روابط موقع وجوال — وهذا طبيعي
      </h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        الحقلان مطلوبان لكل ناشر. الجوال لرمز تحقق برسالة. روابط الموقع يجب أن
        تكون علنية على https حتى يفتحها مراجع أمازون. إيراد لا يسجّل عنك ولا
        يستلم الرمز.
      </p>
      <div className="mt-8">
        <AmazonApplyGuide />
      </div>
    </div>
  );
}
