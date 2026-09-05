const WA_NUMBER = "254745947704"

export function whatsappFor(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  diagnostic:
    "Hi First Principles! I'd like to book a FREE diagnostic session. My child is in Form ___ studying ___.",
  online:
    "Hi First Principles! I'm interested in Online 1-on-1 sessions (KES 1,500). My child is in Form ___ studying ___.",
  inPerson:
    "Hi First Principles! I'm interested in In-Person 2-hour sessions (KES 2,500). We're around ___. My child is in Form ___.",
  timetable:
    "Hi First Principles! I'd like to plan sessions around my child's timetable. They're in Form ___ studying ___.",
}

export const brand = {
  name: "FIRST PRINCIPLES",
  tagline: "1-on-1 STEM tutoring · Form 2–4 · Nairobi, Kenya",
  location: "Nairobi / Kenya",
  whatsapp: whatsappFor(waMessages.diagnostic),
  whatsappShort: "wa.me/254745947704",
  email: "gregorykimemiah@gmail.com",
}

export const hero = {
  eyebrow: "1-on-1 STEM · Form 2–4",
  // Three headline candidates — one per design, for comparison
  headline1: "Getting the right answer isn't the same as understanding why it's right.",
  headline2: "Most tutoring fixes the grade. This fixes the reasoning underneath it.",
  headline3:
    "For students already scoring well — who want the understanding their grade doesn't test.",
  sub: "One-on-one tutoring in Math, Physics, and Chemistry for Form 2–4 students already scoring B and above. Built on top of the syllabus you're already being examined on — not a replacement for it.",
  cta: "Book a diagnostic session",
  secondary: "See the method",
  ctaNote: "One free session. No commitment.",
  annotations: [
    { pen: "red", text: "Correct — but could you get here with different numbers?" },
    { pen: "green", text: null }, // green tick next to the derivation line, no caption
  ],
}

export const gap = {
  title: "THE GAP",
  heading: "The gap that costs scholarships",
  lead: "Students who score well in the 8-4-4 system don't always struggle because they got weaker. They struggle because the exam that earned them the grade never tested the skill university actually demands. Many students who win scholarships abroad end up overwhelmed once they get there — forced to work far harder than peers just to keep up — and a good number lose the scholarship entirely.",
  points: [
    {
      k: "01",
      head: "What earns the grade",
      body: "Recognizing a question type and recalling the right formula, fast, under exam pressure.",
    },
    {
      k: "02",
      head: "What earns the degree",
      body: "Deriving an answer when the formula isn't the one you studied, and defending your reasoning when someone pushes back on it.",
    },
  ],
  stat: "Starting in Form 2 means three years of reasoning practice before the wall — not three months of panic after it.",
}

