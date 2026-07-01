import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";
import { ADMIN_SECRET } from "@/lib/admin-secret";

// GET - list every refund request (email + reason + survey answers).
// Protected by the secret key that also gates the hidden panel page.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('refund_requests')
      .select('id, email, purchase_code, reason, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/refunds] Failed to fetch:', error);
      return NextResponse.json({ error: 'Failed to fetch refund requests' }, { status: 500 });
    }

    // Split the stored "reason" into the free-text reason and the survey answers.
    const requests = (data || []).map((r) => {
      const raw = String(r.reason ?? '');
      const marker = '\n\n[Survey answers] ';
      const idx = raw.indexOf(marker);
      const reason = idx >= 0 ? raw.slice(0, idx).trim() : raw.trim();
      const survey = idx >= 0
        ? raw.slice(idx + marker.length).split(';').map((s) => s.trim()).filter(Boolean)
        : [];
      return {
        id: r.id,
        email: r.email,
        purchaseCode: r.purchase_code,
        reason,
        survey,
        status: r.status,
        createdAt: r.created_at,
      };
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('[admin/refunds] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
