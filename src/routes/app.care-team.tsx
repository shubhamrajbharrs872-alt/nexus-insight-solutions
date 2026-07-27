import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { careTeam } from "@/lib/pulse-mock";
import { MessageSquare, Phone, UserPlus, Video } from "lucide-react";

export const Route = createFileRoute("/app/care-team")({
  head: () => ({
    meta: [
      { title: "Care team — PulseGuard" },
      { name: "description", content: "Family, physicians and nurses in one shared, consented view." },
      { property: "og:title", content: "Care team — PulseGuard" },
      { property: "og:description", content: "Family, physicians and nurses in one shared view." },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <AppShell
      title="Care team"
      subtitle="Everyone who helps look after Margaret — in one place."
      actions={
        <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-medium text-background hover:opacity-90">
          <UserPlus className="h-3.5 w-3.5"/> Invite member
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {careTeam.map((p) => (
          <Card key={p.name}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background text-sm font-semibold">{p.initials}</div>
                {p.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success"/>}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-xs text-muted-foreground">{p.role}</div>
                <div className="truncate text-[11px] text-muted-foreground">{p.org}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-surface py-1.5 text-xs font-medium hover:bg-muted"><MessageSquare className="h-3.5 w-3.5"/> Message</button>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface hover:bg-muted"><Phone className="h-3.5 w-3.5"/></button>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface hover:bg-muted"><Video className="h-3.5 w-3.5"/></button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <SectionLabel>Emergency escalation order</SectionLabel>
        <Card>
          <ol className="space-y-3">
            {["James Chen · Son · +1 (415) 555-0114", "Elena Chen · Daughter · +1 (415) 555-0119", "Sofia Ortega, RN · Bayside Nursing", "911 · Automatic after 60s"].map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">{i+1}</span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </AppShell>
  );
}