export const evidence = {
  title: "THE EVIDENCE",
  lead: "You don't have to take our word for the gap. Kenya's own system already admitted it — and the numbers since have measured it.",
  quote: {
    text: "\u201cWe built an education system that valued grades more than skills.\u201d",
    source: "Dr. David Njengere — CEO, Kenya National Examinations Council",
  },
  bigStat: {
    value: "64%",
    label: "of Kenyan university graduates lack the skills employers need — critical thinking, analytical ability, and problem-solving named explicitly.",
    source: "Federation of Kenya Employers survey, 2018",
  },
  chart: {
    heading: "What Kenyan employers say graduates are missing",
    bars: [
      { label: "Communication", value: 49.1 },
      { label: "Critical thinking", value: 41.7 },
    ],
    source: "FKE Skills Needs Survey — % of surveyed enterprises naming each skill as crucial and missing",
  },
  abroad: {
    value: "15,526",
    label: "Kenyan students studied abroad in 2023 — and the number is climbing fast (Australia alone grew 15% in a single year).",
    source: "UNESCO, 2023",
    note: "Universities' counselling departments abroad now treat academic overwhelm among Kenyan students as the norm, not the exception.",
  },
  parallel: {
    heading: "China already ran this experiment",
    body: "Over 10 million students sit China's gaokao every year — and it carries the exact criticism aimed at 8-4-4: it rewards standard answers over independent thought. The market's verdict? A $99 billion after-school tutoring industry where growth is now concentrated in one kind of tutor: those who teach reasoning alongside exam prep. Exam prep alone is losing.",
    stat: "$99.3B",
    statLabel: "China's after-school tutoring market, 2025 — growth concentrated in reasoning-bundled programs",
  },
  probation: {
    heading: "Why \u201csmart enough to get in\u201d doesn't protect the scholarship",
    body: "The closest documented parallel: research on Chinese international students on academic probation in the US. The leading cause wasn't language ability — test scores didn't predict it. The top self-reported reason was inadequate preparation for independent, self-directed work. A reasoning gap, not an intelligence gap — and academic probation is precisely the mechanism by which funding is lost.",
  },
  ucl: "A 14-university study across Kenya, Ghana, and Botswana measured critical-thinking gains over a degree. The deciding factor wasn't resources or class size — it was whether teaching treated knowledge as something to question, not just memorize.",
  analogy: {
    text: "A student who memorizes the route is lost the moment the road closes. A student who can read the map finds another way.",
    punch: "8-4-4 teaches the route. University changes the road. We teach the map.",
  },
}

export const method = {
  title: "THE METHOD",
  lead: "Every session runs the syllabus content you're already being examined on — through a process that builds the reasoning underneath it. Four phases, run in sequence:",
  phases: [
    {
      name: "Build",
      tagline: "Construct understanding from scratch, not from memory",
      items: [
        {
          head: "First-principles derivation",
          body: "Build the formula from what you already know, instead of recalling it.",
        },
        {
          head: "Concept mapping",
          body: "Draw the connections between topics — how energy conservation shows up in both mechanics and thermodynamics — instead of studying units in isolation.",
        },
      ],
    },
    {
      name: "Break",
      tagline: "Stress-test what you think you understand",
      items: [
        {
          head: "Constraint variation",
          body: "Take a solved problem, change one variable or condition, and predict what breaks before solving it.",
        },
        {
          head: "Assumption-hunting",
          body: "Before solving, list every assumption the problem is silently making (ideal gas, no friction, massless string) and check which ones actually hold.",
        },
      ],
    },
    {
      name: "Defend",
      tagline: "Prove it under pressure",
      items: [
        {
          head: "Socratic past-paper work",
          body: "Past questions, answered through guided questioning — not demonstrated and copied.",
        },
        {
          head: "Cross-exam on \u201cwhy\u201d",
          body: "Every time you state a step, you're asked why it's valid — not just whether it's correct.",
        },
        {
          head: "Teach-back",
          body: "Explain the solution as if to a struggling classmate. Gaps in the explanation reveal gaps in understanding, not just recall.",
        },
      ],
    },
    {
      name: "Diagnose",
      tagline: "Learn from what went wrong",
      items: [
        {
          head: "Error analysis",
          body: "Your own mistakes become the lesson — what assumption broke, not just what mark was lost.",
        },
        {
          head: "Reverse engineering",
          body: "Start from a given answer and work backward to the reasoning that produces it.",
        },
        {
          head: "Problem analysis",
          body: "Break unfamiliar problems into knowns, unknowns, and assumptions before touching a formula.",
        },
      ],
    },
  ],
  // Legacy flat list — still used by designs B & C
  items: [
    { n: "1", head: "First-principles derivation", body: "Every formula is rebuilt from the ground up. Students never memorize what they can derive." },
    { n: "2", head: "Socratic questioning", body: "Past papers become dialogues. We ask; the student answers; the answer is never given away." },
    { n: "3", head: "Error analysis", body: "The student's own mistakes become the syllabus. Each error is traced to its root misconception." },
    { n: "4", head: "Reverse engineering", body: "Starting from the solution and working backwards — learning how problems are constructed, not just solved." },
    { n: "5", head: "Structured problem analysis", body: "A repeatable framework: what is given, what is asked, what governs it — before a single line of working." },
    { n: "6", head: "Teach-back", body: "The student explains the concept to us. If you can teach it, you own it." },
  ],
}

