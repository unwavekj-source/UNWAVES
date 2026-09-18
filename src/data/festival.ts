/**
 * UNWAVES — Experience Content Layer
 *
 * IMPORTANT:
 * This file is currently a compatibility layer for parts of the existing
 * authenticated application.
 *
 * The final architecture should move dynamic content to Supabase/CMS.
 *
 * Do NOT add:
 * - fake participants
 * - fake submissions
 * - fake votes
 * - fake testimonials
 * - fake dates
 * - fictional results
 *
 * UNWAVES = permanent platform
 * UNWAVES UNWIND = first experience
 * Season One = first chapter
 */

/* ============================================================
   TYPES
   ============================================================ */

export type MissionKind =
  | "Daily Wave"
  | "Creative Wave"
  | "Learning Wave"
  | "Reflection Wave"
  | "Fun Wave";

export type MissionAccent =
  | "warm"
  | "primary"
  | "cool"
  | "pink"
  | "gold";

export type Mission = {
  key: string;
  kind: MissionKind;
  icon: string;
  title: string;
  brief: string;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  outcome: string;
  xp: number;
  accent: MissionAccent;
};

/* ============================================================
   UNWAVES EXPERIENCE
   ============================================================ */

export const FESTIVAL = {
  /*
   * Kept as FESTIVAL temporarily because existing components import
   * this constant.
   *
   * Future components should use:
   * EXPERIENCE / SEASON / CMS data
   * instead of this compatibility object.
   */

  season: "Season One",

  experience: "UNWAVES UNWIND",

  theme: "Pause the pressure. Unwind. Make waves.",

  totalDays: 30,

  /*
   * Intentionally null.
   *
   * The actual Season One dates must come from Supabase once confirmed.
   * Never invent dates just to make a countdown look active.
   */
  startsAt: null,

  nextMilestone: null,

  quotes: [
    "Pause the pressure.",
    "Explore beyond the expected.",
    "Create something that feels like you.",
    "Meet people. Share ideas. Make something.",
    "You don't have to have it all figured out.",
    "One wave. Many stories.",
  ],
} as const;

/* ============================================================
   EXPERIENCE
   ============================================================ */

export const EXPERIENCE = {
  key: "unwind",
  name: "UNWAVES UNWIND",
  platform: "UNWAVES",
  chapter: "Season One",

  tagline: "Pause the pressure. Unwind. Make waves.",

  description:
    "A space between pressure and possibility — designed for people to pause, explore, create, connect and discover another side of themselves.",

  status: "forming" as const,

  totalDailyWaves: 30,

  /*
   * Dates remain database-driven.
   */
  startsAt: null,
  endsAt: null,
} as const;

/* ============================================================
   DESTINATIONS
   ============================================================ */

/**
 * Compatibility navigation for the existing authenticated shell.
 *
 * These routes will later be replaced by the new MY WAVE structure.
 *
 * Do not treat these as the final UNWAVES information architecture.
 */

export const DESTINATIONS = [
  {
    to: "/festival/lobby",
    label: "Today",
    icon: "Sparkles",
    blurb: "Your wave today",
  },
  {
    to: "/festival/map",
    label: "Daily Waves",
    icon: "Waves",
    blurb: "Explore the journey",
  },
  {
    to: "/festival/arena",
    label: "Missions",
    icon: "Target",
    blurb: "Make something together",
  },
  {
    to: "/festival/gallery",
    label: "Showcase",
    icon: "Palette",
    blurb: "See what people create",
  },
  {
    to: "/festival/stage",
    label: "Voting",
    icon: "Vote",
    blurb: "Shape the spotlight",
  },
  {
    to: "/festival/champions",
    label: "Recognition",
    icon: "Trophy",
    blurb: "Celebrate the wave makers",
  },
  {
    to: "/festival/vault",
    label: "Achievements",
    icon: "Sparkles",
    blurb: "Your progress",
  },
  {
    to: "/festival/plaza",
    label: "Community",
    icon: "Users",
    blurb: "Meet the community",
  },
  {
    to: "/festival/passport",
    label: "Profile",
    icon: "User",
    blurb: "Your UNWAVES profile",
  },
] as const;

/* ============================================================
   DAILY WAVE TEMPLATES
   ============================================================ */

