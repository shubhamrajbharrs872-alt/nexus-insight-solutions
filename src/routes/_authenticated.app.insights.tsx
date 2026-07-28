import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { insights } from "@/lib/pulse-mock";
import { Sparkles, Send, TrendingDown, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/insights")({
  head: () => ({
    meta: [
      { title: "AI Insights — PulseGuard" },
      { name: "description", content: "AI-generated clinical summaries, trend detection and personalized recommendations." },
      { property: "og:title", content: "AI Insights — PulseGuard" },
      { property: "og:description", content: "AI-generated summaries and recommendations." },
    ],
  }),
  component: Insights,
});

function Insights() {
  return (
    <AppShell title="AI insights" subtitle="Weekly summaries and trend detection you can trust.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {insights.map((i) => (
            <Card key={i.id}>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{i.tag}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Sparkles className="h-3 w-3 text-pulse"/> Confidence {Math.round(i.confidence * 100)}%</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <button className="rounded-full bg-foreground px-3 py-1.5 font-medium text-background hover:opacity-90">Apply recommendation</button>
                <button className="rounded-full border border-border bg-surface px-3 py-1.5 font-medium hover:bg-muted">Share with doctor</button>
                <button className="rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground">Dismiss</button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="border-b border-border p-4">
              <SectionLabel>Ask PulseGuard AI</SectionLabel>
              <div className="text-sm text-muted-foreground">Ground-truthed on {" "}
                <span className="font-medium text-foreground">312 days</span> of Margaret's data.</div>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto p-4 text-sm">
              <div className="flex justify-end"><div className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3 py-2 text-background">Is mom's resting heart rate still elevated?</div></div>
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3 py-2">
                It's normalized. 30-day resting average is 68 bpm, down from 74 last month. The elevation on Nov 12 correlated with a poor sleep night (5.4h).
              </div>
              <div className="flex justify-end"><div className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3 py-2 text-background">Any fall risk changes I should know about?</div></div>
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3 py-2">
                Fall risk is <span className="font-medium">Low</span> — down 14% since starting balance PT. Keep 3× weekly sessions. I'd flag hallway lighting between 10 PM–2 AM as the biggest remaining factor.
              </div>
            </div>
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2">
                <Sparkles className="h-4 w-4 text-pulse"/>
                <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Ask about vitals, meds, patterns…"/>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background"><Send className="h-3.5 w-3.5"/></button>
              </div>
            </div>
          </Card>

          <Card>
            <SectionLabel>Trending this week</SectionLabel>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-success"/> Fall risk score <span className="ml-auto text-success">-14%</span></li>
              <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-warning"/> Weekday BP average <span className="ml-auto text-warning">+4.2%</span></li>
              <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-success"/> Medication adherence <span className="ml-auto text-success">+3%</span></li>
              <li className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-warning"/> Deep sleep on warm nights <span className="ml-auto text-warning">-22%</span></li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
