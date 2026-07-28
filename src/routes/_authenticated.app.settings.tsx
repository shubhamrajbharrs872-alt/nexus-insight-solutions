import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionLabel } from "@/components/pulse/app-shell";
import { currentUser, ward } from "@/lib/pulse-mock";
import { useTheme } from "@/components/pulse/theme-provider";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PulseGuard" },
      { name: "description", content: "Manage your PulseGuard account, notifications, privacy and connected devices." },
      { property: "og:title", content: "Settings — PulseGuard" },
      { property: "og:description", content: "Account, notifications, privacy and devices." },
    ],
  }),
  component: Settings,
});

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, set] = [defaultOn, (v: boolean) => v]; void set;
  return (
    <button onClick={(e) => (e.currentTarget.dataset.on = e.currentTarget.dataset.on === "true" ? "false" : "true")}
      data-on={String(defaultOn)}
      className="group relative inline-flex h-6 w-10 items-center rounded-full bg-muted data-[on=true]:bg-foreground transition">
      <span className="ml-0.5 inline-block h-5 w-5 translate-x-0 rounded-full bg-background shadow transition group-data-[on=true]:translate-x-4"/>
    </button>
  );
}

function Settings() {
  const { theme, toggle } = useTheme();
  return (
    <AppShell title="Settings" subtitle="Account, notifications, privacy and devices.">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <SectionLabel>Profile</SectionLabel>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background text-lg font-semibold">{currentUser.avatar}</div>
            <div>
              <div className="text-base font-semibold">{currentUser.name}</div>
              <div className="text-xs text-muted-foreground">{currentUser.role}</div>
              <div className="text-xs text-muted-foreground">{currentUser.email}</div>
            </div>
          </div>
          <button className="mt-4 inline-flex h-9 items-center rounded-full border border-border bg-surface px-3.5 text-xs font-medium hover:bg-muted">Edit profile</button>
        </Card>

        <Card>
          <SectionLabel>Monitored person</SectionLabel>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold">{ward.photoInitials}</div>
            <div>
              <div className="text-base font-semibold">{ward.name}</div>
              <div className="text-xs text-muted-foreground">Age {ward.age} · {ward.relationship}</div>
              <div className="text-xs text-muted-foreground">{ward.location}</div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-border p-3 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Device</span><span className="font-medium">{ward.device}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Since</span><span className="font-medium">{ward.since}</span></div>
          </div>
        </Card>

        <Card>
          <SectionLabel>Appearance</SectionLabel>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium">Dark mode</div>
              <div className="text-xs text-muted-foreground">Currently: {theme}</div>
            </div>
            <button onClick={toggle} data-on={theme === "dark"} className="relative inline-flex h-6 w-10 items-center rounded-full bg-muted data-[on=true]:bg-foreground transition">
              <span className="ml-0.5 inline-block h-5 w-5 rounded-full bg-background shadow transition data-[on=true]:translate-x-4" data-on={theme === "dark"}/>
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionLabel>Notifications</SectionLabel>
          <ul className="divide-y divide-border">
            {[
              ["Critical alerts", "Falls, cardiac events, no-motion", true],
              ["Warning alerts", "Elevated vitals, missed meds", true],
              ["Weekly AI summaries", "Every Sunday at 6 PM", true],
              ["Marketing emails", "Product news and tips", false],
            ].map(([t, s, on]) => (
              <li key={t as string} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{t as string}</div>
                  <div className="text-xs text-muted-foreground">{s as string}</div>
                </div>
                <Toggle defaultOn={on as boolean}/>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionLabel>Privacy & data</SectionLabel>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">Data region</span><span className="font-medium">US-East (HIPAA)</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Encryption</span><span className="font-medium">AES-256 · TLS 1.3</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Audit log</span><span className="font-medium">Enabled</span></li>
          </ul>
          <button className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-full border border-border bg-surface text-xs font-medium hover:bg-muted">Download my data</button>
          <button className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-full text-xs font-medium text-destructive hover:bg-destructive/10">Delete account</button>
        </Card>
      </div>
    </AppShell>
  );
}