const DAILY_WAVE_TEMPLATES: Omit<Mission, "key">[] = [
  {
    kind: "Daily Wave",
    icon: "Waves",
    title: "Your Current Wave",
    brief:
      "Pause for a moment and notice where you are right now. No fixing. No judging. Just observe.",
    minutes: 10,
    difficulty: "Easy",
    outcome: "A moment of awareness outside the usual routine.",
    xp: 0,
    accent: "primary",
  },

  {
    kind: "Reflection Wave",
    icon: "Sparkles",
    title: "Clear One Thing",
    brief:
      "Remove, finish, organise or let go of one small thing that has been sitting in the background.",
    minutes: 10,
    difficulty: "Easy",
    outcome: "A little more space in your day.",
    xp: 0,
    accent: "warm",
  },

  {
    kind: "Creative Wave",
    icon: "Palette",
    title: "Make Something",
    brief:
      "Create something small without worrying whether it is good enough.",
    minutes: 15,
    difficulty: "Easy",
    outcome: "A reminder that creativity does not need permission.",
    xp: 0,
    accent: "pink",
  },

  {
    kind: "Learning Wave",
    icon: "Lightbulb",
    title: "One Thing I Learned",
    brief:
      "Share one thing you discovered recently that had nothing to do with marks.",
    minutes: 10,
    difficulty: "Easy",
    outcome: "Curiosity beyond the syllabus.",
    xp: 0,
    accent: "gold",
  },

  {
    kind: "Fun Wave",
    icon: "Sparkles",
    title: "Do Something Different",
    brief:
      "Change one tiny part of your routine today. Take a different route, try something new or simply break the pattern.",
    minutes: 15,
    difficulty: "Easy",
    outcome: "A small interruption to autopilot.",
    xp: 0,
    accent: "cool",
  },
];

/* ============================================================
   DAILY WAVE TITLES
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
  "Festival Look",
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

/* ============================================================
   DAILY WAVE PROMPTS
   ============================================================ */

const DAILY_WAVE_PROMPTS = [
  "Notice one thing around you that you usually ignore.",
  "Clear one small thing that has been occupying your mind.",
  "Choose a song that describes your current mood.",
  "Capture one colour that represents today.",
  "Think of someone who made your journey a little easier.",
  "Move somewhere you normally would not.",
  "Photograph something beautiful without posting it.",
  "Make something with whatever is around you.",
  "Write down one thing you learned outside your studies.",
  "Find one small reason to feel hopeful.",
  "Wear something that feels completely like you.",
  "Invite someone into your moment today.",
  "Send a genuine thank-you to someone.",
  "Let go of one thing you no longer need.",
  "Choose something good over something easy.",
  "Start something again without worrying about the past attempt.",
  "Spend one hour without unnecessary screens.",
  "Return to something you genuinely loved.",
  "Tell a story in 30 seconds.",
  "Take a different route and notice what changes.",
  "Write one thought you normally keep in your head.",
  "Do something you have never tried before.",
  "Think about who you were before pressure became normal.",
  "Make something unmistakably yours.",
  "Introduce two people or ideas that should meet.",
  "Notice one small thing that made you happy.",
  "Write down one idea that sounds slightly crazy.",
  "Write a message to your future self.",
  "Choose your favourite moment from this chapter.",
  "Create one thing that represents your wave.",
];

/* ============================================================
   DAILY WAVE GENERATOR
   ============================================================ */

/**
 * Temporary compatibility function.
 *
 * The final system should load Daily Waves from Supabase.
 */

export function missionsForDay(day: number): Mission[] {
  const safeDay = Math.max(1, Math.floor(day));

  const prompt =
    DAILY_WAVE_PROMPTS[(safeDay - 1) % DAILY_WAVE_PROMPTS.length] ??
    "Make your wave.";

  return DAILY_WAVE_TEMPLATES.map((template, index) => ({
    ...template,

    key: `daily-wave-${safeDay}-${index + 1}`,

    brief:
      template.kind === "Creative Wave"
        ? prompt
        : template.brief,
  }));
}

/* ============================================================
   DAY TITLE
   ============================================================ */

export function dayTitle(day: number): string {
  const safeDay = Math.max(1, Math.floor(day));

  return (
    DAILY_WAVE_TITLES[(safeDay - 1) % DAILY_WAVE_TITLES.length] ??
    "Make Your Wave"
  );
}

/* ============================================================
   DAILY WAVE MILESTONES
   ============================================================ */

