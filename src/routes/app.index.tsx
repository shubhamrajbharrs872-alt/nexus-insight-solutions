import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { alerts, heartRateSeries, insights, kpis, medications, timeline, vitalsToday, ward } from "@/lib/pulse-mock";
import { Activity, ArrowUpRight, Bell, Heart, Moon, Pill, Sparkles, ThermometerSun, Droplet, Footprints, Gauge, ChevronRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Overview — PulseGuard" },
      { name: "description", content: "Live overview of vitals, alerts, medications and AI insights for the person you care for." },
      { property: "og:title", content: "Overview — PulseGuard" },
      { property: "og:description", content: "Real-time care dashboard." },
    ],
  }),
  component: Overview,
});

const iconMap = { heart: Heart, moon: Moon, pill: Pill, activity: Activity } as const;

function Overview() {
  return (
    <AppShell
      title={`Good morning, Ana`}
      subtitle={`Here's how ${ward.name} is doing — updated 12 seconds ago.`}
      actions={
        <div className="flex items-center gap-2">
          <Link to="/app/alerts" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 text-xs font-medium hover:bg-muted">
            <Bell className="h-3.5 w-3.5" /> 2 active alerts
          </Link>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-medium text-background hover:opacity-90">
            <Sparkles className="h-3.5 w-3.5" /> Ask PulseGuard AI
          </button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <VitalCard icon={Heart} label="Heart rate" value={vitalsToday.heartRate.value} unit="bpm" trend={vitalsToday.heartRate.trend} range={vitalsToday.heartRate.range} tone="pulse" />
        <VitalCard icon={Gauge} label="Blood pressure" value={`${vitalsToday.systolic.value}/${vitalsToday.diastolic.value}`} unit="mmHg" trend={vitalsToday.systolic.trend} range="Normal" />
        <VitalCard icon={Droplet} label="SpO₂" value={vitalsToday.spo2.value} unit="%" trend={vitalsToday.spo2.trend} range={vitalsToday.spo2.range} />
        <VitalCard icon={ThermometerSun} label="Temperature" value={vitalsToday.temp.value} unit="°C" trend={0} range="Normal" />
        <VitalCard icon={Footprints} label="Steps" value={vitalsToday.steps.value.toLocaleString()} unit="today" trend={vitalsToday.steps.trend} range="Goal 4,000" />
        <VitalCard icon={Moon} label="Sleep" value={vitalsToday.sleep.value} unit="hrs" trend={vitalsToday.sleep.trend} range="Goal 7.5" />
        <VitalCard icon={Droplet} label="Glucose" value={vitalsToday.glucose.value} unit="mg/dL" trend={vitalsToday.glucose.trend} range={vitalsToday.glucose.range} />
        <VitalCard icon={Activity} label="Fall risk" value="Low" unit="↓14% MoM" trend={-14} range="AI computed" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel>Heart rate · today</SectionLabel>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-semibold tracking-tight">72<span className="ml-1 text-sm text-muted-foreground">bpm</span></div>
                <div className="text-xs text-success">↓ 2 bpm vs. 30-day avg</div>
              </div>
            </div>
            <Link to="/app/vitals" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              Full trends <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartRateSeries} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--pulse)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--pulse)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="hr" stroke="var(--pulse)" strokeWidth={2} fill="url(#hr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <SectionLabel>AI insight of the day</SectionLabel>
            <Sparkles className="h-4 w-4 text-pulse" />
          </div>
          <div className="text-lg font-semibold tracking-tight">{insights[0].title}</div>
          <p className="mt-2 text-sm text-muted-foreground">{insights[0].body}</p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">Confidence {Math.round(insights[0].confidence * 100)}%</span>
            <Link to="/app/insights" className="text-foreground hover:underline">See all insights →</Link>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <SectionLabel>Recent activity</SectionLabel>
            <Link to="/app/vitals" className="text-xs text-muted-foreground hover:text-foreground">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {timeline.map((t, i) => {
              const Icon = iconMap[t.icon as keyof typeof iconMap] ?? Activity;
              return (
                <li key={i} className="flex items-center gap-3 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 text-sm">{t.text}</div>
                  <div className="text-xs text-muted-foreground">{t.time}</div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <SectionLabel>Active alerts</SectionLabel>
            <Link to="/app/alerts" className="text-xs text-muted-foreground hover:text-foreground">Open</Link>
          </div>
          <ul className="space-y-3">
            {alerts.filter(a => a.status === "active").map((a) => (
              <li key={a.id} className="rounded-xl border border-border p-3">
                <div className="flex items-start gap-2">
                  <span className={`mt-1 h-2 w-2 rounded-full ${a.severity === "critical" ? "bg-destructive pulse-dot" : "bg-warning"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{a.body}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{a.time} · {a.location}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionLabel>Medications today</SectionLabel>
          <ul className="divide-y divide-border">
            {medications.map((m) => (
              <li key={m.name} className="flex items-center gap-3 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <Pill className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.name} · <span className="text-muted-foreground">{m.dose}</span></div>
                  <div className="text-xs text-muted-foreground">{m.schedule} · next {m.next}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{m.adherence}%</div>
                  <div className="text-[11px] text-muted-foreground">adherence</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionLabel>This month</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-border p-3">
                <div className="text-2xl font-semibold tracking-tight">{k.value}</div>
                <div className="text-[11px] text-muted-foreground">{k.label}</div>
                <div className="mt-1 text-[11px] text-success">{k.delta}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function VitalCard({ icon: Icon, label, value, unit, trend, range, tone }: {
  icon: any; label: string; value: string | number; unit: string; trend: number; range: string; tone?: "pulse";
}) {
  const trendUp = trend > 0;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-elevated">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
        <Icon className={`h-4 w-4 ${tone === "pulse" ? "text-pulse" : "text-muted-foreground"}`} />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{unit}</div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{range}</span>
        {trend !== 0 && (
          <span className={trendUp ? "text-warning" : "text-success"}>
            {trendUp ? "↑" : "↓"} {Math.abs(trend)}
          </span>
        )}
      </div>
    </div>
  );
}
