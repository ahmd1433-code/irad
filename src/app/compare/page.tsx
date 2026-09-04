import type { Metadata } from "next";
import { CompareBoard } from "@/components/compare-board";

export const metadata: Metadata = {
  title: "قارن البرامج",
  description: "قارن حتى ثلاثة برامج شراكة أو إعادة بيع جنبًا إلى جنب.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">قارن البرامج</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        أمازون ليس إيباي، وعلي إكسبريس بالعمولة ليس دروب شيبينغ. ضع ثلاثة خيارات
        لترى العمولة ومدة الارتباط ورأس المال قبل أن تفتح خمسة حسابات.
      </p>
      <div className="mt-8">
        <CompareBoard />
      </div>
    </div>
  );
}
