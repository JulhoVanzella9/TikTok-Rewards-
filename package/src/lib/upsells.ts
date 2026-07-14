import type { SupabaseClient } from "@supabase/supabase-js";

export type UpsellKey = "up1" | "up2" | "up3";
export const UPSELL_KEYS: UpsellKey[] = ["up1", "up2", "up3"];

/**
 * Digistore product IDs (or product names) for each upsell.
 * Fill these in when you have them — a buyer whose purchase matches any of
 * these gets that bonus unlocked automatically. Leave empty until then.
 */
export const UPSELL_PRODUCT_IDS: Record<UpsellKey, string[]> = {
  // UP1 — Multiplatform Expansion
  // conta 1: full 707319, downsell Dw1 707339 | conta 2: 696904 | conta 3: full 694328, downsell Dw1 693174
  // conta 4: full 697477, downsell Dw1 697473
  up1: ["707319", "696904", "707339", "694328", "693174", "697477", "697473"],
  // UP2 — AI assistant (3x)
  // conta 1: full 707324, downsell Dw2 707347 | conta 2: 696905 | conta 3: full 694327, downsell Dw2 694329
  // conta 4: full 697476, downsell Dw2 697472
  up2: ["707324", "696905", "707347", "694327", "694329", "697476", "697472"],
  // UP3 — Refined algorithm
  // conta 1: full 707332, downsell Dw3 707348 | conta 2: 696906 | conta 3: full 692947, downsell Dw3 693176
  // conta 4: full 697474, downsell Dw3 697471
  up3: ["707332", "696906", "707348", "692947", "693176", "697474", "697471"],
};

/**
 * Markers written by the hidden test panel to unlock a bonus for ONE account
 * only. These live in the payments table with provider = "test-unlock".
 */
export const TEST_MARKERS: Record<UpsellKey, string> = {
  up1: "TEST-UP1",
  up2: "TEST-UP2",
  up3: "TEST-UP3",
};

export type Entitlements = Record<UpsellKey, boolean>;

const APPROVED_STATUSES = ["approved", "completed", "paid", "active"];

export function emptyEntitlements(): Entitlements {
  return { up1: false, up2: false, up3: false };
}

function matchersForKey(key: UpsellKey): string[] {
  return [...UPSELL_PRODUCT_IDS[key], TEST_MARKERS[key]]
    .map((s) => s.toLowerCase().trim())
    .filter(Boolean);
}

/**
 * Reads the payments table for one email and returns which upsells that email
 * owns. Entitlements are ALWAYS per-email, so unlocking one account never
 * affects any other user.
 */
export async function getEntitlementsForEmail(
  supabase: SupabaseClient,
  email: string
): Promise<Entitlements> {
  const result = emptyEntitlements();
  const normalized = String(email || "").toLowerCase().trim();
  if (!normalized) return result;

  const { data } = await supabase
    .from("payments")
    .select("status, raw_payload")
    .eq("email", normalized);

  if (!data) return result;

  const owned = new Set<string>();
  for (const row of data) {
    if (!APPROVED_STATUSES.includes(String(row.status).toLowerCase())) continue;
    const payload = (row.raw_payload || {}) as Record<string, unknown>;
    const pid = String(payload.product_id ?? payload.productId ?? "").toLowerCase().trim();
    const pname = String(payload.product_name ?? "").toLowerCase().trim();
    if (pid) owned.add(pid);
    if (pname) owned.add(pname);
  }

  for (const key of UPSELL_KEYS) {
    result[key] = matchersForKey(key).some((m) => owned.has(m));
  }
  return result;
}
