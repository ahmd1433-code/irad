"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/data/programs";
import {
  capitalLabels,
  menaFitLabels,
  modelLabels,
  regionLabels,
} from "@/lib/labels";
import type { Capital, MenaFit, Model, Region } from "@/lib/types";
import { cn } from "@/lib/utils";

const models: Model[] = [
  "affiliate",
  "dropship",
  "reseller",
  "influencer",
  "network",
];
const regions: Region[] = ["global", "mena", "ksa", "uae", "egypt"];
const capitals: Capital[] = ["none", "low", "medium", "high"];
const fits: MenaFit[] = ["excellent", "good", "limited"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:border-primary/50"
      )}
    >
      {children}
    </button>
  );
}

export function ProgramDirectory({
  initialModel,
}: {
  initialModel?: Model;
}) {
  const [query, setQuery] = useState("");
  const [model, setModel] = useState<Model | "all">(initialModel ?? "all");
  const [region, setRegion] = useState<Region | "all">("all");
  const [capital, setCapital] = useState<Capital | "all">("all");
  const [fit, setFit] = useState<MenaFit | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim();
    return programs.filter((program) => {
      if (model !== "all" && !program.models.includes(model)) return false;
      if (region !== "all" && !program.regions.includes(region)) return false;
      if (capital !== "all" && program.capital !== capital) return false;
      if (fit !== "all" && program.menaFit !== fit) return false;
      if (!needle) return true;
      const haystack = [
        program.nameAr,
        program.nameEn,
        program.brand,
        program.summary,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle.toLowerCase());
    });
  }, [capital, fit, model, query, region]);

  return (
    <div className="space-y-8">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="ابحث: أمازون، نون، أوين، دروب شيبينغ..."
        className="h-11 text-base"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FilterGroup label="النموذج">
          <Chip active={model === "all"} onClick={() => setModel("all")}>
            الكل
          </Chip>
          {models.map((item) => (
            <Chip
              key={item}
              active={model === item}
              onClick={() => setModel(item)}
            >
              {modelLabels[item]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="المنطقة">
          <Chip active={region === "all"} onClick={() => setRegion("all")}>
            الكل
          </Chip>
          {regions.map((item) => (
            <Chip
              key={item}
              active={region === item}
              onClick={() => setRegion(item)}
            >
              {regionLabels[item]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="رأس المال">
          <Chip active={capital === "all"} onClick={() => setCapital("all")}>
            الكل
          </Chip>
          {capitals.map((item) => (
            <Chip
              key={item}
              active={capital === item}
              onClick={() => setCapital(item)}
            >
              {capitalLabels[item]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="ملاءمة المنطقة العربية">
          <Chip active={fit === "all"} onClick={() => setFit("all")}>
            الكل
          </Chip>
          {fits.map((item) => (
            <Chip key={item} active={fit === item} onClick={() => setFit(item)}>
              {menaFitLabels[item]}
            </Chip>
          ))}
        </FilterGroup>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-medium">لا برامج بهذه التصفية</p>
          <p className="mt-2 text-sm text-muted-foreground">
            خفّف الفلاتر أو ابحث باسم المنصة. إن كنت تبدأ من صفر جرّب «تسويق
            بالعمولة» + «بدون رأس مال».
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} برنامج
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
