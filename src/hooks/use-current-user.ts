import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_initials: string | null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async (u: User | null) => {
      if (!u) {
        if (mounted) { setProfile(null); setIsAdmin(false); setLoading(false); }
        return;
      }
      const [{ data: p }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, email, avatar_initials").eq("id", u.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", u.id),
      ]);
      if (!mounted) return;
      setProfile((p as Profile) ?? null);
      setIsAdmin(Boolean(roles?.some((r) => r.role === "admin")));
      setLoading(false);
    };

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user);
      void load(data.user);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      const u = session?.user ?? null;
      setUser(u);
      setLoading(true);
      void load(u);
    });

    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  return { user, profile, isAdmin, loading };
}
