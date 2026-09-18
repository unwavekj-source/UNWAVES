/**
 * UNWAVES — Core public content
 *
 * Brand-level and fallback content only.
 *
 * Dynamic content such as seasons, Daily Waves, Missions,
 * submissions, showcase entries, voting, recognition and
 * announcements should eventually come from Supabase/CMS.
 *
 * Do not place real participant data, fake statistics,
 * confirmed event dates or fabricated results here.
 */

/* ============================================================
   BRAND
   ============================================================ */

export const BRAND = {
  name: "UNWAVES",
  meaning: "People creating movement together.",
  descriptor: "A movement of people, ideas and experiences.",
  line: "ONE WAVE. MANY STORIES.",
  philosophy: ["REIMAGINE", "REFRESH", "RISE"],
  experienceLine: "PAUSE THE PRESSURE. CREATE WHAT COMES NEXT.",
} as const;

/* ============================================================
   SEASON
   ============================================================ */

export const SEASON = {
  name: "The Next Wave",
  theme: "The next wave is being designed.",
  tagline:
    "A new chapter of UNWAVES — a space to explore, create, connect and make something worth remembering.",
  startsAt: null,
  endsAt: null,
  days: 30,
  status: "upcoming" as const,
} as const;

/* ============================================================
   NAVIGATION
   ============================================================ */

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/Waves", label: "Waves" },
  { to: "/experiences", label: "Experiences" },
  { to: "/season-one", label: "Season One" },
  { to: "/community", label: "Community" },
] as const;

/* ============================================================
   PRIMARY CTA LINKS
   ============================================================ */

export const PRIMARY_LINKS = {
  explore: "/experiences",
  join: "/join",
  seasonOne: "/season-one",
  community: "/community",
  dailyWaves: "/daily-waves",
  missions: "/missions",
  showcase: "/showcase",
} as const;

/* ============================================================
   WHY UNWAVES
   ============================================================ */

export const WHY = [
  {
    icon: "Sparkles",
    title: "Reimagine",
    text:
      "Look at the ordinary differently. UNWAVES creates space for ideas, experiments and possibilities beyond the expected.",
  },
  {
    icon: "RefreshCw",
    title: "Refresh",
    text:
      "Pause the pressure. Step outside the usual routine. Discover something that feels different.",
  },
  {
    icon: "TrendingUp",
    title: "Rise",
    text:
      "Take what you discovered and carry it forward — with new people, new ideas and a new sense of possibility.",
  },
] as const;

/* ============================================================
   UNWAVES ECOSYSTEM
   ============================================================ */

export const EXPERIENCES = [
  {
    key: "daily-waves",
    name: "DAILY WAVES",
    shortName: "DAILY WAVES",
    icon: "Waves",
    description:
      "Small optional experiences designed to help people pause, create, explore and connect.",
    status: "Available when the next wave opens",
    to: "/daily-waves",
  },
  {
    key: "missions",
    name: "UNWAVES MISSIONS",
    shortName: "MISSIONS",
    icon: "Target",
    description:
      "Collaborative challenges where people turn ideas into things worth sharing.",
    status: "Coming soon",
    to: "/missions",
  },
  {
    key: "stories",
    name: "UNWAVES STORIES",
    shortName: "STORIES",
    icon: "BookOpen",
    description:
      "Stories, reflections and moments from people moving through their own wave.",
    status: "Coming soon",
    to: "/stories",
  },
  {
    key: "creators",
    name: "UNWAVES CREATORS",
    shortName: "CREATORS",
    icon: "PenTool",
    description:
      "A space for people who make, experiment, build and express.",
    status: "Coming soon",
    to: "/creators",
  },
  {
    key: "live",
    name: "UNWAVES LIVE",
    shortName: "LIVE",
    icon: "Radio",
    description:
      "Live conversations, gatherings and experiences that bring the community together.",
    status: "Coming soon",
    to: "/live",
  },
] as const;

/* ============================================================
   JOURNEY
   ============================================================ */