export const DAILY_WAVE_MILESTONES = [
  {
    key: "wave-streak",
    title: "Wave Streak",
    icon: "Flame",
    note: "Keep showing up and build momentum.",
    rule: "Maintain a Daily Wave streak.",
  },
  {
    key: "wave-explorer",
    title: "Wave Explorer",
    icon: "Compass",
    note: "You explored 10 Daily Waves.",
    rule: "10 completed Daily Waves.",
  },
  {
    key: "wave-creator",
    title: "Wave Creator",
    icon: "Sparkles",
    note: "You explored 15 Daily Waves.",
    rule: "15 completed Daily Waves.",
  },
  {
    key: "wave-maker",
    title: "Wave Maker",
    icon: "Waves",
    note: "You completed the full Daily Wave journey.",
    rule: "30 completed Daily Waves.",
  },
] as const;

/* ============================================================
   MISSIONS
   ============================================================ */

export const MISSION_DETAILS = [
  {
    key: "the-reframe",
    title: "THE REFRAME",
    tagline: "See the ordinary differently.",
    description:
      "Take an ordinary real-world problem and reframe it into a new experience, solution or possibility.",
    status: "Coming soon",
    teamSize: "4–6 people",
    deliverables: [
      "The problem",
      "Why it matters",
      "Your idea",
      "Visual / mockup / prototype",
      "Short presentation",
    ],
  },

  {
    key: "the-build",
    title: "THE BUILD",
    tagline: "Don't just imagine it. Build it.",
    description:
      "Create a prototype, experience, campaign, game, website or other real thing that brings people together.",
    status: "Coming soon",
    teamSize: "4–6 people",
    deliverables: [
      "Concept",
      "Prototype",
      "How it works",
      "Why people would use it",
      "Short presentation",
    ],
  },

  {
    key: "the-impossible-brief",
    title: "THE IMPOSSIBLE BRIEF",
    tagline: "Constraints create unexpected ideas.",
    description:
      "A fast-moving challenge where the brief, resources and time are intentionally constrained.",
    status: "Coming soon",
    teamSize: "4–6 people",
    deliverables: [
      "Interpret the brief",
      "Create under constraints",
      "Present the result",
      "Explain the decisions",
    ],
  },
] as const;

/* ============================================================
   MAIN CHALLENGE — COMPATIBILITY
   ============================================================ */

/**
 * Existing arena components still expect MAIN_CHALLENGE.
 *
 * The actual challenge system will later become database-driven.
 *
 * This is intentionally marked as coming soon rather than pretending
 * a challenge is currently open.
 */

export const MAIN_CHALLENGE = {
  key: "the-reframe",

  title: "THE REFRAME",

  tagline: "See the ordinary differently.",

  story:
    "Take something ordinary, question the way it works and imagine how it could become something better, stranger or more meaningful.",

  objective:
    "Reframe an everyday problem into a new experience, solution or possibility.",

  rules: [
    "Build your idea with your team.",
    "Show the problem clearly.",
    "Explain why your idea matters.",
    "Create a visual, mockup or prototype.",
    "Present the idea clearly.",
  ],

  category: "Creative Problem Solving",

  /*
   * No real deadline has been confirmed.
   * This value is temporary compatibility data and will be removed
   * when the arena becomes fully database-driven.
   */
  deadline: "TBA",

  reward: 0,

  status: "Coming soon",
} as const;

/* ============================================================
   MISSION TEAM ROLES
   ============================================================ */

export const MISSION_TEAM_ROLES = [
  {
    key: "thinker",
    title: "Thinker",
    icon: "Brain",
    description:
      "Shapes the idea, asks better questions and solves the problem.",
  },
  {
    key: "maker",
    title: "Maker",
    icon: "Hammer",
    description:
      "Turns the idea into something visible or real.",
  },
  {
    key: "storyteller",
    title: "Storyteller",
    icon: "BookOpen",
    description:
      "Makes the idea understandable, memorable and shareable.",
  },
  {
    key: "connector",
    title: "Connector",
    icon: "Users",
    description:
      "Keeps the people, conversations and team connected.",
  },
  {
    key: "finisher",
    title: "Finisher",
    icon: "CheckCircle2",
    description:
      "Brings everything together and gets the work across the line.",
  },
] as const;

/* ============================================================
   SCORING
   ============================================================ */

