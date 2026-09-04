"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMoney, formatNumber } from "@/lib/format";

type Currency = "SAR" | "AED" | "USD";

function Field({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <span className="text-sm font-medium tabular-nums">{display}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step ?? 1}
        value={[value]}
        onValueChange={(next) => {
          const first = Array.isArray(next) ? next[0] : next;
          if (typeof first === "number") onChange(first);
        }}
      />
    </div>
  );
}

export function RevenueCalculator() {
  const [currency, setCurrency] = useState<Currency>("SAR");
  const [clicks, setClicks] = useState(2500);
  const [conversion, setConversion] = useState(3);
  const [aov, setAov] = useState(180);
  const [commission, setCommission] = useState(6);
  const [orders, setOrders] = useState(80);
  const [price, setPrice] = useState(120);
  const [cost, setCost] = useState(55);
  const [ads, setAds] = useState(35);
  const [fees, setFees] = useState(12);
  const [units, setUnits] = useState(60);
  const [sell, setSell] = useState(150);
  const [buy, setBuy] = useState(70);
  const [platform, setPlatform] = useState(18);
  const [storage, setStorage] = useState(8);

  const affiliate = useMemo(() => {
    const sales = clicks * (conversion / 100);
    const revenue = sales * aov * (commission / 100);
    return { sales, revenue };
  }, [aov, clicks, commission, conversion]);

  const dropship = useMemo(() => {
    const gross = orders * (price - cost - ads - fees);
    return { gross };
  }, [ads, cost, fees, orders, price]);

  const reseller = useMemo(() => {
    const gross = units * (sell - buy - platform - storage);
    return { gross };
  }, [buy, platform, sell, storage, units]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">العملة</span>
        {(["SAR", "AED", "USD"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCurrency(item)}
            className={
              currency === item
                ? "rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                : "rounded-full border border-border px-3 py-1 text-xs"
            }
          >
            {item === "SAR" ? "ريال" : item === "AED" ? "درهم" : "دولار"}
          </button>
        ))}
      </div>

      <Tabs defaultValue="affiliate">
        <TabsList className="h-auto min-h-10 w-full flex-wrap justify-stretch">
          <TabsTrigger value="affiliate" className="min-h-9 px-3">
            تسويق بالعمولة
          </TabsTrigger>
          <TabsTrigger value="dropship" className="min-h-9 px-3">
            دروب شيبينغ
          </TabsTrigger>
          <TabsTrigger value="reseller" className="min-h-9 px-3">
            إعادة بيع / FBA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="affiliate" className="mt-5 space-y-5">
          <Field
            label="زيارات إلى الرابط شهريًا"
            value={clicks}
            display={formatNumber(clicks)}
            min={100}
            max={50000}
            step={100}
            onChange={setClicks}
          />
          <Field
            label="نسبة من يشتري"
            value={conversion}
            display={`${conversion}%`}
            min={0.5}
            max={15}
            step={0.5}
            onChange={setConversion}
          />
          <Field
            label="متوسط قيمة الطلب"
            value={aov}
            display={formatMoney(aov, currency)}
            min={20}
            max={2000}
            step={10}
            onChange={setAov}
          />
          <Field
            label="نسبة العمولة"
            value={commission}
            display={`${commission}%`}
            min={1}
            max={75}
            onChange={setCommission}
          />
          <Result
            title="إيراد العمولة المتوقع شهريًا"
            value={formatMoney(affiliate.revenue, currency)}
            hint={`حوالي ${formatNumber(Math.round(affiliate.sales))} عملية. أمازون بارتباط يوم واحد يحتاج نية شراء جاهزة، لا زيارات فضولية.`}
          />
        </TabsContent>

        <TabsContent value="dropship" className="mt-5 space-y-5">
          <Field
            label="طلبات الشهر"
            value={orders}
            display={formatNumber(orders)}
            min={5}
            max={500}
            onChange={setOrders}
          />
          <Field
            label="سعر البيع"
            value={price}
            display={formatMoney(price, currency)}
            min={20}
            max={800}
            step={5}
            onChange={setPrice}
          />
          <Field
            label="تكلفة المنتج والشحن"
            value={cost}
            display={formatMoney(cost, currency)}
            min={5}
            max={500}
            step={5}
            onChange={setCost}
          />
          <Field
            label="إعلان لكل طلب"
            value={ads}
            display={formatMoney(ads, currency)}
            min={0}
            max={200}
            onChange={setAds}
          />
          <Field
            label="رسوم بوابة ودفع"
            value={fees}
            display={formatMoney(fees, currency)}
            min={0}
            max={80}
            onChange={setFees}
          />
          <Result
            title="صافي تقديري قبل المرتجعات"
            value={formatMoney(dropship.gross, currency)}
            hint="إذا كان الرقم سالبًا فالإعلان أغلى من الهامش. هذا أشهر سبب لخسارة متاجر علي إكسبريس."
            negative={dropship.gross < 0}
          />
        </TabsContent>

        <TabsContent value="reseller" className="mt-5 space-y-5">
          <Field
            label="وحدات تُباع في الشهر"
            value={units}
            display={formatNumber(units)}
            min={5}
            max={400}
            onChange={setUnits}
          />
          <Field
            label="سعر البيع"
            value={sell}
            display={formatMoney(sell, currency)}
            min={30}
            max={1500}
            step={5}
            onChange={setSell}
          />
          <Field
            label="تكلفة الشراء"
            value={buy}
            display={formatMoney(buy, currency)}
            min={10}
            max={1000}
            step={5}
            onChange={setBuy}
          />
          <Field
            label="رسوم المنصة والإعلان"
            value={platform}
            display={formatMoney(platform, currency)}
            min={0}
            max={200}
            onChange={setPlatform}
          />
          <Field
            label="تخزين وشحن للمستودع"
            value={storage}
            display={formatMoney(storage, currency)}
            min={0}
            max={80}
            onChange={setStorage}
          />
          <Result
            title="هامش تقديري بعد الرسوم"
            value={formatMoney(reseller.gross, currency)}
            hint="لا يشمل رأس المال المجمد في المخزون. إن توقفت المبيعات تبقى البضاعة تكلفة."
            negative={reseller.gross < 0}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Result({
  title,
  value,
  hint,
  negative,
}: {
  title: string;
  value: string;
  hint: string;
  negative?: boolean;
}) {
  return (
    <div
      className={
        negative
          ? "rounded-2xl border border-destructive/30 bg-destructive/8 p-5"
          : "rounded-2xl bg-primary text-primary-foreground p-5"
      }
    >
      <p className="text-sm opacity-80">{title}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-3 text-sm leading-6 opacity-80">{hint}</p>
    </div>
  );
}