export const JOURNEY = [
  {
    step: "Discover",
    text:
      "Find a space where you can explore something beyond the expected.",
  },
  {
    step: "Enter",
    text:
      "Step into an UNWAVES experience when the next wave opens.",
  },
  {
    step: "Explore",
    text:
      "Try something different. Follow curiosity instead of pressure.",
  },
  {
    step: "Create",
    text:
      "Turn an idea, thought or moment into something of your own.",
  },
  {
    step: "Connect",
    text:
      "Meet people who are moving through their own version of the wave.",
  },
  {
    step: "Share",
    text:
      "Give your work, ideas and stories a place to be seen.",
  },
  {
    step: "Contribute",
    text:
      "Help shape what UNWAVES becomes next.",
  },
  {
    step: "Remember",
    text:
      "Leave with something that becomes part of your story.",
  },
  {
    step: "Make waves",
    text:
      "Carry the energy forward and create movement with others.",
  },
] as const;

/* ============================================================
   DAILY WAVES
   ============================================================ */

export const DAILY_WAVE_TITLES = [
  "Your Current Wave",
  "Clear One Thing",
  "Your Current Soundtrack",
  "Colour of Today",
  "Someone Who Matters",
  "Move With the Wave",
  "Find Beauty",
  "Make Something",
  "One Thing I Learned",
  "Light & Hope",
  "Your Expression",
  "Bring Someone In",
  "Thank Someone",
  "Let It Go",
  "Good Over Bad",
  "Begin Again",
  "One Hour Offline",
  "Something You Loved",
  "30-Second Story",
  "Take A Different Route",
  "Write It Down",
  "Do Something Different",
  "Old You",
  "Make It Yours",
  "Introduce Someone",
  "Your Small Joy",
  "One Crazy Idea",
  "Future Me",
  "Your Favourite Moment",
  "Make Your Wave",
] as const;

export const DAILY_WAVE_MILESTONES = [
  {
    key: "wave-streak",
    title: "Wave Streak",
    icon: "Flame",
    description: "Keep showing up and build your first streak.",
  },
  {
    key: "wave-explorer",
    title: "Wave Explorer",
    icon: "Compass",
    description: "Explore 10 Daily Waves.",
  },
  {
    key: "wave-creator",
    title: "Wave Creator",
    icon: "Sparkles",
    description: "Complete 15 Daily Waves.",
  },
  {
    key: "wave-maker",
    title: "Wave Maker",
    icon: "Waves",
    description: "Complete all 30 Daily Waves.",
  },
] as const;

/* ============================================================
   COMPATIBILITY: CHALLENGES
   ============================================================ */

export const CHALLENGES = [
  {
    title: "THE REFRAME",
    theme: "Ideas & problem solving",
    difficulty: "Open",
    time: "Defined when launched",
    format: "Concept + presentation",
    image: undefined,
    accent: "primary" as const,
    status: "Coming soon",
  },
  {
    title: "THE BUILD",
    theme: "Making & experimentation",
    difficulty: "Open",
    time: "Defined when launched",
    format: "Prototype / experience",
    image: undefined,
    accent: "warm" as const,
    status: "Coming soon",
  },
  {
    title: "THE IMPOSSIBLE BRIEF",
    theme: "Creative execution",
    difficulty: "Open",
    time: "Defined when launched",
    format: "Constraint-based challenge",
    image: undefined,
    accent: "pink" as const,
    status: "Coming soon",
  },
] as const;

/* ============================================================
   COMPATIBILITY: MISSIONS
   ============================================================ */

export const MISSIONS = [
  {
    title: "Your Current Wave",
    icon: "Waves",
    text:
      "Notice where you are right now. No fixing. No judging. Just observe.",
    xp: 0,
    accent: "primary" as const,
  },
  {
    title: "Clear One Thing",
    icon: "Sparkles",
    text:
      "Remove, finish or organise one small thing that has been sitting in the background.",
    xp: 0,
    accent: "warm" as const,
  },
  {
    title: "Make Something",
    icon: "Palette",
    text:
      "Create something small without worrying whether it is good enough.",
    xp: 0,
    accent: "pink" as const,
  },
  {
    title: "Something You Learned",
    icon: "Lightbulb",
    text:
      "Share one thing you discovered recently that had nothing to do with marks.",
    xp: 0,
    accent: "gold" as const,
  },
  {
    title: "Make Your Wave",
    icon: "TrendingUp",
    text:
      "Create one small thing that represents the version of you you want to carry forward.",
    xp: 0,
    accent: "primary" as const,
  },
] as const;

