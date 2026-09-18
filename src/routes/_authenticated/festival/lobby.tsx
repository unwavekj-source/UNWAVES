import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CalendarClock, Megaphone, PartyPopper, Pin, Quote } from "lucide-react";
import { FESTIVAL, MAIN_CHALLENGE, dayTitle, missionsForDay, type Mission } from "@/data/festival";
import { announcementsQuery, grantBadge } from "@/lib/festival-api";
import { STATUS_META } from "@/lib/unwind-api";
import { formatWhen } from "@/lib/season-api";
import { useParticipant } from "@/hooks/useFestival";
import { useSeason } from "@/hooks/useSeason";
import { useUnwinds } from "@/hooks/useUnwinds";
import { FestivalPage } from "@/components/festival/FestivalShell";
import { EntryCurtain } from "@/components/festival/EntryCurtain";
import { MissionTile } from "@/components/festival/MissionTile";
import { UnwindProofDialog } from "@/components/festival/UnwindProofDialog";
import { XPMeter, ProgressRing } from "@/components/festival/XPMeter";

export const Route = createFileRoute("/_authenticated/festival/lobby")({
  head: () => ({
    meta: [
      { title: "Festival Lobby — CA UNWIND Season 1" },
      { name: "description", content: "Your CA UNWIND home base: today's Daily Unwind, verification status, XP, streak and festival announcements." },
      { property: "og:title", content: "Festival Lobby — CA UNWIND" },
      { property: "og:description", content: "Today's adventure, your verification status and the festival announcements." },
    ],
  }),
  component: Lobby,
});