export const audience = {
  title: "WHO THIS IS FOR",
  lead: "This is not remediation. This is an edge.",
  intro:
    "This isn't remedial tutoring. It's for students already doing solid work in Math, Physics, or Chemistry who want to close the gap between a good grade and real understanding — before university forces the issue.",
  criteria: [
    "Currently scoring B or above in at least one of Math, Physics, or Chemistry",
    "Aiming at A-band grades and genuine university readiness — locally or abroad",
    "In Form 2, 3, or 4",
    "Wants 1-on-1 pace, not a classroom",
  ],
  notFor: "If your child is struggling to pass, they need a different kind of help — and we'll happily point you to it.",
}

export const about = {
  heading: "WHO IS TEACHING YOUR CHILD?",
  greeting: "Hi, I'm Gregory. I'm not a certified teacher — and that's deliberate.",
  paragraphs: [
    "Most tutors either finished school decades ago or teach full-time and haven't sat an exam under real pressure in years. I finished KCSE recently enough to remember exactly where students lose marks — not in theory, in the actual room, under the actual clock.",
    "What I bring instead of a teaching certificate: a day-school final year with its funding cut, staff reduced to the bare minimum, and only Form Fours left in the compound — the same 30 faces, all year. And yet: an A- overall, with straight As in Mathematics, Physics and Chemistry. I know what's achievable from where your child is starting — because I started further back.",
    "Now I'm two years into Mechanical Engineering at Kenyatta University, where memorised formulas stop working and understanding becomes the only thing that matters. That gap — between what gets you through KCSE and what a demanding degree actually requires — is the one I'm training your child to close before they get there, not after.",
    "Outside lectures, I represent my class as Class Representative, serve as Vice Chair of the Mechanical Engineering Students' Association, and I'm an active member of AIESEC and IEEE. None of that teaches physics. All of it means I show up, keep commitments, and can be trusted with something as serious as your child's exam year.",
  ],
  callout: {
    head: "A NOTE ON QUALIFICATIONS",
    body: "I'm not KNEC-certified. What I offer instead is recency, rigor, and a first-principles method most certified teachers were never trained to use. If you're looking for a formally credentialed tutor, I'm probably not your first call — and that's fine. If you're looking for someone who can show your child exactly why a formula works and how to rebuild it when they forget it, keep reading.",
  },
  // PLACEHOLDERS — replace with real credentials before publishing
  credentials: [
    { label: "Studying", value: "Mechanical Engineering" },
    { label: "Leadership", value: "Class Representative · Vice Chair, MESA" },
    { label: "KCSE", value: "A- overall — straight As in Mathematics, Physics and Chemistry" },
    { label: "Background", value: "Day school · funding cut in final year · 30-student Form 4 class" },
    { label: "Subjects", value: "Mathematics · Physics · Chemistry" },
    { label: "Based in", value: "Kahawa Sukari / Ruiru / Thika Rd · Online anywhere" },
  ],
}

export const gradeVsDegree = {
  grade: {
    head: "THE GRADE",
    points: ["Recognising the question type.", "Remembering the formula.", "Reproducing the method under pressure."],
  },
  degree: {
    head: "THE DEGREE",
    points: ["Understanding unfamiliar problems.", "Deriving when memory fails.", "Explaining your reasoning.", "Adapting when the question changes."],
  },
  close: "We train the second skill without sacrificing the first.",
  sub: "Your child will still perform in KCSE — and actually understand what they're doing.",
}

