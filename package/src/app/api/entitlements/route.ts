import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getEntitlementsForEmail, emptyEntitlements } from "@/lib/upsells";

// GET /api/entitlements?email=... -> { up1, up2, up3 }
// Which bonuses (upsells) the given email owns. Always per-email.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) return NextResponse.json(emptyEntitlements());

    const supabase = createClient();
    const entitlements = await getEntitlementsForEmail(supabase, email);
    return NextResponse.json(entitlements);
  } catch {
    return NextResponse.json(emptyEntitlements());
  }
}
