"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface EntitlementsState {
  up1: boolean;
  up2: boolean;
  up3: boolean;
  hasAny: boolean;
  loading: boolean;
}

/**
 * Client hook: which bonuses (upsells) the logged-in account owns.
 * Always per-email — reflects only the current user.
 */
export function useEntitlements(): EntitlementsState {
  const [state, setState] = useState<EntitlementsState>({
    up1: false, up2: false, up3: false, hasAny: false, loading: true,
  });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) {
          if (active) setState((s) => ({ ...s, loading: false }));
          return;
        }
        const res = await fetch(`/api/entitlements?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (!active) return;
        const up1 = !!data.up1, up2 = !!data.up2, up3 = !!data.up3;
        setState({ up1, up2, up3, hasAny: up1 || up2 || up3, loading: false });
      } catch {
        if (active) setState((s) => ({ ...s, loading: false }));
      }
    })();
    return () => { active = false; };
  }, []);

  return state;
}