export const method4 = {
  title: "THE FIRST PRINCIPLES METHOD",
  steps: [
    {
      n: "01",
      head: "UNDERSTAND",
      body: "We strip the concept down to its foundations.",
      asks: ["What is happening?", "Why does it happen?", "What assumptions are we making?"],
    },
    {
      n: "02",
      head: "DERIVE",
      body: "Students learn where formulas come from instead of treating them as magic.",
      asks: ["If you forget the formula, you should be able to rebuild it."],
    },
    {
      n: "03",
      head: "SOLVE",
      body: "We attack progressively unfamiliar problems.",
      asks: ["Not just “Can you get the answer?”", "Can you find a way in?"],
    },
    {
      n: "04",
      head: "EXPLAIN",
      body: "The student teaches the idea back.",
      asks: ["If they can't explain it, we haven't finished learning it."],
    },
  ],
  close: "The goal isn't to make your child better at tutoring. It's to make them need less of it.",
}

export const diagnostic = {
  title: "DON'T GUESS WHAT YOUR CHILD NEEDS.",
  sub: "BOOK A DIAGNOSTIC.",
  body: "A focused one-to-one session built around a real topic from your child's current syllabus.",
  looks: [
    { n: "01", head: "Understanding", body: "What does the student actually understand?" },
    { n: "02", head: "Problem solving", body: "Can they apply the idea when the question changes?" },
    { n: "03", head: "Reasoning", body: "Can they explain why their method works?" },
    { n: "04", head: "Gaps", body: "Where does the reasoning break down?" },
  ],
  close: "You leave knowing what your child can do, where they're getting stuck, and what we recommend next.",
}

export const evidenceLite = {
  title: "THE EVIDENCE",
  stats: [
    {
      value: "64%",
      head: "THE EMPLOYABILITY GAP",
      body: "of graduates lacked the technical skills employers needed.",
      source: "FKE Skills Mismatch Survey, 2018",
    },
  ],
}

export const fit = {
  title: "IS THIS FOR YOUR CHILD?",
  yes: [
    "Are currently performing reasonably well but want to reach the A range.",
    "Understand procedures but struggle when questions look unfamiliar.",
    "Ask “Why?” instead of being satisfied with memorising steps.",
    "Are preparing for university locally or abroad.",
    "Would benefit from individual attention rather than another classroom.",
  ],
  no: "They're currently struggling with basic foundational content and need intensive remedial support.",
  noNote: "We aren't for everyone. That increases the value for the students we do take.",
}

export const outcomes = {
  title: "AFTER A FEW MONTHS, WE WANT YOUR CHILD TO…",
  items: [
    { head: "SEE THE PROBLEM", body: "Before touching a formula, identify what's actually being asked." },
    { head: "CHOOSE A METHOD", body: "Know why a particular approach makes sense." },
    { head: "HANDLE THE UNFAMILIAR", body: "Stay calm when the question doesn't look like the example." },
    { head: "EXPLAIN THE ANSWER", body: "Communicate the reasoning clearly." },
    { head: "WORK WITHOUT YOU", body: "The ultimate goal. Independence." },
  ],
}

export const parentNote = {
  title: "YOU DON'T NEED ANOTHER TUTOR WHO JUST DOES HOMEWORK.",
  body: "You can find someone to sit beside your child and work through ten questions. That's not difficult.",
  question: "Will your child know what to do when nobody is there to show them the next step?",
  close: "That's what we're trying to build.",
}

