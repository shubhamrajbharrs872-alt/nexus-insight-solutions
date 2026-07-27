import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Activity, Bell, Shield, Sparkles, HeartPulse, Check, Star } from "lucide-react";
import { Logo } from "@/components/pulse/logo";
import { ThemeToggle } from "@/components/pulse/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PulseGuard — AI health & elder-care companion" },
      { name: "description", content: "Passive vitals monitoring, fall detection, medication coaching and AI insights for the people you love. Trusted by 12,000+ families." },
      { property: "og:title", content: "PulseGuard — AI health & elder-care companion" },
      { property: "og:description", content: "Passive vitals monitoring, fall detection, medication coaching and AI insights for the people you love." },
      { name: "twitter:title", content: "PulseGuard — AI health & elder-care companion" },
      { name: "twitter:description", content: "Passive vitals monitoring, fall detection and AI insights for the people you love." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingNav />
      <Hero />
      <SocialProof />
      <FeatureGrid />
      <AppPreview />
      <HowItWorks />
      <Pricing />
      <Testimonial />
      <CTA />
      <MarketingFooter />
    </div>
  );
}

function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <Link to="/admin" className="hover:text-foreground">For clinics</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/auth" className="hidden sm:inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-foreground hover:bg-muted">Sign in</Link>
          <Link to="/app" className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground px-4 text-sm font-medium text-background hover:opacity-90">
            Open app <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-pulse/15 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 text-center sm:pt-28">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-pulse pulse-dot" />
          Now with GPT-powered clinical summaries
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl animate-fade-up">
          Peace of mind, <br className="hidden sm:block" />
          <span className="text-muted-foreground">for the people you love.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-up">
          PulseGuard passively monitors vitals, detects falls, and turns weeks of data into clear, human recommendations — so caregivers can act early, not react late.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
          <Link to="/app" className="inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:opacity-90">
            Try the live prototype <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#features" className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-6 text-sm font-medium hover:bg-muted">
            See how it works
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> HIPAA · SOC 2 Type II</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> FDA-registered wearable</span>
          <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> 4.9 · 12,482 families</span>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const orgs = ["Stanford Health", "Kaiser", "Cleveland Clinic", "Mayo", "Bayside Nursing", "AARP"];
  return (
    <section className="border-y border-border bg-surface-2/40">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Deployed with clinical and care partners
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-muted-foreground">
          {orgs.map((o) => <span key={o} className="opacity-70">{o}</span>)}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: HeartPulse, title: "Continuous vitals", body: "Heart rate, SpO₂, BP, temperature and glucose captured passively — no manual logging." },
  { icon: Bell, title: "Fall & risk detection", body: "On-device ML detects falls in <2s. Automatic escalation to family and emergency services." },
  { icon: Sparkles, title: "AI clinical summaries", body: "Weekly narratives your doctor can actually read. Trends flagged with confidence scores." },
  { icon: Activity, title: "Medication coach", body: "Smart pillbox integration, adaptive reminders, and adherence you can trust." },
  { icon: Shield, title: "Privacy by design", body: "End-to-end encryption, on-device inference where possible, GDPR-ready audit logs." },
  { icon: Check, title: "Care team hand-off", body: "One tap loops in the primary physician, RN, and family. Shared, consented view." },
];

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Product</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">One companion. Every signal that matters.</h2>
        <p className="mt-4 text-muted-foreground">Sensors, software and AI working together so no small change becomes a big emergency.</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <section className="bg-surface-2/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Live prototype</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Designed like the app your doctor wishes they had.</h2>
            <p className="mt-4 text-muted-foreground">Clear hierarchy. Calm typography. Every screen is one glance away from an answer — for the caregiver at 2 AM, the physician between rounds, and the family in the group chat.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Real-time vitals with 30-day baselines", "AI insights with confidence & source data", "Two-tap escalation to your care team", "Native light & dark, iOS-quality motion"].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-pulse" /> {x}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/app" className="inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:opacity-90">
                Enter the dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-2 shadow-elevated">
              <div className="rounded-2xl bg-surface-2 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Good morning, Ana</div>
                    <div className="text-lg font-semibold">Margaret is doing well</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" /> Stable
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[["72", "bpm"], ["97", "% SpO₂"], ["7.2", "hrs sleep"]].map(([v, l]) => (
                    <div key={l} className="rounded-xl bg-card p-3 hairline">
                      <div className="text-2xl font-semibold tracking-tight">{v}</div>
                      <div className="text-[11px] text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-pulse" /> AI insight</div>
                  <div className="mt-1 text-sm">Deep sleep drops when the bedroom exceeds 22°C. Consider 20°C between 10 PM and 6 AM.</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-pulse/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Ship the PulseBand", b: "Free with any plan. Set up in under 3 minutes — no clinical training required." },
    { n: "02", t: "We watch, quietly", b: "Sensors + AI baseline the person you care for over 14 days. No spam, no false alarms." },
    { n: "03", t: "You get answers", b: "Weekly summaries, real-time alerts, and a shared view for the whole care circle." },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">How it works</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Set up once. Sleep better every night.</h2>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="text-xs font-medium text-pulse">{s.n}</div>
            <div className="mt-3 text-lg font-semibold tracking-tight">{s.t}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const plans = [
  { name: "Family", price: "$29", period: "/ month", body: "For one loved one. Includes PulseBand, unlimited alerts, and family sharing.", cta: "Start free 14-day trial", features: ["1 monitored person", "Family + physician sharing", "AI weekly summaries", "24/7 emergency escalation"] },
  { name: "Family+", price: "$49", period: "/ month", featured: true, body: "For multi-generation families or complex conditions.", cta: "Choose Family+", features: ["Up to 3 people", "Advanced AI risk scoring", "Direct RN chat (business hours)", "Priority emergency response"] },
  { name: "Clinics", price: "Custom", period: "", body: "For nursing homes, home-health agencies and health systems.", cta: "Talk to sales", features: ["Unlimited residents", "SSO, RBAC, audit logs", "EHR integration (FHIR)", "Dedicated success manager"] },
];

function Pricing() {
  return (
    <section id="pricing" className="bg-surface-2/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Pricing</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Simple plans. No small print.</h2>
          <p className="mt-4 text-muted-foreground">Hardware included. Cancel anytime. FSA/HSA eligible in the US.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-8 shadow-soft ${p.featured ? "border-foreground bg-card ring-1 ring-foreground" : "border-border bg-card"}`}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{p.name}</div>
                {p.featured && <span className="rounded-full bg-pulse px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Popular</span>}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <div className="text-5xl font-semibold tracking-tight">{p.price}</div>
                <div className="text-sm text-muted-foreground">{p.period}</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-pulse" /> {f}</li>)}
              </ul>
              <Link to="/auth" className={`mt-8 inline-flex h-10 w-full items-center justify-center rounded-full text-sm font-medium ${p.featured ? "bg-foreground text-background hover:opacity-90" : "border border-border bg-surface hover:bg-muted"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <div className="flex justify-center gap-1 text-pulse">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
      </div>
      <blockquote className="mt-6 text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
        “PulseGuard called me before my mother even knew she'd fallen. By the time I got to the hospital, her doctor already had a full history.”
      </blockquote>
      <div className="mt-6 text-sm text-muted-foreground">Sarah K. · Family caregiver · Austin, TX</div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground p-12 text-background sm:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pulse/40 blur-3xl" />
        <div className="relative max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">The best time to start was a year ago. The next best time is tonight.</h2>
          <p className="mt-4 text-background/70">Set up in 3 minutes. First alert usually within a week.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" className="inline-flex h-11 items-center gap-1.5 rounded-full bg-background px-6 text-sm font-medium text-foreground hover:opacity-90">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/app" className="inline-flex h-11 items-center rounded-full border border-background/20 px-6 text-sm font-medium hover:bg-background/10">
              Explore the app
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">PulseGuard is an AI-first health & elder-care companion trusted by 12,000+ families.</p>
        </div>
        {[
          ["Product", ["Features", "Pricing", "PulseBand", "Changelog"]],
          ["Company", ["About", "Careers", "Press", "Contact"]],
          ["Trust", ["HIPAA", "SOC 2", "Privacy", "Security"]],
        ].map(([h, items]) => (
          <div key={h as string}>
            <div className="text-sm font-semibold">{h}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {(items as string[]).map((i) => <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground">
          <div>© 2026 PulseGuard Health, Inc.</div>
          <div>Made with care in San Francisco</div>
        </div>
      </div>
    </footer>
  );
}
