/**
 * Shop catalog — edit this file to add or change products.
 * Checkout goes straight to Polar (no API/webhooks in v1).
 */

export interface Product {
  id: string;
  title: string;
  /** Display price, e.g. "$1" */
  price: string;
  description: string;
  /** Polar hosted checkout link — Buy opens this URL */
  polarCheckoutUrl: string;
  /** Optional: show a Buy button on /i/[this-slug] */
  mediaSlug?: string;
  /** Optional: show Buy on item pages that have any of these tags */
  matchTags?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "dumbbell-workout-test",
    title: "Dumbbell Workout (Test)",
    price: "$1",
    description:
      "Full-body dumbbell PDF — a simple test product for Polar checkout. Buy opens Polar’s secure payment page.",
    polarCheckoutUrl:
      "https://buy.polar.sh/polar_cl_tUixXtKlxSmFEPc70awS3mLs4tLBz616GnLdo36hCB1",
    // Uncomment / set when a library item should also show Buy:
    // mediaSlug: "dumbbell-workout",
    matchTags: ["for-sale"],
  },
];

/** Find a sellable product linked to a library item (by slug or tag). */
export function findProductForItem(item: {
  slug: string;
  tags: string[];
}): Product | undefined {
  return PRODUCTS.find((p) => {
    if (p.mediaSlug && p.mediaSlug === item.slug) return true;
    if (p.matchTags?.some((t) => item.tags.includes(t))) return true;
    return false;
  });
}
