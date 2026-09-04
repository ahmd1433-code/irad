export type Model =
  | "affiliate"
  | "dropship"
  | "reseller"
  | "influencer"
  | "network";

export type Region = "global" | "mena" | "ksa" | "uae" | "egypt";

export type Capital = "none" | "low" | "medium" | "high";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type MenaFit = "excellent" | "good" | "limited";

export type Program = {
  slug: string;
  nameAr: string;
  nameEn: string;
  brand: string;
  models: Model[];
  regions: Region[];
  capital: Capital;
  difficulty: Difficulty;
  commission: string;
  commissionMin: number;
  commissionMax: number;
  cookieDays: number | null;
  payout: string;
  summary: string;
  howItWorks: string[];
  howToStart: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  applyUrl: string;
  featured?: boolean;
  menaFit: MenaFit;
  accent: string;
};

export type Playbook = {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  capital: Capital;
  models: Model[];
  steps: { title: string; body: string }[];
  pitfalls: string[];
  relatedPrograms: string[];
};

export type SavedStatus = "considering" | "applied" | "active";

export type SavedProgram = {
  slug: string;
  status: SavedStatus;
  note: string;
};
