import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { alerts } from "@/lib/pulse-mock";
import { AlertTriangle, CheckCircle2, Info, Phone } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — PulseGuard" },
      { name: "description", content: "Real-time care alerts with severity, location and one-tap escalation to the care team." },
      { property: "og:title", content: "Alerts — PulseGuard" },
      { property: "og:description", content: "Real-time care alerts with escalation." },
    ],
  }),
  component: Alerts,
});

const iconFor = (sev: string) => sev === "critical" ? AlertTriangle : sev === "warning" ? Info : CheckCircle2;
const toneFor = (sev: string) => sev === "critical" ? "text-destructive bg-destructive/10" : sev === "warning" ? "text-warning bg-warning/15" : "text-muted-foreground bg-muted";

function Alerts() {
  const active = alerts.filter(a => a.status === "active");
  const resolved = alerts.filter(a => a.status === "resolved");
  return (
    <AppShell title="Alerts" subtitle="Care events, ranked by severity. Auto-escalated when unacknowledged.">
      <div className="grid gap-4">
        {active.length === 0 ? (
          <Card className="text-center py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success"><CheckCircle2 className="h-6 w-6"/></div>
            <div className="mt-4 text-lg font-semibold">All quiet</div>
            <p className="mt-1 text-sm text-muted-foreground">No active alerts. We'll notify you the moment anything changes.</p>
          </Card>
        ) : (
          <>
            <SectionLabel>Active · {active.length}</SectionLabel>
            {active.map((a) => {
              const Icon = iconFor(a.severity);
              return (
                <Card key={a.id} className={a.severity === "critical" ? "ring-1 ring-destructive/40" : ""}>
                  <div className="flex items-start gap-4">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${toneFor(a.severity)}`}>
                      <Icon className="h-5 w-5"/>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${toneFor(a.severity)}`}>{a.severity}</span>
                        <div className="text-[11px] text-muted-foreground">{a.time} · {a.location}</div>
                      </div>
                      <div className="mt-1.5 text-base font-semibold">{a.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-medium text-background hover:opacity-90"><Phone className="h-3.5 w-3.5"/> Call 911</button>
                        <button className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3.5 text-xs font-medium hover:bg-muted">Notify care team</button>
                        <button className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3.5 text-xs font-medium hover:bg-muted">I'm on it</button>
                        <button className="inline-flex h-9 items-center rounded-full px-3.5 text-xs font-medium text-muted-foreground hover:text-foreground">Snooze 15m</button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </>
        )}

        <div className="mt-6">
          <SectionLabel>Resolved · past 7 days</SectionLabel>
          <Card>
            <ul className="divide-y divide-border">
              {resolved.map((a) => {
                const Icon = iconFor(a.severity);
                return (
                  <li key={a.id} className="flex items-center gap-3 py-3">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${toneFor(a.severity)}`}><Icon className="h-4 w-4"/></span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{a.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{a.time} · {a.location}</div>
                    </div>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">Resolved</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
