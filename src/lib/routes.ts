/** Public buying-guide URLs Amazon reviewers should see. */
export const PUBLISHER_HOME = "/";

/** Planning tool — not for Amazon, robots, or the public homepage. */
export const IRAD = "/irad";

export function iradPath(path = "") {
  if (!path || path === "/") return IRAD;
  return `${IRAD}${path.startsWith("/") ? path : `/${path}`}`;
}
