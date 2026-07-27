import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { medications } from "@/lib/pulse-mock";
import { Pill, Plus, Check, Clock } from "lucide-react";

export const Route = createFileRoute("/app/medications")({
  head: () => ({
    meta: [
      { title: "Medications — PulseGuard" },
      { name: "description", content: "Smart pillbox schedules, adaptive reminders and adherence tracking." },
      { property: "og:title", content: "Medications — PulseGuard" },
      { property: "og:description", content: "Smart pillbox and adherence tracking." },
    ],
  }),
  component: Meds,
});

const week = ["M","T","W","T","F","S","S"];

function Meds() {
  const overall = Math.round(medications.reduce((a, m) => a + m.adherence, 0) / medications.length);
  return (
    <AppShell
      title="Medications"
      subtitle="Adaptive reminders and smart-pillbox confirmation."
      actions={
        <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-medium text-background hover:opacity-90">
          <Plus className="h-3.5 w-3.5"/> Add medication
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <SectionLabel>Adherence · 30 days</SectionLabel>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-semibold tracking-tight">{overall}%</div>
            <div className="text-xs text-success">+3% vs. last month</div>
          </div>
          <div className="mt-5 flex gap-1.5">
            {Array.from({ length: 30 }).map((_, i) => {
              const missed = [4, 11, 22].includes(i);
              return <span key={i} className={`h-8 flex-1 rounded ${missed ? "bg-warning/50" : "bg-pulse/70"}`} />;
            })}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>Oct 24</span><span>Today</span></div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionLabel>Weekly plan</SectionLabel>
          <div className="grid grid-cols-8 gap-2 text-center text-[11px] text-muted-foreground">
            <div></div>
            {week.map((d, i) => <div key={i} className={i === 3 ? "font-semibold text-foreground" : ""}>{d}</div>)}
          </div>
          <div className="mt-2 space-y-2">
            {medications.map((m) => (
              <div key={m.name} className="grid grid-cols-8 items-center gap-2 rounded-xl border border-border p-2">
                <div className="text-xs">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-muted-foreground">{m.dose}</div>
                </div>
                {week.map((_, i) => (
                  <div key={i} className={`flex h-10 items-center justify-center rounded-lg ${i < 4 ? "bg-pulse/15 text-pulse" : "bg-muted text-muted-foreground"}`}>
                    {i < 4 ? <Check className="h-3.5 w-3.5"/> : <Clock className="h-3.5 w-3.5"/>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {medications.map((m) => (
          <Card key={m.name}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted"><Pill className="h-5 w-5"/></span>
              <div className="flex-1">
                <div className="text-base font-semibold">{m.name} <span className="font-normal text-muted-foreground">· {m.dose}</span></div>
                <div className="text-xs text-muted-foreground">{m.schedule}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{m.adherence}%</div>
                <div className="text-[10px] text-muted-foreground">adherence</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">Next · {m.next}</span>
              <button className="rounded-full border border-border bg-surface px-3 py-1 font-medium hover:bg-muted">Edit schedule</button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
