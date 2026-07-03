import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_SECRET } from "@/lib/admin-secret";
import { UPSELL_KEYS, TEST_MARKERS } from "@/lib/upsells";

// POST /api/admin/unlock  { key, email, action: "grant" | "revoke" }
// Unlocks (or removes) all bonuses for ONE specific email only.
// Guarded by the secret panel key. Writes test markers into the payments
// table with provider = "test-unlock" so it never touches real purchases.
export async function POST(request: Request) {
  try {
    const { key, email, action } = await request.json();

    if (key !== ADMIN_SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const normalized = String(email || "").toLowerCase().trim();
    if (!normalized) {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }

    const supabase = createClient();

    // Always clear previous test-unlock rows for this email first (idempotent).
    await supabase
      .from("payments")
      .delete()
      .eq("email", normalized)
      .eq("provider", "test-unlock");

    if (action === "revoke") {
      return NextResponse.json({ ok: true, action: "revoke", email: normalized });
    }

    // grant: one approved marker payment per upsell, tied to this email only.
    const rows = UPSELL_KEYS.map((k) => ({
      email: normalized,
      transaction_id: `test-unlock-${k}-${Date.now()}`,
      status: "approved",
      amount: 0,
      provider: "test-unlock",
      raw_payload: { product_id: TEST_MARKERS[k], source: "test-panel" },
    }));

    const { error } = await supabase.from("payments").insert(rows);
    if (error) {
      console.error("[admin/unlock] insert failed:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, action: "grant", email: normalized });
  } catch (error) {
    console.error("[admin/unlock] error:", error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