/* ============================================================
   MISSION INFORMATION
   ============================================================ */

export const MISSION_DETAILS = [
  {
    key: "the-reframe",
    title: "THE REFRAME",
    tagline: "See the ordinary differently.",
    description:
      "Take an ordinary real-world problem and reframe it into a new experience, solution or possibility.",
    deliverables: [
      "The problem",
      "Why it matters",
      "Your idea",
      "Visual / mockup / prototype",
      "Short presentation",
    ],
    status: "Coming soon",
  },
  {
    key: "the-build",
    title: "THE BUILD",
    tagline: "Don't just imagine it. Build it.",
    description:
      "Create a prototype, experience, campaign, game, website or other real thing that brings people together.",
    deliverables: [
      "Concept",
      "Prototype",
      "How it works",
      "Why people would use it",
      "Short presentation",
    ],
    status: "Coming soon",
  },
  {
    key: "the-impossible-brief",
    title: "THE IMPOSSIBLE BRIEF",
    tagline: "Constraints create unexpected ideas.",
    description:
      "A fast-moving challenge where the brief, resources and time are intentionally constrained.",
    deliverables: [
      "Interpret the brief",
      "Create under constraints",
      "Present the result",
      "Explain the decisions",
    ],
    status: "Coming soon",
  },
] as const;

/* ============================================================
   TEAM ROLES
   ============================================================ */

export const MISSION_TEAM_ROLES = [
  {
    key: "thinker",
    title: "Thinker",
    icon: "Brain",
    description: "Shapes the idea and solves the problem.",
  },
  {
    key: "maker",
    title: "Maker",
    icon: "Hammer",
    description: "Turns the idea into something real.",
  },
  {
    key: "storyteller",
    title: "Storyteller",
    icon: "BookOpen",
    description: "Makes the idea understandable and memorable.",
  },
  {
    key: "connector",
    title: "Connector",
    icon: "Users",
    description: "Keeps the team and people connected.",
  },
  {
    key: "finisher",
    title: "Finisher",
    icon: "CheckCircle2",
    description: "Brings everything together before submission.",
  },
] as const;

/* ============================================================
   SCORING
   ============================================================ */

export const DEFAULT_SCORING = {
  juryWeight: 70,
  audienceWeight: 30,
  criteria: [
    { key: "creativity", label: "Creativity", weight: 20 },
    { key: "originality", label: "Originality", weight: 15 },
    {
      key: "problem-understanding",
      label: "Problem Understanding",
      weight: 15,
    },
    { key: "execution", label: "Execution", weight: 20 },
    { key: "teamwork", label: "Teamwork", weight: 10 },
    { key: "presentation", label: "Presentation", weight: 10 },
    { key: "impact", label: "Impact", weight: 10 },
  ],
} as const;

/* ============================================================
   RECOGNITION
   ============================================================ */

export const RECOGNITION_CATEGORIES = [
  {
    key: "winner",
    title: "Winner",
    icon: "Trophy",
    description: "Highest overall result.",
  },
  {
    key: "runner-up",
    title: "Runner-up",
    icon: "Medal",
    description: "Outstanding overall performance.",
  },
  {
    key: "peoples-choice",
    title: "People's Choice",
    icon: "Heart",
    description: "Selected by the community.",
  },
  {
    key: "most-creative",
    title: "Most Creative",
    icon: "Palette",
    description: "For the boldest creative thinking.",
  },
  {
    key: "best-execution",
    title: "Best Execution",
    icon: "CheckCircle2",
    description: "For turning an idea into reality.",
  },
  {
    key: "best-presentation",
    title: "Best Presentation",
    icon: "Presentation",
    description: "For communicating an idea exceptionally well.",
  },
  {
    key: "most-unexpected",
    title: "Most Unexpected Idea",
    icon: "Sparkles",
    description: "For the idea nobody saw coming.",
  },
] as const;

/* ============================================================
   PARTICIPANT MILESTONES
   ============================================================ */

