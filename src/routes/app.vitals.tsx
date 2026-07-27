import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { bpSeries, heartRateSeries, sleepSeries, vitalsToday } from "@/lib/pulse-mock";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/vitals")({
  head: () => ({
    meta: [
      { title: "Vitals — PulseGuard" },
      { name: "description", content: "Continuous heart rate, blood pressure, SpO₂ and sleep trends with 30-day baselines." },
      { property: "og:title", content: "Vitals — PulseGuard" },
      { property: "og:description", content: "Continuous vitals with 30-day baselines." },
    ],
  }),
  component: Vitals,
});

const tabs = ["24h", "7d", "30d", "90d"] as const;

function Vitals() {
  return (
    <AppShell
      title="Vitals"
      subtitle="Continuous signals with baselines and anomaly detection."
      actions={
        <div className="inline-flex items-center rounded-full border border-border bg-surface p-1 text-xs">
          {tabs.map((t, i) => (
            <button key={t} className={`rounded-full px-3 py-1.5 ${i === 1 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionLabel>Heart rate · today</SectionLabel>
          <div className="text-3xl font-semibold tracking-tight">{vitalsToday.heartRate.value}<span className="ml-1 text-sm text-muted-foreground">bpm avg</span></div>
          <div className="mt-4 h-56">
            <ResponsiveContainer><AreaChart data={heartRateSeries}>
              <defs><linearGradient id="hr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--pulse)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--pulse)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={30}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}/>
              <Area type="monotone" dataKey="hr" stroke="var(--pulse)" strokeWidth={2} fill="url(#hr2)"/>
            </AreaChart></ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionLabel>Blood pressure · 7 days</SectionLabel>
          <div className="text-3xl font-semibold tracking-tight">128/82<span className="ml-1 text-sm text-muted-foreground">mmHg</span></div>
          <div className="mt-4 h-56">
            <ResponsiveContainer><LineChart data={bpSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={30}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}/>
              <Legend wrapperStyle={{ fontSize: 11 }}/>
              <Line type="monotone" dataKey="sys" name="Systolic" stroke="var(--pulse)" strokeWidth={2} dot={{ r: 3 }}/>
              <Line type="monotone" dataKey="dia" name="Diastolic" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 3 }}/>
            </LineChart></ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionLabel>Sleep composition · last 7 days</SectionLabel>
          <div className="mt-2 h-64">
            <ResponsiveContainer><BarChart data={sleepSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={30}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}/>
              <Legend wrapperStyle={{ fontSize: 11 }}/>
              <Bar dataKey="deep" name="Deep" stackId="a" fill="var(--pulse)" radius={[0,0,0,0]}/>
              <Bar dataKey="rem" name="REM" stackId="a" fill="var(--chart-2)"/>
              <Bar dataKey="light" name="Light" stackId="a" fill="var(--chart-3)" radius={[8,8,0,0]}/>
            </BarChart></ResponsiveContainer>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
