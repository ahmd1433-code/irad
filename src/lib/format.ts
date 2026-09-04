export function formatMoney(value: number, currency: "SAR" | "AED" | "USD") {
  const rounded = Math.round(value);
  const formatted = new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(Math.abs(rounded));
  const sign = rounded < 0 ? "−" : "";
  const suffix =
    currency === "SAR" ? "ر.س" : currency === "AED" ? "د.إ" : "دولار";
  return `${sign}${formatted} ${suffix}`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(value);
}
