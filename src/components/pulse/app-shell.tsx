import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Activity, Bell, Home, Pill, Sparkles, Users, Settings, LifeBuoy, ShieldAlert, LogOut, Search } from "lucide-react";
import { type ReactNode } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ward } from "@/lib/pulse-mock";
import { useCurrentUser } from "@/hooks/use-current-user";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/app", label: "Overview", icon: Home, exact: true },
  { to: "/app/vitals", label: "Vitals", icon: Activity },
  { to: "/app/alerts", label: "Alerts", icon: Bell, badge: 2 },
  { to: "/app/medications", label: "Medications", icon: Pill },
  { to: "/app/insights", label: "AI Insights", icon: Sparkles },
  { to: "/app/care-team", label: "Care team", icon: Users },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children, title, subtitle, actions }: {
  children: ReactNode; title: string; subtitle?: string; actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { profile, user, isAdmin } = useCurrentUser();
  const displayName = profile?.full_name ?? user?.email ?? "Signed in";
  const displayEmail = profile?.email ?? user?.email ?? "";
  const initials = profile?.avatar_initials ?? (displayEmail ? displayEmail.slice(0, 2).toUpperCase() : "··");
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center px-5">
          <Logo />
        </div>
        <div className="mx-3 mb-3 rounded-2xl bg-surface-2 p-3 hairline">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
              {ward.photoInitials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{ward.name}</div>
              <div className="truncate text-xs text-muted-foreground">Age {ward.age} · {ward.relationship}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            All systems normal
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, "exact" in item ? item.exact : false);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {"badge" in item && item.badge ? (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    active ? "bg-background/20 text-background" : "bg-pulse text-white"
                  }`}>{item.badge}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface-2 p-3 hairline">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pulse/15 text-pulse text-xs font-semibold">
              {initials}
            </div>
            <div className="min-w-0 text-xs">
              <div className="truncate font-medium text-foreground">{displayName}</div>
              <div className="truncate text-muted-foreground">{isAdmin ? "Administrator" : "Caregiver"}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 glass">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <div className="lg:hidden"><Logo compact /></div>
            <div className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Search vitals, alerts, medications…</span>
              <kbd className="ml-auto rounded bg-background px-1.5 py-0.5 text-[10px] hairline">⌘K</kbd>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link to="/app/alerts" className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface hover:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-pulse" />
              </Link>
              <ThemeToggle />
              <Link to="/admin" className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-medium hover:bg-muted">
                <ShieldAlert className="h-3.5 w-3.5" /> Admin
              </Link>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              {subtitle && <p className="mt-1.5 text-[15px] text-muted-foreground">{subtitle}</p>}
            </div>
            {actions}
          </div>
          {children}
        </div>

        <footer className="border-t border-border px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2"><LifeBuoy className="h-3.5 w-3.5" /> 24/7 clinical support · +1 (800) PULSE-GO</div>
            <div>© 2026 PulseGuard Health, Inc. · HIPAA · SOC 2 Type II · GDPR</div>
          </div>
        </footer>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
        <div className="glass border-t border-border px-2 py-1.5">
          <div className="flex items-center justify-around">
            {nav.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to, "exact" in item ? item.exact : false);
              return (
                <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{children}</div>;
}
