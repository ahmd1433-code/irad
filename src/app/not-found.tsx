import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">الصفحة غير موجودة</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        الرابط لا يطابق صفحة في الموقع.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-6")}>
        اختيار
      </Link>
    </div>
  );
}
