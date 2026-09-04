import type { Capital, Difficulty, MenaFit, Model, Region } from "./types";

export const modelLabels: Record<Model, string> = {
  affiliate: "تسويق بالعمولة",
  dropship: "دروب شيبينغ",
  reseller: "إعادة بيع",
  influencer: "مؤثر / صانع محتوى",
  network: "شبكة عمولات",
};

export const modelHints: Record<Model, string> = {
  affiliate:
    "تربط الناس بمنتج موجود. المنصة تبيع وتشحّن، وأنت تأخذ نسبة من البيع.",
  dropship:
    "تعرض المنتج في متجرك، وإذا اشترى الزبون تطلبه من المورّد ليشحنه مباشرة.",
  reseller:
    "تشتري المخزون ثم تبيعه بهامش. أنت المسؤول عن التسعير والجودة والمرتجعات.",
  influencer:
    "تستخدم جمهورك على يوتيوب أو تيك توك أو إنستغرام لبيع منتجات عبر متجر مدمج.",
  network:
    "بوابة واحدة لآلاف العلامات. تسجّل مرة وتعرض عروض فنادق، أزياء، برمجيات، وغيرها.",
};

export const regionLabels: Record<Region, string> = {
  global: "عالمي",
  mena: "الشرق الأوسط",
  ksa: "السعودية",
  uae: "الإمارات",
  egypt: "مصر",
};

export const capitalLabels: Record<Capital, string> = {
  none: "بدون رأس مال",
  low: "رأس مال منخفض",
  medium: "رأس مال متوسط",
  high: "رأس مال عالٍ",
};

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: "مناسب للمبتدئ",
  intermediate: "يحتاج تجربة",
  advanced: "متقدم",
};

export const menaFitLabels: Record<MenaFit, string> = {
  excellent: "مناسب جدًا للمنطقة",
  good: "يعمل في المنطقة",
  limited: "محدود في المنطقة",
};

export const statusLabels = {
  considering: "أفكر فيه",
  applied: "قدّمت طلبًا",
  active: "أعمل عليه",
} as const;
