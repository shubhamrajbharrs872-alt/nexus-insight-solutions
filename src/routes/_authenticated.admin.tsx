import { Link, createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/pulse/logo";
import { ThemeToggle } from "@/components/pulse/theme-toggle";
import { adminGrowth, adminMetrics } from "@/lib/pulse-mock";
import { Activity, ArrowLeft, Users, Bell, Cpu, DollarSign, ShieldCheck } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — PulseGuard" },
      { name: "description", content: "PulseGuard operations dashboard: fleet health, alerts, AI accuracy and revenue." },
      { property: "og:title", content: "Admin — PulseGuard" },
      { property: "og:description", content: "PulseGuard operations dashboard." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Logo/>
            <div className="hidden sm:block h-5 w-px bg-border"/>
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5"/> Admin console
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle/>
            <Link to="/app" className="inline-flex h-9 items-center gap-1 rounded-full border border-border bg-surface px-3 text-xs font-medium hover:bg-muted"><ArrowLeft className="h-3.5 w-3.5"/> User app</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 animate-fade-up">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Fleet overview</h1>
            <p className="mt-1.5 text-[15px] text-muted-foreground">Live health of every device, caregiver and alert in the PulseGuard network.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot"/>
            All systems operational · Uptime {adminMetrics.uptime}%
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Stat icon={Cpu} label="Active devices" value={adminMetrics.activeDevices.toLocaleString()} delta="+412 this week"/>
          <Stat icon={Users} label="Active caregivers" value={adminMetrics.activeCaregivers.toLocaleString()} delta="+18% MoM"/>
          <Stat icon={Bell} label="Alerts today" value={adminMetrics.alertsToday.toLocaleString()} delta="97% auto-resolved"/>
          <Stat icon={Activity} label="AI accuracy" value={`${adminMetrics.aiAccuracy}%`} delta="+0.3% vs last week"/>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Active caregivers</div>
                <div className="mt-1 text-3xl font-semibold tracking-tight">{adminMetrics.activeCaregivers.toLocaleString()}</div>
              </div>
              <div className="text-xs text-success">+357% YoY</div>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <AreaChart data={adminGrowth}>
                  <defs><linearGradient id="grow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--pulse)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--pulse)" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={40}/>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}/>
                  <Area type="monotone" dataKey="users" stroke="var(--pulse)" strokeWidth={2} fill="url(#grow)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Revenue</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-3xl font-semibold tracking-tight">${(adminMetrics.mrr/1000).toFixed(0)}K</div>
              <div className="text-xs text-muted-foreground">MRR</div>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <RevRow icon={DollarSign} label="Family plan" value="$92,140" pct={50}/>
              <RevRow icon={DollarSign} label="Family+ plan" value="$61,880" pct={34}/>
              <RevRow icon={DollarSign} label="Clinics" value="$30,300" pct={16}/>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <div className="text-base font-semibold">Live alerts stream</div>
              <div className="text-xs text-muted-foreground">Rolling 60-second window</div>
            </div>
            <div className="text-xs text-muted-foreground">Region: US-East · Model: pg-clinical-v4.2</div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3">Time</th><th className="px-5 py-3">Device</th><th className="px-5 py-3">Severity</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Region</th><th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["14:22:11", "PB-482910", "critical", "Fall detected", "CA · Palo Alto", "Escalated"],
                ["14:22:04", "PB-119284", "warning", "High resting HR", "TX · Austin", "Notified family"],
                ["14:21:57", "PB-772019", "info", "Meds skipped", "NY · Buffalo", "Auto-retry"],
                ["14:21:41", "PB-338291", "warning", "Low SpO₂", "WA · Seattle", "Reviewing"],
                ["14:21:22", "PB-661184", "info", "Battery low", "FL · Miami", "User notified"],
                ["14:21:03", "PB-449271", "critical", "No motion 8h", "IL · Chicago", "Escalated"],
              ].map((r) => (
                <tr key={r[1]} className="hover:bg-muted/40">
                  <td className="px-5 py-3 font-mono text-xs">{r[0]}</td>
                  <td className="px-5 py-3 font-medium">{r[1]}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${r[2] === "critical" ? "bg-destructive/15 text-destructive" : r[2] === "warning" ? "bg-warning/20 text-warning-foreground" : "bg-muted text-muted-foreground"}`}>{r[2]}</span>
                  </td>
                  <td className="px-5 py-3">{r[3]}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r[4]}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4 text-muted-foreground"/>
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-success">{delta}</div>
    </div>
  );
}

function RevRow({ icon: Icon, label, value, pct }: { icon: any; label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-muted-foreground"/> {label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-foreground" style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
}