export const pricing = {
  title: "SIMPLE PRICING.",
  sub: "PAY PER SESSION. NO TERM CONTRACT.",
  tiers: [
    {
      name: "DIAGNOSTIC",
      price: "FREE",
      per: "45–60 min assessment",
      includes: ["45–60 minute 1-on-1 assessment", "Written feedback report for you", "10-minute parent debrief call", "Sample problem set to try at home"],
      excludes: ["No full topic coverage", "No ongoing tracking"],
      cta: "Book Free Diagnostic",
      waKey: "diagnostic",
    },
    {
      name: "ONLINE 1-ON-1",
      price: "KES 1,500",
      per: "/ session · online",
      includes: ["60–90 minutes live on Google Meet / Zoom", "Shared whiteboard every session", "Session recordings for revision", "Progress tracking sheet for parents", "Free rescheduling with 24h notice", "Exam-paper drill packs per topic"],
      excludes: ["Not in-person", "No printed materials", "Standard slots only"],
      cta: "Start Online",
      waKey: "online",
    },
    {
      name: "IN-PERSON 2-HOUR",
      badge: "MOST POPULAR",
      price: "KES 2,500",
      per: "/ session · 2 full hours",
      effective: "Timed practice + review in one sitting",
      includes: ["Everything in Online, plus:", "2 full hours, face-to-face", "I come to you — sessions at your home", "Worked solutions to keep", "Timed practice marked in-session", "Priority slot booking", "Termly progress report + parent meeting", "Exam-term crash intensive access", "Printed revision packs per topic"],
      excludes: ["Only around the Thika Rd corridor", "Limited slots each week"],
      cta: "Book In-Person",
      waKey: "inPerson",
      featured: true,
    },
  ],
  compare: {
    head: "WHY IN-PERSON COSTS MORE",
    left: { label: "Online session", price: "KES 1,500", sub: "~75 min · on screen · no travel either side" },
    right: { label: "In-person session", price: "KES 2,500", sub: "120 min · at your home · face-to-face" },
    save: "Per hour it's nearly identical — in-person buys depth and presence, not just minutes. The fare is on us, the focus is on your child.",
  },
}

export const logistics = {
  title: "HOW IT WORKS",
  items: [
    { icon: "MapPin", head: "WHERE?", body: "Online anywhere via Google Meet / Zoom. In-person, I travel to you — sessions at your home around Kahawa Sukari, Ruiru, and the Thika Road corridor." },
    { icon: "CalendarClock", head: "WHEN?", body: "Flexible scheduling around school hours — evenings and weekends included." },
    { icon: "Clock", head: "HOW LONG?", body: "Online 60–90 minutes · In-person 2 full hours · Free diagnostic 45–60 minutes." },
    { icon: "Repeat", head: "HOW OFTEN?", body: "Typically 1–2 sessions per week, depending on the student's goals." },
    { icon: "BookOpen", head: "SUBJECTS", body: "Mathematics · Physics · Chemistry." },
    { icon: "GraduationCap", head: "LEVEL", body: "Form 2 · Form 3 · Form 4." },
  ],
}

export const faq = {
  title: "QUESTIONS PARENTS ASK",
  items: [
    {
      q: "Is this exam preparation?",
      a: "Yes — but not exam preparation alone. Sessions use the student's actual syllabus and exam-style questions while deliberately developing the reasoning underneath them.",
    },
    { q: "Is tutoring online or in person?", a: "Both. Online anywhere via Google Meet or Zoom, and in-person where I travel to your home around Kahawa Sukari, Ruiru, and the Thika Road corridor." },
    { q: "How much does it cost?", a: "The diagnostic is free. Online sessions are KES 1,500 each; in-person 2-hour sessions are KES 2,500 each. Pay per session — no term contract." },
    { q: "How long is a session?", a: "Online sessions run 60–90 minutes, in-person sessions are 2 full hours, and the diagnostic is 45–60 minutes." },
    { q: "What happens during the diagnostic?", a: "One topic from your child's syllabus, worked through first-principles. We assess understanding, problem solving, reasoning and gaps — then give written feedback and a recommendation." },
    { q: "Can I stop after the diagnostic?", a: "Yes." },
    {
      q: "Do you guarantee grades?",
      a: "No. We don't guarantee a particular grade. We guarantee a serious, structured process designed around understanding, reasoning and measurable progress.",
    },
  ],
}

