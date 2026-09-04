import type { Metadata } from "next";
import { ProgramDirectory } from "@/components/program-directory";
import type { Model } from "@/lib/types";

export const metadata: Metadata = {
  title: "دليل البرامج",
  description:
    "برامج التسويق بالعمولة والدروب شيبينغ وإعادة البيع من أمازون وإيباي وعلي إكسبريس ونون والشبكات.",
};

const models: Model[] = [
  "affiliate",
  "dropship",
  "reseller",
  "influencer",
  "network",
];

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  const params = await searchParams;
  const model = models.includes(params.model as Model)
    ? (params.model as Model)
    : undefined;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">دليل البرامج</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        ليست كل منصة كبيرة تمنحك نفس الشيء. صفِّ حسب رأس المال والمنطقة والنموذج،
        ثم افتح التفاصيل قبل أن تسجّل.
      </p>
      <div className="mt-8">
        <ProgramDirectory initialModel={model} />
      </div>
    </div>
  );
}
