import type { Metadata } from "next";
import { PlanBoard } from "@/components/plan-board";

export const metadata: Metadata = {
  title: "خطتي",
  description: "البرامج التي حفظتها مع حالة التقديم والملاحظات.",
};

export default function PlanPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">خطتي</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        احفظ البرامج التي تفكر فيها، حدّث الحالة بعد التسجيل، واكتب ملاحظة عن
        العائق. البيانات تبقى في متصفحك ولا تُرفع إلى خادم.
      </p>
      <div className="mt-8">
        <PlanBoard />
      </div>
    </div>
  );
}
