"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PublicDomainGuide } from "@/components/public-domain-guide";
import { CopyField } from "@/components/copy-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  amazonPhoneNotes,
  amazonProgramUrls,
  amazonPromotionMethodAr,
  amazonPromotionMethodEn,
  amazonSitePages,
  amazonTrafficHonestyAr,
  amazonWebsiteDescriptionAr,
  amazonWebsiteDescriptionEn,
} from "@/data/amazon-apply";
import {
  isPrivateSiteOrigin,
  joinSiteOrigin,
  normalizeSiteOrigin,
} from "@/lib/site-origin";

const ORIGIN_KEY = "irad-public-site-origin";

export function AmazonApplyGuide() {
  const [originInput, setOriginInput] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ORIGIN_KEY);
      if (stored) setOriginInput(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const origin = normalizeSiteOrigin(originInput);
  const privateOrigin = isPrivateSiteOrigin(originInput);
  const ready = Boolean(origin) && !privateOrigin;

  function persistOrigin(value: string) {
    setOriginInput(value);
    const normalized = normalizeSiteOrigin(value);
    try {
      if (normalized && !isPrivateSiteOrigin(value)) {
        window.localStorage.setItem(ORIGIN_KEY, normalized);
      }
    } catch {
      /* ignore */
    }
  }

  const extraUrls = useMemo(() => {
    if (!ready) return "";
    return amazonSitePages
      .slice(1)
      .map((page) => joinSiteOrigin(origin, page.path))
      .join("\n");
  }, [origin, ready]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm leading-7">
        <p className="font-semibold">لا تلصق رابط المعاينة ولا localhost</p>
        <p className="mt-2 text-muted-foreground">
          أمازون يفتح الرابط من خوادمه.{" "}
          <span dir="ltr">http://127.0.0.1</span> و{" "}
          <span dir="ltr">localhost</span> ومعاينة Cursor لا تُرى من الخارج،
          فيُرفض الطلب. انشر «اختيار» على نطاق https علني، ثم الصق ذلك النطاق
          أدناه.
        </p>
      </section>

      <section className="space-y-3">
        <Label htmlFor="site-origin">نطاقك العلني بعد النشر</Label>
        <Input
          id="site-origin"
          dir="ltr"
          className="h-10 text-start"
          placeholder="https://ikhtiyar.vercel.app"
          value={originInput}
          onChange={(event) => persistOrigin(event.target.value)}
        />
        {privateOrigin ? (
          <p className="text-sm text-destructive">
            هذا عنوان جهازك فقط. أمازون لن يفتحه. انشر الموقع أولًا.
          </p>
        ) : (
          <p className="text-xs leading-6 text-muted-foreground">
            مثال صحيح: نطاق Vercel أو Netlify أو دومينك. المسار الأساسي الذي
            ستلصقه في أمازون هو{" "}
            <span dir="ltr">{ready ? joinSiteOrigin(origin, "/site") : "…/site"}</span>
            — ليست الصفحة الرئيسية لإيراد.
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">١) الجوال</h2>
        <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
          {amazonPhoneNotes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">٢) روابط الموقع</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          بعد أن يعمل النطاق في المتصفح من هاتف آخر (بيانات الجوال لا الواي فاي
          نفسه)، انسخ الحقول التالية إلى نموذج أسوشيتس.
        </p>
        <div className="space-y-3">
          {amazonSitePages.map((page) => (
            <CopyField
              key={page.path}
              label={page.amazonField}
              hint={page.why}
              value={ready ? joinSiteOrigin(origin, page.path) : ""}
            />
          ))}
          <CopyField
            label="الصق كل الصفحات الإضافية دفعة واحدة"
            hint="إن كان في النموذج مربع واحد لروابط إضافية."
            value={extraUrls}
            multiline
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">٣) وصف الموقع وطريقة الترويج</h2>
        <CopyField
          label="وصف الموقع (عربي)"
          value={amazonWebsiteDescriptionAr}
          multiline
        />
        <CopyField
          label="Website description (English)"
          value={amazonWebsiteDescriptionEn}
          multiline
        />
        <CopyField
          label="كيف تروّج المنتجات"
          value={amazonPromotionMethodAr}
          multiline
        />
        <CopyField
          label="How you promote Amazon products"
          value={amazonPromotionMethodEn}
          multiline
        />
        <CopyField
          label="عدد الزوار"
          hint="لا تختلق أرقامًا. المواقع الجديدة تُقبل إن كان المحتوى أصليًا."
          value={amazonTrafficHonestyAr}
          multiline
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">٤) أين تقدّم</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          اختر متجر بلد جمهورك. إن فتحت amazon.com بينما تبيع لجمهور سعودي،
          أغلقه وقدّم على المتجر المحلي.
        </p>
        <ul className="space-y-2 text-sm">
          {amazonProgramUrls.map((item) => (
            <li key={item.href}>
              <span className="text-muted-foreground">{item.store}: </span>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">كيف تحصل على نطاق علني</h2>
        <PublicDomainGuide />
      </section>

      <section className="rounded-2xl bg-secondary p-5 text-sm leading-7">
        <h2 className="font-semibold">قبل إرسال الطلب</h2>
        <ol className="mt-3 list-decimal space-y-2 ps-5">
          <li>
            ضع بريد تواصل حقيقي في إعدادات الاستضافة:{" "}
            <span dir="ltr">NEXT_PUBLIC_CONTACT_EMAIL</span> حتى يظهر في{" "}
            <Link href="/site/contact" className="underline">
              صفحة التواصل
            </Link>
            .
          </li>
          <li>
            افتح{" "}
            <Link href="/site" className="underline">
              اختيار
            </Link>{" "}
            من هاتفك عبر الرابط العلني، لا من جهاز التطوير.
          </li>
          <li>لا ترفع هوية ولا تملأ الضريبة قبل قبول الموقع — ذلك يأتي لاحقًا.</li>
        </ol>
      </section>
    </div>
  );
}