export const articles = [
  {
    slug: "derive-quadratic-formula",
    title: "Derive the quadratic formula — so you never memorise it again",
    excerpt:
      "Most students can recite x = (−b ± √(b²−4ac)) / 2a. Almost none can rebuild it if they forget. Here's the 6-step derivation, and why it matters more than the formula.",
    minutes: 6,
    sections: [
      {
        head: "Why derivation beats memorisation",
        paras: [
          "A memorised formula is a single point of failure: forget one sign and the whole question collapses. A derived formula is a path you can walk again — even mid-exam, even under pressure.",
          "This is the difference between what earns the grade (recall) and what earns the degree (reasoning). The derivation below takes six steps. Learn it once and the formula is yours permanently.",
        ],
      },
      {
        head: "The derivation, step by step",
        paras: [
          "Start with ax² + bx + c = 0, where a ≠ 0. Step 1: divide everything by a → x² + (b/a)x + c/a = 0.",
          "Step 2: move the constant over → x² + (b/a)x = −c/a. Step 3: complete the square — add (b/2a)² to both sides.",
          "Step 4: the left side is now a perfect square → (x + b/2a)² = b²/4a² − c/a. Step 5: combine the right side over 4a² → (x + b/2a)² = (b² − 4ac) / 4a².",
          "Step 6: take the square root of both sides and isolate x. You get x = (−b ± √(b²−4ac)) / 2a. That ±, that discriminant, that 2a — none of them are magic anymore. Each one came from a step you chose.",
        ],
      },
      {
        head: "The forget test",
        paras: [
          "Cover the formula. Rebuild it from x² + (b/a)x = −c/a on a blank page. If you stall, you don't have a memory problem — you have an understanding gap at exactly the step where you stalled. That step is your next lesson.",
          "This is what a diagnostic session does systematically: find the exact step where reasoning breaks, then fix that step — not the whole chapter.",
        ],
      },
    ],
  },
  {
    slug: "past-papers-stop-working",
    title: "Why past papers stop working (and what to do instead)",
    excerpt:
      "Past papers feel productive — until the exam asks the same idea in unfamiliar clothes. A 3-step protocol for unfamiliar problems, from a tutor who teaches reasoning, not recall.",
    minutes: 5,
    sections: [
      {
        head: "Recognition is not understanding",
        paras: [
          "Most revision trains recognition: see a familiar shape, reproduce a familiar method. It works beautifully — right up until the examiner changes the shape. Then students who 'studied hard' stare at a question built from ideas they technically know.",
          "The examiner isn't testing whether you saw this question before. They're testing whether you can find a way in when you haven't.",
        ],
      },
      {
        head: "The 3-step unfamiliar-problem protocol",
        paras: [
          "Step 1 — SEE THE PROBLEM: before touching a formula, write down in plain words what is being asked, what is given, and what is unknown. Half of 'hard' questions dissolve here.",
          "Step 2 — CHOOSE A METHOD, AND SAY WHY: pick an approach and state out loud why it fits — 'energy is conserved here because…'. If you can't say why, you don't have a method, you have a hope.",
          "Step 3 — EXPLAIN THE ANSWER: after solving, teach it back as if to a classmate who missed the lesson. Every gap in your explanation is a gap in understanding. Close it before the exam does.",
        ],
      },
      {
        head: "How to practise this",
        paras: [
          "Take a past paper you've already done. Change one number, one condition, one assumption — then solve it again. If the change breaks you, your understanding was attached to the specific question, not the idea underneath it.",
          "Constraint variation like this is a standard technique in our sessions — it converts past papers from memory drills into reasoning training.",
        ],
      },
    ],
  },
]

export const finalCta = {
  title: "LET'S FIND OUT WHERE YOUR CHILD REALLY IS.",
  body: "Bring a topic they're currently studying. We'll test how deep the understanding goes — free.",
  note: "One session. No long-term commitment.",
}

export const cta = {
  title: "START WITH ONE DIAGNOSTIC SESSION.",
  body: "One session, one topic from your syllabus, worked through first-principles instead of formula recall — so you can see the difference before committing to anything.",
  primary: "Message on WhatsApp",
  secondary: "Email instead",
}