export const PARTICIPANT_MILESTONES = [
  {
    key: "wave-streak",
    title: "Wave Streak",
    icon: "Flame",
    description: "Build momentum by showing up.",
  },
  {
    key: "wave-explorer",
    title: "Wave Explorer",
    icon: "Compass",
    description: "Explore 10 Daily Waves.",
  },
  {
    key: "wave-creator",
    title: "Wave Creator",
    icon: "Sparkles",
    description: "Complete 15 Daily Waves.",
  },
  {
    key: "wave-maker",
    title: "Wave Maker",
    icon: "Waves",
    description: "Complete all 30 Daily Waves.",
  },
] as const;

/* ============================================================
   GALLERY / SHOWCASE
   ============================================================ */

export const GALLERY: Array<{
  title: string;
  author: string;
  kind: string;
  featured: boolean;
  span: "tall" | "short";
}> = [];

/* ============================================================
   HALL OF FAME
   ============================================================ */

export const HALL_OF_FAME = RECOGNITION_CATEGORIES.map((category) => ({
  name: "Coming soon",
  title: category.title,
  badge: category.icon,
  note: category.description,
}));

/* ============================================================
   TESTIMONIALS
   ============================================================ */

export const TESTIMONIALS: Array<{
  quote: string;
  name: string;
  meta: string;
}> = [];

/* ============================================================
   COMMUNITY
   ============================================================ */

export const COMMUNITY_PILLARS = [
  {
    key: "people",
    title: "People",
    icon: "Users",
    text:
      "Meet people who are exploring, creating and moving in their own direction.",
  },
  {
    key: "ideas",
    title: "Ideas",
    icon: "Lightbulb",
    text:
      "Give ideas room to become conversations, experiments and real things.",
  },
  {
    key: "experiences",
    title: "Experiences",
    icon: "Sparkles",
    text:
      "Participate in experiences designed to make the space between chapters meaningful.",
  },
  {
    key: "stories",
    title: "Stories",
    icon: "BookOpen",
    text:
      "Every person brings a different story. UNWAVES gives those stories a place to meet.",
  },
] as const;

/* ============================================================
   FAQS
   ============================================================ */

export const FAQS = [
  {
    q: "What is UNWAVES?",
    a:
      "UNWAVES is a community and experience platform for people who want to explore beyond the expected — through ideas, experiences, creativity and connection.",
  },
  {
    q: "What are UNWAVES experiences?",
    a:
      "Experiences are the different ways people can participate in UNWAVES. They may include Daily Waves, Missions, live gatherings, creative projects, stories and community activities.",
  },
  {
    q: "Is UNWAVES only for CA students?",
    a:
      "UNWAVES itself is not limited to one professional or academic identity. Individual experiences may have a specific audience. UNWAVES is designed as a broader movement.",
  },
  {
    q: "Is UNWAVES free?",
    a:
      "Participation depends on the individual experience. UNWAVES is designed around accessible, community-first experiences rather than requiring a paid membership.",
  },
  {
    q: "What are Daily Waves?",
    a:
      "Daily Waves are small optional experiences designed to take only a little time while helping people pause, create, explore or connect.",
  },
  {
    q: "What are Missions?",
    a:
      "Missions are larger collaborative challenges where people work together to turn ideas into something real and shareable.",
  },
  {
    q: "Do I need to be creative to participate?",
    a:
      "No. UNWAVES is not built around being the most talented person in the room. Curiosity, participation and willingness to try matter more.",
  },
  {
    q: "Where does UNWAVES happen?",
    a:
      "UNWAVES is a digital-first platform. Individual experiences may use different online formats and community spaces.",
  },
  {
    q: "When is the next UNWAVES season?",
    a:
      "The next season will be announced once the experience schedule is officially configured. No date is shown until it is confirmed.",
  },
] as const;

/* ============================================================
   FOOTER
   ============================================================ */

export const FOOTER_LINKS = {
  explore: [
    { to: "/experiences", label: "Experiences" },
    { to: "/season-one", label: "Season One" },
    { to: "/daily-waves", label: "Daily Waves" },
    { to: "/missions", label: "Missions" },
  ],
  community: [
    { to: "/community", label: "Community" },
    { to: "/creators", label: "Creators" },
    { to: "/stories", label: "Stories" },
    { to: "/showcase", label: "Showcase" },
  ],
  discover: [
    { to: "/Waves", label: "Waves" },
    { to: "/live", label: "Live" },
    { to: "/hall-of-fame", label: "Hall of Fame" },
    { to: "/faqs", label: "FAQs" },
  ],
} as const;
