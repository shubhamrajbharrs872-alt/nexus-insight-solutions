// Realistic mock data for the PulseGuard prototype.
export const currentUser = {
  name: "Dr. Ana Marquez",
  role: "Primary Caregiver",
  email: "ana@pulseguard.health",
  avatar: "AM",
};

export const ward = {
  name: "Margaret Chen",
  age: 78,
  relationship: "Mother",
  location: "Palo Alto, CA",
  device: "PulseBand v2 · 92% battery",
  since: "Since Jan 2025",
  photoInitials: "MC",
};

export const vitalsToday = {
  heartRate: { value: 72, unit: "bpm", trend: -2, range: "60–100" },
  spo2: { value: 97, unit: "%", trend: 0, range: "95–100" },
  systolic: { value: 128, unit: "mmHg", trend: 3, range: "90–130" },
  diastolic: { value: 82, unit: "mmHg", trend: 1, range: "60–85" },
  temp: { value: 36.7, unit: "°C", trend: 0, range: "36.1–37.2" },
  steps: { value: 3240, unit: "steps", trend: 12, range: "goal 4000" },
  sleep: { value: 7.2, unit: "hrs", trend: 4, range: "goal 7.5" },
  glucose: { value: 108, unit: "mg/dL", trend: -1, range: "70–140" },
};

export const heartRateSeries = [
  { t: "00:00", hr: 62 }, { t: "02:00", hr: 58 }, { t: "04:00", hr: 56 },
  { t: "06:00", hr: 61 }, { t: "08:00", hr: 74 }, { t: "10:00", hr: 78 },
  { t: "12:00", hr: 82 }, { t: "14:00", hr: 76 }, { t: "16:00", hr: 88 },
  { t: "18:00", hr: 79 }, { t: "20:00", hr: 72 }, { t: "22:00", hr: 66 },
];

export const sleepSeries = [
  { d: "Mon", deep: 1.8, rem: 1.6, light: 3.4 },
  { d: "Tue", deep: 2.1, rem: 1.4, light: 3.9 },
  { d: "Wed", deep: 1.5, rem: 1.7, light: 3.2 },
  { d: "Thu", deep: 2.3, rem: 1.9, light: 3.6 },
  { d: "Fri", deep: 1.9, rem: 1.5, light: 3.1 },
  { d: "Sat", deep: 2.4, rem: 2.0, light: 3.8 },
  { d: "Sun", deep: 2.0, rem: 1.8, light: 3.4 },
];

export const bpSeries = [
  { d: "Mon", sys: 124, dia: 80 }, { d: "Tue", sys: 128, dia: 82 },
  { d: "Wed", sys: 132, dia: 84 }, { d: "Thu", sys: 126, dia: 81 },
  { d: "Fri", sys: 130, dia: 83 }, { d: "Sat", sys: 127, dia: 82 },
  { d: "Sun", sys: 128, dia: 82 },
];

export const alerts = [
  {
    id: "a1", severity: "critical", title: "Fall detected in the living room",
    body: "PulseBand accelerometer + no motion for 47s. Auto-dialing family in 20s.",
    time: "2 min ago", location: "Living Room · Sensor 04", status: "active",
  },
  {
    id: "a2", severity: "warning", title: "Elevated resting heart rate",
    body: "88 bpm sustained for 12 minutes while stationary. Above 30-day baseline.",
    time: "18 min ago", location: "Bedroom", status: "active",
  },
  {
    id: "a3", severity: "info", title: "Medication reminder skipped",
    body: "Lisinopril 10mg not confirmed at 8:00 AM. Retry scheduled for 10:00 AM.",
    time: "1 hr ago", location: "Kitchen · Smart Pillbox", status: "resolved",
  },
  {
    id: "a4", severity: "info", title: "Weekly wellness summary ready",
    body: "AI insights for Nov 17–23 are ready to review. 3 new recommendations.",
    time: "Yesterday", location: "System", status: "resolved",
  },
];

export const medications = [
  { name: "Lisinopril", dose: "10 mg", schedule: "8:00 AM · Daily", adherence: 94, next: "Tomorrow 8:00 AM", color: "coral" },
  { name: "Atorvastatin", dose: "20 mg", schedule: "9:00 PM · Daily", adherence: 88, next: "Tonight 9:00 PM", color: "teal" },
  { name: "Metformin", dose: "500 mg", schedule: "8:00 AM / 8:00 PM", adherence: 97, next: "Tonight 8:00 PM", color: "amber" },
  { name: "Vitamin D3", dose: "1000 IU", schedule: "With breakfast", adherence: 82, next: "Tomorrow 8:30 AM", color: "violet" },
];

export const insights = [
  {
    id: "i1", tag: "Cardio",
    title: "Blood pressure trending up on weekdays",
    body: "Systolic averages 132 Mon–Fri vs. 126 on weekends. Possible correlation with reduced sleep (avg 6.8h weekdays).",
    confidence: 0.86,
  },
  {
    id: "i2", tag: "Movement",
    title: "Fall risk score decreased 14% this month",
    body: "Gait steadiness improved after starting balance exercises on Nov 4. Keep the current PT program.",
    confidence: 0.91,
  },
  {
    id: "i3", tag: "Sleep",
    title: "Deep sleep drops when room temp exceeds 22°C",
    body: "Consider lowering the smart thermostat to 20°C between 10 PM and 6 AM. Historical data supports a 22% deep-sleep gain.",
    confidence: 0.78,
  },
];

export const careTeam = [
  { name: "Dr. Rahul Patel", role: "Primary Physician", org: "Stanford Health", initials: "RP", online: true },
  { name: "Sofia Ortega, RN", role: "Home Care Nurse", org: "Bayside Nursing", initials: "SO", online: true },
  { name: "James Chen", role: "Son · Emergency Contact", org: "Family", initials: "JC", online: false },
  { name: "Elena Chen", role: "Daughter", org: "Family", initials: "EC", online: true },
  { name: "Marcus Fields, PT", role: "Physical Therapist", org: "MoveWell", initials: "MF", online: false },
];

export const timeline = [
  { time: "9:42 AM", icon: "heart", text: "Heart rate normal · 72 bpm during morning walk" },
  { time: "8:15 AM", icon: "pill", text: "Lisinopril 10mg confirmed via smart pillbox" },
  { time: "7:30 AM", icon: "moon", text: "Woke up · 7.2 hrs sleep, 2.1 hrs deep" },
  { time: "6:12 AM", icon: "activity", text: "Restless sleep episode, briefly ~4 min" },
  { time: "10:30 PM", icon: "moon", text: "Sleep started · bedroom 21°C" },
];

export const kpis = [
  { label: "Days monitored", value: "312", delta: "+7 this week" },
  { label: "Alerts resolved", value: "148", delta: "98.6% within SLA" },
  { label: "Adherence", value: "92%", delta: "+3% MoM" },
  { label: "Family confidence", value: "4.9", delta: "avg NPS 71" },
];

export const adminMetrics = {
  activeDevices: 12482,
  activeCaregivers: 8319,
  alertsToday: 2147,
  aiAccuracy: 97.4,
  uptime: 99.98,
  mrr: 184320,
};

export const adminGrowth = [
  { m: "May", users: 1820 }, { m: "Jun", users: 2410 }, { m: "Jul", users: 3160 },
  { m: "Aug", users: 4290 }, { m: "Sep", users: 5680 }, { m: "Oct", users: 7040 },
  { m: "Nov", users: 8319 },
];
