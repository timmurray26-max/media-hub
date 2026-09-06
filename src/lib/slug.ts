/** Build a URL-safe slug from a title, with a short random suffix for uniqueness. */
export function makeSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "item";
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}
