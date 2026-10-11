export const profile = {
  name: "Vraj Patel",
  location: "Ahmedabad, Gujarat, India",
  email: "vraj18052007@gmail.com",
  phone: "+91 96622 63901",
  github: "https://github.com/stackvs18",
  linkedin: "https://www.linkedin.com/in/vraj-patel-029190429/",
};

// Opens Gmail compose (web), logged-in account, pre-filled "to" field —
// skips the mailto: dance of picking a mail client.
export function gmailComposeLink(subject?: string) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: profile.email });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const dreamRoleCopy = {
  eyebrow: "What I'm actually chasing",
  heading: "Forward Deployed Engineer.",
  paragraphs: [
    "Not just shipping code — sitting where the business problem and the system meet, translating one into the other in real time.",
    "I want to work both sides: close enough to the customer to understand what's actually broken, close enough to the codebase to fix it that week, not that quarter.",
  ],
};

export const shipCopy = {
  eyebrow: "Also in the toolkit",
  heading: "I ship full products too, not just backend plumbing.",
  paragraphs: [
    "Systems work is the main event, but I like closing the loop — taking something from idea to a live, usable product across web and mobile, fast.",
    "Case in point: a full e-commerce storefront, designed, built, and deployed in under an hour as a speed-run.",
  ],
};

export const heroCopy = {
  eyebrow: "Ahmedabad, India — open to select work",
  headlineLines: ["Engineer first.", "Curious about", "everything else."],
  sub: "I'm Vraj — a computer science student who treats software like an instrument, not a job title. I ship graph engines, access-control systems, and small tools that quietly save someone ten minutes a day. I like problems with sharp edges, and I like finishing what I start.",
  cta: { label: "See the work", href: "#projects" },
};

export const aboutCopy = {
  eyebrow: "About",
  heading: "Not a specialist yet — and in no hurry to become one.",
  paragraphs: [
    "I'm a B.E. Computer Science & Engineering student at L.J. University, Ahmedabad, currently sitting on a 7.54 CGPA and graduating in 2028. Most of what I know, I learned by building something I needed and refusing to ship it half-broken.",
    "I move across the stack when a problem asks for it — a graph service one week, a permissions model the next — but I'm not chasing a 'full-stack developer' badge. I'd rather stay wide: systems thinking, data, interface, whatever the project actually needs.",
    "Outside the editor: reading about distributed systems for fun, tinkering with anything that has an API, and slowly building a habit of writing things down before I build them.",
  ],
  meta: [
    { label: "Institution", value: "L.J University, Ahmedabad" },
    { label: "Program", value: "B.E. Computer Science & Engineering" },
    { label: "CGPA", value: "7.54 / 10" },
    { label: "Graduating", value: "2028" },
  ],
};

export type Project = {
  id: string;
  index: string;
  name: string;
  tag: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "notegraph-v2",
    index: "01",
    name: "Notegraph v2",
    tag: "Knowledge graph engine",
    description:
      "A note-taking platform that treats your notes as a graph, not a folder tree — a dual-microservice system (Express/MongoDB for the API, Django/NetworkX for the graph math) rendering a live, force-directed knowledge map in D3.js.",
    highlights: [
      "Python graph service using NetworkX to build weighted graphs from tag co-occurrence, with stable D3 force-layout refs that kill canvas re-render jitter",
      "Multi-stage content pipeline: GFM Markdown, KaTeX for LaTeX, Base64 Mermaid diagrams, and DOMPurify MathML sanitisation to close XSS gaps",
      "3-tier RBAC with hierarchical suspension (2h → permanent) and a node-cron worker running 60s background note-expiry cleanup",
    ],
    stack: ["Express", "MongoDB", "Django", "NetworkX", "D3.js"],
    links: [{ label: "Source", href: "https://github.com/stackvs18/notegraph-v2" }],
  },
  {
    id: "django-study-hub",
    index: "02",
    name: "Django Study Hub",
    tag: "Interactive learning platform",
    description:
      "A Django & DRF learning tool built for people who'd rather practice than read docs — 75+ categorised questions, guided project walkthroughs, and a command palette fast enough to feel invisible.",
    highlights: [
      "Dual-mode engine: Quiz Mode with live scoring and accuracy tracking, Study Mode with searchable cards and instant explanations",
      "A global ⌘K fuzzy-search palette for sub-millisecond lookups across notes, CLI commands, and API endpoints",
      "Guided walkthroughs (incl. a full CRUD project) with one-click snippet copying and SimpleJWT auth flows",
    ],
    stack: ["Next.js", "TypeScript", "Django", "DRF", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://django-delta-eight.vercel.app/" },
    ],
  },
  {
    id: "fashion",
    index: "03",
    name: "Fashion",
    tag: "E-commerce storefront — speed-run",
    description:
      "A full fashion storefront — catalog, product pages, cart — designed and shipped in under an hour as a speed-run build. Proof that 'fast' and 'presentable' aren't mutually exclusive.",
    highlights: [
      "Complete storefront flow: browsing, product detail, and cart, built and deployed same-session",
      "Clean, responsive layout with no design system prep — just fast, deliberate decisions",
      "Shipped live on Vercel straight from the build, no separate staging pass",
    ],
    stack: ["React", "Next.js", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://fashion-six-rho.vercel.app/" },
      { label: "Source", href: "https://github.com/stackvs18/fashion" },
    ],
  },
];

export const stack = [
  { label: "Languages", items: ["JavaScript", "Python", "C", "C++"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "HTML/CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "Django", "FastAPI", "REST APIs"] },
  { label: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"] },
  { label: "Databases", items: ["MongoDB", "MySQL"] },
  { label: "Tooling", items: ["Git", "GitHub", "Linux"] },
];

export const credentials = [
  { title: "Oracle Cloud Infrastructure 2025", org: "Oracle University", date: "Oct 2025" },
  { title: "AWS Academy Graduate — Cloud Foundations", org: "AWS Academy · 20 hrs", date: "2025" },
  { title: "AI A-Z: Build 7 AI + LLM & ChatGPT Apps", org: "Udemy · 15.5 hrs", date: "2025" },
  { title: "NASA International Space Apps Challenge", org: "Participant, NASA", date: "Oct 2025" },
];

export const terminalLines = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "vraj patel — computer science engineer" },
  { type: "cmd", text: "cat interests.txt" },
  { type: "out", text: "systems · cybersecurity · cloud · distributed infra · fde" },
  { type: "cmd", text: "./boot --portfolio" },
  { type: "out", text: "compiling interface ....... done" },
  { type: "out", text: "mounting sections ......... done" },
  { type: "out", text: "status: ready" },
];
