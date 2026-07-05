import { NextResponse } from "next/server";

// Returns the server's current time so the client can compute time-based
// gates (like the 24h daily video-rating reset) without trusting the
// user's device clock, which can be wrong/drifted and falsely keep them
// blocked even after the real 24h window has passed.
export async function GET() {
  return NextResponse.json({ now: new Date().toISOString() });
}
