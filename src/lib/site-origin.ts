const PRIVATE_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "[::1]",
]);

export function normalizeSiteOrigin(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    url.hash = "";
    url.search = "";
    const path = url.pathname.replace(/\/+$/, "");
    return `${url.origin}${path === "/" ? "" : path}`;
  } catch {
    return trimmed.replace(/\/+$/, "");
  }
}

export function isPrivateSiteOrigin(value: string): boolean {
  const origin = normalizeSiteOrigin(value);
  if (!origin) return false;
  try {
    const { hostname, protocol } = new URL(
      /^https?:\/\//i.test(origin) ? origin : `https://${origin}`
    );
    if (protocol === "http:" && hostname !== "localhost") {
      // http on a public host is still crawlable but Amazon prefers https
    }
    const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
    if (PRIVATE_HOSTS.has(host)) return true;
    if (host.endsWith(".local")) return true;
    if (host.endsWith(".localhost")) return true;
    return false;
  } catch {
    return /localhost|127\.0\.0\.1/i.test(value);
  }
}

export function joinSiteOrigin(origin: string, path: string): string {
  const base = normalizeSiteOrigin(origin);
  if (!base) return path;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
