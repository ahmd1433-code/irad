import type { Metadata } from "next";
import { RevenueCalculator } from "@/components/revenue-calculator";

export const metadata: Metadata = {
  title: "حاسبة الإيراد",
  description:
    "قدّر عمولة التسويق أو هامش الدروب شيبينغ أو إعادة البيع قبل أن تسجّل في برنامج.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">حاسبة الإيراد</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        الأرقام تقديرية. غيّر الزيارات أو تكلفة الإعلان حتى ترى هل النموذج يربح
        أصلًا. إن كان الصافي سالبًا فالمشكلة ليست «في البرنامج» بل في الوحدة
        الاقتصادية.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-7">
        <RevenueCalculator />
      </div>
    </div>
  );
}