export const DEFAULT_SCORING = {
  juryWeight: 70,
  audienceWeight: 30,

  criteria: [
    {
      key: "creativity",
      label: "Creativity",
      weight: 20,
    },
    {
      key: "originality",
      label: "Originality",
      weight: 15,
    },
    {
      key: "problem-understanding",
      label: "Problem Understanding",
      weight: 15,
    },
    {
      key: "execution",
      label: "Execution",
      weight: 20,
    },
    {
      key: "teamwork",
      label: "Teamwork",
      weight: 10,
    },
    {
      key: "presentation",
      label: "Presentation",
      weight: 10,
    },
    {
      key: "impact",
      label: "Impact",
      weight: 10,
    },
  ],
} as const;

/* ============================================================
   RECOGNITION
   ============================================================ */

export const CHAMPION_CATEGORIES = [
  {
    key: "winner",
    title: "Winner",
    icon: "Trophy",
    note: "Highest overall result.",
  },
  {
    key: "runner-up",
    title: "Runner-up",
    icon: "Medal",
    note: "Outstanding overall performance.",
  },
  {
    key: "peoples-choice",
    title: "People's Choice",
    icon: "Heart",
    note: "Selected by the community.",
  },
  {
    key: "most-creative",
    title: "Most Creative",
    icon: "Palette",
    note: "For the boldest creative thinking.",
  },
  {
    key: "best-execution",
    title: "Best Execution",
    icon: "CheckCircle2",
    note: "For turning an idea into reality.",
  },
  {
    key: "best-presentation",
    title: "Best Presentation",
    icon: "Presentation",
    note: "For communicating an idea exceptionally well.",
  },
  {
    key: "most-unexpected",
    title: "Most Unexpected Idea",
    icon: "Sparkles",
    note: "For the idea nobody saw coming.",
  },
] as const;

/* ============================================================
   BADGES
   ============================================================ */

export const BADGES = [
  {
    key: "first-wave",
    title: "First Wave",
    icon: "Waves",
    note: "You entered UNWAVES.",
    rule: "Enter an UNWAVES experience.",
  },
  {
    key: "first-daily-wave",
    title: "First Spark",
    icon: "Sparkles",
    note: "You completed your first Daily Wave.",
    rule: "1 Daily Wave.",
  },
  {
    key: "wave-explorer",
    title: "Wave Explorer",
    icon: "Compass",
    note: "You explored 10 Daily Waves.",
    rule: "10 Daily Waves.",
  },
  {
    key: "wave-creator",
    title: "Wave Creator",
    icon: "Palette",
    note: "You created through 15 Daily Waves.",
    rule: "15 Daily Waves.",
  },
  {
    key: "storyteller",
    title: "Storyteller",
    icon: "BookOpen",
    note: "You shared something with the community.",
    rule: "Approved story or submission.",
  },
  {
    key: "wave-maker",
    title: "Wave Maker",
    icon: "Waves",
    note: "You completed the Daily Wave journey.",
    rule: "30 Daily Waves.",
  },
] as const;

/* ============================================================
   SHOWCASE
   ============================================================ */

/**
 * Deliberately empty.
 *
 * Real showcase entries must come from approved submissions.
 */

export const GALLERY: Array<{
  title: string;
  author: string;
  kind: string;
  featured: boolean;
  span: "tall" | "short";
}> = [];

/* ============================================================
   GALLERY FILTERS
   ============================================================ */

export const GALLERY_FILTERS = [
  "All",
  "Video",
  "Photo",
  "Art",
  "Writing",
  "Design",
  "Audio",
] as const;

/* ============================================================
   HALL OF FAME
   ============================================================ */

/**
 * No fictional winners.
 *
 * Categories exist before winners do.
 */

export const HALL_OF_FAME = CHAMPION_CATEGORIES.map((category) => ({
  name: "Coming soon",
  title: category.title,
  badge: category.icon,
  note: category.note,
}));

/* ============================================================
   COMMUNITY PLAZA — COMPATIBILITY
   ============================================================ */

/**
 * The old application expects PLAZA.
 *
 * Fake conversations, fake polls and fake participant names have
 * deliberately been removed.
 */

export const PLAZA = {
  discussion: [],

  polls: [],

  upcoming: [],

  founder:
    "UNWAVES is a space between pressure and possibility — a place to pause, explore, create, connect and make something worth remembering.",
} as const;