function Lobby() {
  const qc = useQueryClient();
  const { userId, profile, level, completedKeys, daysTouched, badges } = useParticipant();
  const { season, day, phase, totalDays } = useSeason();
  const { byKey, activityFor, activitiesForDay } = useUnwinds();
  const { data: news } = useQuery(announcementsQuery());

  // Admin-configured activities are the source of truth; code templates are the fallback.
  const configured = activitiesForDay(day);
  const missions: Mission[] = configured.length
    ? configured.map((c) => c.mission)
    : missionsForDay(day);

  const [openMission, setOpenMission] = useState<Mission | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  const statusFor = (key: string) => byKey.get(`${day}:${key}`)?.status ?? "none";
  const verifiedToday = missions.filter((m) => statusFor(m.key) === "approved").length;
  const pendingToday = missions.filter((m) => statusFor(m.key) === "pending").length;
  const quote = FESTIVAL.quotes[(day - 1) % FESTIVAL.quotes.length];
  const todayCloses = configured.map((c) => c.activity.closes_at).filter(Boolean).sort()[0] ?? null;


  // Celebrate newly verified Daily Unwinds once.
  useEffect(() => {
    if (!userId) return;
    const approved = completedKeys.size;
    if (!approved) return;
    const storeKey = `unwind-celebrated:${userId}`;
    const seen = Number(window.localStorage.getItem(storeKey) ?? "0");
    if (approved > seen) {
      window.localStorage.setItem(storeKey, String(approved));
      setCelebrate(true);
      void (async () => {
        if (approved >= 1) await grantBadge(userId, "first-mission");
        if (approved >= 5) await grantBadge(userId, "five-missions");
        if (level.level >= 5) await grantBadge(userId, "level-5");
        await qc.invalidateQueries({ queryKey: ["badges", userId] });
      })();
      const t = setTimeout(() => setCelebrate(false), 4200);
      return () => clearTimeout(t);
    }
    return;
  }, [completedKeys.size, userId, level.level, qc]);

  async function refresh() {
    await qc.invalidateQueries({ queryKey: ["unwind-submissions", userId] });
  }

  const openSub = openMission ? byKey.get(`${day}:${openMission.key}`) ?? null : null;

  return (
    <>
      <EntryCurtain name={profile?.full_name} />

      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[70] grid place-items-center"
          >
            <div className="aurora-bg opacity-70" />
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass gradient-border relative mx-4 max-w-sm rounded-4xl p-8 text-center"
            >
              <PartyPopper className="mx-auto h-10 w-10 text-festival-gold" />
              <h2 className="mt-4 font-display text-2xl font-bold">Congratulations!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your Daily Unwind has been verified. Thank you for making the community more vibrant today.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FestivalPage
        eyebrow={
          phase === "upcoming"
            ? `${season?.name ?? FESTIVAL.season} · starts ${formatWhen(season?.starts_at) ?? "soon"}`
            : phase === "ended"
              ? `${season?.name ?? FESTIVAL.season} · season wrapped`
              : `${season?.name ?? FESTIVAL.season} · Day ${day} of ${totalDays}`
        }
        title={`Good to see you, ${profile?.full_name?.split(" ")[0] ?? "friend"}.`}
        subtitle={season?.theme ? `${season.theme} · ${dayTitle(day)}` : dayTitle(day)}
        icon="Tent"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass gradient-border rounded-4xl p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center gap-6">
              <ProgressRing value={missions.length ? (verifiedToday / missions.length) * 100 : 0} label="Today" />
              <ProgressRing value={(daysTouched.size / totalDays) * 100} label="Season" />

              <div className="min-w-52 flex-1">
                <XPMeter />
                <p className="mt-3 text-xs text-muted-foreground">
                  {verifiedToday}/{missions.length} verified today
                  {pendingToday > 0 ? ` · ${pendingToday} with the team` : ""} · {badges.length} badges · pass{" "}
                  {profile?.participant_id}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/festival/map" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold hover:border-festival-pink/50">
                Adventure Map <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/festival/arena" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold hover:border-festival-pink/50">
                Challenge Arena <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/festival/passport" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold hover:border-festival-pink/50">
                My Passport <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-4xl p-6">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <Quote className="h-3.5 w-3.5 text-festival-gold" /> Today's note
            </p>
            <p className="mt-4 font-display text-lg leading-snug">{quote}</p>
            <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Main event</p>
              <p className="mt-2 text-sm font-semibold">{MAIN_CHALLENGE.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{MAIN_CHALLENGE.tagline}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">Today's Daily Unwinds</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Do the activity, share it on your story with the hashtag, then submit your proof. The CA UNWIND Team verifies every one.
          </p>
          {todayCloses && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3.5 py-1.5 text-[11px] font-semibold text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5 text-festival-gold" /> Today's window closes {formatWhen(todayCloses)}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            {(["approved", "pending", "resubmit", "none"] as const).map((s) => (
              <span key={s} className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <span className={`h-2 w-2 rounded-full ${STATUS_META[s].dot}`} /> {STATUS_META[s].label}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {missions.map((m, i) => (
              <MissionTile
                key={m.key}
                mission={m}
                index={i}
                status={statusFor(m.key)}
                activity={activityFor(day, m.key)}
                reviewNote={byKey.get(`${day}:${m.key}`)?.review_note ?? null}
                onOpen={() => setOpenMission(m)}
              />
            ))}
          </div>
        </div>

        {news && news.length > 0 && (
          <div className="mt-12">
            <h2 className="inline-flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <Megaphone className="h-5 w-5 text-festival-pink" /> Festival announcements
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {news.map((n) => (
                <div key={n.id} className="glass rounded-3xl p-5">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {n.pinned && <Pin className="h-3 w-3 text-festival-gold" />}
                    {n.kind}
                  </p>
                  <h3 className="mt-2 text-sm font-bold">{n.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </FestivalPage>

      {openMission && (
        <UnwindProofDialog
          open={Boolean(openMission)}
          onClose={() => setOpenMission(null)}
          mission={openMission}
          day={day}
          activity={activityFor(day, openMission.key)}
          existing={openSub}
          userId={userId}
          onSubmitted={refresh}
        />
      )}
    </>
  );
}
