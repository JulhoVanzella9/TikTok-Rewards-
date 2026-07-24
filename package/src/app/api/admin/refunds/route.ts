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

    // Supabase/PostgREST caps every query at 1000 rows regardless of the
    // requested limit, so we page through with .range() to fetch everything
    // instead of silently truncating once there are more than 1000 requests.
    const PAGE_SIZE = 1000;
    type RefundRequestRow = {
      id: string; email: string; purchase_code: string;
      reason: string; status: string; created_at: string;
    };
    const allRows: RefundRequestRow[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data: page, error } = await supabase
        .from('refund_requests')
        .select('id, email, purchase_code, reason, status, created_at')
        .order('created_at', { ascending: false })
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        console.error('[admin/refunds] Failed to fetch:', error);
        return NextResponse.json({ error: 'Failed to fetch refund requests' }, { status: 500 });
      }

      allRows.push(...(page || []));
      if (!page || page.length < PAGE_SIZE) break;
    }

    // Split the stored "reason" into the free-text reason and the survey answers.
    const requests = allRows.map((r) => {
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
