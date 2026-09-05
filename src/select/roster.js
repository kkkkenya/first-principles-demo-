// Roster: Gregory's engineering portfolio, 5 category stages.
// Each stage summarizes its records inside (blurb + points + links).
// `lines` controls the 2-line breaks like the original (Studio / Mega).
// `hue` drives the placeholder thumbnail gradient per pick.

export const roster = [
  {
    id: "paddock",
    lines: ["About Me"],
    year: "2026",
    stack: ["KU MechEng", "React", "Claude", "M-Pesa"],
    role: "Driver Profile",
    blurb: "Driver profile: the engineer behind every stage on this grid. MechEng Year 2, class rep, vice chair, builder of AI products and communities.",
    cta: "GET TO KNOW ME",
    points: [
      "Gregory Kimemiah: Year 2 Mechanical Engineering at Kenyatta University, Nairobi. Class Representative since September 2024, Vice Chair of MESA KU since Year 2. Expected graduation 2029.",
      "Three years of freelance web development (Vite, React, TypeScript, shadcn/ui) plus AI products on Claude and Gemini, with M-Pesa and Paystack integrations. Industrial attachment completed.",
      "Founder of the Engineering Study Hub (120 members, engineeringhub.site), the MESA KU site (mesa.co.ke), and First Principles tutoring. Open for freelance: reach out through the links below.",
    ],
    links: [
      { label: "gregorykimemiah@gmail.com", url: "mailto:gregorykimemiah@gmail.com" },
      { label: "github.com/kkkkenya", url: "https://github.com/kkkkenya" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/gregory-muhoro-ba2161387/" },
    ],
    stats: { PWR: 88, SPD: 92, STY: 90 },
    hue: 75,
  },
  {
    id: "ai-builds",
    lines: ["AI Projects"],
    year: "2026",
    stack: ["Claude", "Gemini", "M-Pesa", "Supabase"],
    role: "Claude / Gemini",
    blurb: "Applied AI work across commerce, automation, and personal productivity. The centerpiece is a multi-tenant B2B platform for Kenyan social commerce vendors, built around a dual-model agent architecture. Around it sit a messaging automation bot, a hackathon entry, and a live habit-tracking application. Each record below is labeled honestly as live, prototype, or personal use.",
    cta: "VIEW WHAT I'VE BUILT WITH AI",
    points: [
      "Social Commerce SaaS (prototype, unreleased; project name withheld for venture sensitivity). A multi-tenant B2B platform for Kenyan social commerce vendors. The agent layer splits responsibilities: Claude handles reasoning, logic, and safety, while Gemini serves as the customer-facing communicator. Integrations include the Meta Graph API for Instagram DMs and comments, Paystack, and M-Pesa STK push payments.",
      "AI Mashinani (Claude Code build night, Hackhouse Africa, Nairobi). Applied under the Biashara track for small business tooling, but did not attend in the end, so this stays on the record as an entry rather than a result.",
      "WhatsApp Automation Bot (personal use, in development). A draft-and-approve messaging system built with Node.js, whatsapp-web.js, and the Gemini API. The model drafts replies from personality profiles, and every message routes through a Telegram interface for human approval, editing, or discard. Two known crashes remain under investigation.",
      "Life Reset: 66-Day Habit App (live at life-reset-v.vercel.app). A full AI-coached habit tracker built with Vite, React, TypeScript, Supabase, and the Gemini API, featuring adaptive coaching tone, an AI quest generator, and cross-device sync. Built for personal use and shared with peers. Repository at github.com/kkkkenya/life-reseter.",
    ],
    links: [{ label: "life-reset-v.vercel.app", url: "https://life-reset-v.vercel.app" }],
    stats: { PWR: 94, SPD: 86, STY: 88 },
    hue: 258,
  },
  {
    id: "community",
    lines: ["Leadership"],
    year: "2024",
    stack: ["Discord", "Web", "Events", "MESA"],
    role: "Founder / Vice Chair",
    blurb: "Two communities built and led for Kenyan engineering students, a tutoring venture teaching first-principles thinking, and active membership in two campus organizations. This is the operating system underneath everything else on this page: the events pipeline, the distribution, and the habit of showing up every week.",
    cta: "SEE THE COMMUNITIES I LEAD",
    points: [
      "Founder, Engineering Study Hub (started first year, 2024). A paid Discord community for Kenyan engineering students, now at 120 members across Basic and Premium tiers. I own the full loop: content and positioning, the community website at engineeringhub.site, and a weekly-updated events document surfacing hackathons and competitions.",
      "Vice Chair, MESA KU (since Year 2), and Class Representative since September 2024. I help set direction for the Mechanical Engineering student association, and I built and maintain its website at mesa.co.ke alongside an Events Desk tracker covering 27 verified engineering events, with a weekly import workflow.",
      "Founder, First Principles: STEM tutoring for high-achieving students, built on a four-step method (Understand, Derive, Solve, Explain) that trains rebuilding formulas from first principles instead of drilling past papers. Semi-launched and in early days, so no outcome metrics to report yet.",
      "Member, AIESEC and IEEE. One foot in leadership development, one in the technical and professional network.",
    ],
    links: [
      { label: "engineeringhub.site", url: "https://engineeringhub.site" },
      { label: "mesa.co.ke", url: "https://mesa.co.ke" },
    ],
    stats: { PWR: 78, SPD: 90, STY: 94 },
    hue: 210,
  },
  {
    id: "tech-stack",
    lines: ["Tech Skills"],
    year: "2026",
    stack: ["TypeScript", "React", "Python", "M-Pesa"],
    role: "TS / React / AI",
    blurb: "The working toolbox behind every build on this page, grouped by layer. Three years of daily practice on the web stack, with growing depth in LLM APIs and Kenyan payment rails.",
    cta: "BROWSE MY TOOLBOX",
    points: [
      "Languages and frameworks: TypeScript, JavaScript, Python, HTML and CSS. TypeScript and Python carry most of the real work: typed front ends on one side, automation and backend scripting on the other.",
      "Platforms and tools: React, Vite, Node.js, Tailwind CSS, Supabase, Vercel, GitHub, Lovable, shadcn/ui, Zustand. Supabase plus Vercel is the default ship-it stack: database, auth, and hosting without ceremony.",
      "APIs and integrations: Claude, Gemini API, Meta Graph API, Paystack, M-Pesa STK, whatsapp-web.js. Particular depth in dual-model setups and in collecting payments over Kenyan rails.",
    ],
    stats: { PWR: 90, SPD: 92, STY: 84 },
    hue: 150,
  },
  {
    id: "mech-eng",
    lines: ["Engineering"],
    year: "2024",
    stack: ["Kenyatta Univ.", "Year 2", "Class Rep"],
    role: "B.Sc. Year 2",
    blurb: "The degree underneath the method. A B.Sc. in Mechanical Engineering at Kenyatta University, currently in Year 2, with class leadership from first year and a completed industrial attachment. The engineering mindset taught here, first principles first, is what both the tutoring and the building run on.",
    cta: "MY ENGINEERING BACKGROUND",
    points: [
      "B.Sc. Mechanical Engineering, Kenyatta University, Nairobi. Year 2, expected graduation 2029.",
      "Class Representative since September 2024, elected in first year and still serving. Vice Chair of MESA KU since Year 2.",
      "Industrial attachment, Civil Workshop Department: completed. No CAD specialization to report yet, and none is claimed.",
    ],
    stats: { PWR: 88, SPD: 74, STY: 90 },
    hue: 28,
  },
  {
    id: "field-work",
    lines: ["Client Work"],
    year: "2023",
    stack: ["React", "shadcn/ui", "Teaching", "Clients"],
    role: "3 yrs Experience",
    blurb: "Three years of paid freelance web development alongside the degree. Four clients, one stack, everything shipped: organization sites, a dealership, a trader, and the association I help run.",
    cta: "VIEW CLIENT WORK",
    points: [
      "Three years of freelance web development on a standard stack: Vite, React, TypeScript, and shadcn/ui.",
      "Select clients: BEK (organizational website), Sue Autos (dealership website), forex trader Oluwa Vincent (trader website), and MESA KU (association website at mesa.co.ke).",
    ],
    quote: {
      text: "He brings fresh new ideas and perspective, utilizing the tools he has.",
      by: "Oluwa Vincent (forex trader)",
    },
    stats: { PWR: 82, SPD: 94, STY: 86 },
    hue: 318,
  },
]

export const profile = {
  name: "Gregory Kimemiah",
  title: "Mechanical Engineer × Web Developer",
  location: "Kahawa Sukari, Ruiru · Remote",
  email: "gregorykimemiah@gmail.com",
  github: "github.com/kkkkenya",
}
