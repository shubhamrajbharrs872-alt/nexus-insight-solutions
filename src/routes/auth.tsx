import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Apple } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/pulse/logo";

export const Route = createFileRoute("/auth")({
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

function Auth() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav({ to: "/app" }), 700);
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
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in to your PulseGuard dashboard.</p>

          <div className="mt-8 space-y-2">
            <button onClick={() => nav({ to: "/app" })} className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface py-2.5 text-sm font-medium hover:bg-muted">
              <Apple className="h-4 w-4" /> Continue with Apple
            </button>
            <button onClick={() => nav({ to: "/app" })} className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface py-2.5 text-sm font-medium hover:bg-muted">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4-5.4 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.7 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-8.6 0-.6-.1-1-.2-1.5H12z"/></svg>
              Continue with Google
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Email</span>
              <input type="email" required defaultValue="ana@pulseguard.health" className="mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <input type="password" required defaultValue="••••••••" className="mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
            </label>
            <button disabled={loading} className="mt-2 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-foreground text-sm font-medium text-background hover:opacity-90 disabled:opacity-60">
              {loading ? "Signing in…" : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            New to PulseGuard? <Link to="/app" className="text-foreground underline underline-offset-4">Try the demo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
