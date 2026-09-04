import { publicDomainSteps } from "@/data/deploy";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicDomainGuide() {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card p-5 text-sm leading-7">
        <p className="font-semibold">النطاق العلني = رابط يفتحه أي شخص على الإنترنت</p>
        <p className="mt-2 text-muted-foreground">
          معاينة Cursor و<span dir="ltr">localhost</span> ليسا نطاقًا علنيًا.
          أمازون يفتح الرابط من خوادمه في أمريكا؛ إن لم يفتح، يُرفض الطلب. لا
          تحتاج شراء دومين (.com): العنوان المجاني{" "}
          <span dir="ltr">اسمك.vercel.app</span> يكفي.
        </p>
      </section>

      <ol className="space-y-4">
        {publicDomainSteps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <p className="text-xs text-muted-foreground">خطوة {index + 1}</p>
            <h2 className="mt-1 text-lg font-semibold">{step.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {step.body}
            </p>
            {step.href && step.linkLabel ? (
              <a
                href={step.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "mt-3"
                )}
              >
                {step.linkLabel}
              </a>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="text-sm leading-7 text-muted-foreground">
        ما تلصقه في أمازون بعد النجاح:{" "}
        <span dir="ltr" className="font-medium text-foreground">
          https://نطاقك.vercel.app
        </span>{" "}
        (الصفحة الرئيسية صارت «اختيار»). لا تلصق{" "}
        <span dir="ltr">/irad</span> — أمازون لا يجب أن يرى دليل التخطيط.
      </p>
    </div>
  );
}
