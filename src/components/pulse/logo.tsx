import { Link } from "@tanstack/react-router";

export function Logo({ to = "/", compact = false }: { to?: string; compact?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-2 group">
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h3l2-5 3 10 2-7 2 4h6" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-pulse pulse-dot" />
      </span>
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          PulseGuard
        </span>
      )}
    </Link>
  );
}
