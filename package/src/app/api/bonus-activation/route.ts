import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Records/checks a one-time-per-account activation for the AI (UP2) and
// Refined Algorithm (UP3) bonuses. Stored as markers in the payments table
// (provider = "bonus-activation") so no schema change is needed.
const MARKERS: Record<string, string> = {
  ai: "AI_ACTIVATED",
  algorithm: "ALGO_ACTIVATED",
};

// GET /api/bonus-activation?email=... -> { ai: boolean, algorithm: boolean }
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get("email") || "").toLowerCase().trim();
    if (!email) return NextResponse.json({ ai: false, algorithm: false });

    const supabase = createClient();
    const { data } = await supabase
      .from("payments")
      .select("raw_payload")
      .eq("email", email)
      .eq("provider", "bonus-activation");

    const owned = new Set(
      (data || []).map((r) => String((r.raw_payload as Record<string, unknown> | null)?.product_id ?? ""))
    );

    return NextResponse.json({
      ai: owned.has(MARKERS.ai),
      algorithm: owned.has(MARKERS.algorithm),
    });
  } catch {
    return NextResponse.json({ ai: false, algorithm: false });
  }
}

// POST /api/bonus-activation  { email, bonus: "ai" | "algorithm" }
export async function POST(request: Request) {
  try {
    const { email, bonus } = await request.json();
    const norm = String(email || "").toLowerCase().trim();
    const marker = MARKERS[String(bonus)];
    if (!norm || !marker) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    const supabase = createClient();

    // Only record once per account (idempotent).
    const { data: existing } = await supabase
      .from("payments")
      .select("raw_payload")
      .eq("email", norm)
      .eq("provider", "bonus-activation");

    const already = (existing || []).some(
      (r) => String((r.raw_payload as Record<string, unknown> | null)?.product_id ?? "") === marker
    );

    if (!already) {
      await supabase.from("payments").insert({
        email: norm,
        transaction_id: `activation-${bonus}-${Date.now()}`,
        status: "approved",
        amount: 0,
        provider: "bonus-activation",
        raw_payload: { product_id: marker, source: "bonus-activation" },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
