import { Link, createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Logo } from "@/components/pulse/logo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const authSearch = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: authSearch,
  head: () => ({
    meta: [
      { title: "Sign in — PulseGuard" },
      { name: "description", content: "Sign in to PulseGuard to monitor vitals, alerts, medications and AI insights for the ones you love." },
      { property: "og:title", content: "Sign in — PulseGuard" },
      { property: "og:description", content: "Sign in to your PulseGuard care dashboard." },
    ],
  }),
  component: Auth,
});

function safeRedirect(raw: string | undefined): string {
  if (!raw) return "/app";
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/app";
}

function Auth() {
  const nav = useNavigate();
  const search = useSearch({ from: "/auth" });
  const dest = safeRedirect(search.redirect);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) nav({ to: dest, replace: true });
    });
  }, [dest, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setInfo(null); setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin + "/app",
            data: { full_name: fullName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        setInfo("Account created. If email confirmation is on, check your inbox — otherwise you're signed in.");
        // If session was created immediately, redirect.
        const { data } = await supabase.auth.getUser();
        if (data.user) nav({ to: dest, replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: dest, replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setError(null); setLoading(true);
    try {
      sessionStorage.setItem("postAuthRedirect", dest);
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
      if (result.error) throw result.error;
      if (!result.redirected) {
        const saved = sessionStorage.getItem("postAuthRedirect") ?? "/app";
        sessionStorage.removeItem("postAuthRedirect");
        nav({ to: saved, replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-foreground text-background lg:block">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(600px at 30% 20%, oklch(0.72 0.19 25 / 0.4), transparent 60%)" }} />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo />
          <div>
            <blockquote className="text-3xl font-medium leading-snug tracking-tight">
              “The first time I opened PulseGuard I finally exhaled. My mom is 400 miles away — and I can see she's okay.”
            </blockquote>
            <div className="mt-6 text-sm text-background/70">Priya M. · Family caregiver</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden"><Logo /></div>
          <h1 className="text-3xl font-semibold tracking-tight">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {mode === "signup" ? "Start monitoring the ones you love." : "Sign in to your PulseGuard dashboard."}
          </p>

          <div className="mt-8 space-y-2">
            <button onClick={google} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-60">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4-5.4 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.7 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-8.6 0-.6-.1-1-.2-1.5H12z"/></svg>
              Continue with Google
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Full name</span>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
              </label>
            )}
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Email</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
            </label>
            {error && <p className="text-xs text-destructive">{error}</p>}
            {info && <p className="text-xs text-muted-foreground">{info}</p>}
            <button disabled={loading} className="mt-2 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-foreground text-sm font-medium text-background hover:opacity-90 disabled:opacity-60">
              {loading ? "Please wait…" : (<>{mode === "signup" ? "Create account" : "Sign in"} <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "signin" ? (
              <>New to PulseGuard? <button onClick={() => { setMode("signup"); setError(null); setInfo(null); }} className="text-foreground underline underline-offset-4">Create an account</button></>
            ) : (
              <>Already have an account? <button onClick={() => { setMode("signin"); setError(null); setInfo(null); }} className="text-foreground underline underline-offset-4">Sign in</button></>
            )}
          </div>
          <div className="mt-3 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Back home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
