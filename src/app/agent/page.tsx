import type { Metadata } from "next";
import { AgentConsole } from "@/components/agent-console";

export const metadata: Metadata = {
  title: "الوكيل",
  description:
    "وكيل محلي يدير خطتك ضمن الصلاحيات التي تمنحها، دون التسجيل الرسمي أو الإنفاق أو رفع الهوية.",
};

export default function AgentPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <p className="text-sm font-medium text-primary">يعمل بالنيابة عنك</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">وكيل إيراد</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        يُدير البرامج والملاحظات والمسار داخل هذا المتصفح. لا يقدّم طلبًا لدى
        أمازون أو نون، لا يدفع، ولا يمس وثائقك. امنحه صلاحية الإدارة، واحتفظ
        أنت بالأمور الضرورية.
      </p>
      <div className="mt-8">
        <AgentConsole />
      </div>
    </div>
  );
}
