import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Quote, Sparkles, Users } from "lucide-react";
import { PLAZA } from "@/data/festival";
import { passportsQuery } from "@/lib/festival-api";
import { FestivalPage } from "@/components/festival/FestivalShell";

type Discussion = { name: string; level: string; text: string };
type Upcoming = { when: string; what: string };
type Poll = { question: string; options: readonly string[] };

const discussion = PLAZA.discussion as readonly Discussion[];
const upcoming = PLAZA.upcoming as readonly Upcoming[];
const polls = PLAZA.polls as readonly Poll[];

export const Route = createFileRoute("/_authenticated/festival/plaza")({
  head: () => ({
    meta: [
      { title: "Community Plaza — CA UNWIND Season 1" },
      { name: "description", content: "Meet other CA UNWIND participants, read the founder's note and see what's coming up this season." },
      { property: "og:title", content: "Community Plaza — CA UNWIND" },
      { property: "og:description", content: "The festival meeting ground for CA students." },
    ],
  }),
  component: Plaza,
});

function Plaza() {
  const { data: people } = useQuery(passportsQuery());

  return (
    <FestivalPage eyebrow="Community Plaza" title="Where everyone hangs out" subtitle="Conversations, polls and the people walking this season with you." icon="Sparkles">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-4xl p-6 lg:col-span-2">
          <h2 className="inline-flex items-center gap-2 text-sm font-bold">
            <MessageCircle className="h-4 w-4 text-festival-pink" /> Plaza chatter
          </h2>
          <div className="mt-4 space-y-3">
            {discussion.map((d) => (
              <div key={d.name} className="rounded-2xl bg-secondary/50 p-4">
                <p className="text-xs font-semibold">
                  {d.name} <span className="text-muted-foreground">· {d.level}</span>
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
            <Sparkles className="h-4 w-4 text-festival-gold" /> Coming up
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {upcoming.map((u) => (
              <div key={u.what} className="rounded-2xl bg-secondary/50 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{u.when}</p>
                <p className="mt-1.5 text-sm font-semibold">{u.what}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass gradient-border rounded-4xl p-6">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <Quote className="h-3.5 w-3.5 text-festival-gold" /> Founder's note
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{PLAZA.founder}</p>
          </div>

          <div className="glass rounded-4xl p-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold">
              <Users className="h-4 w-4 text-festival-blue" /> Season polls
            </p>
            <div className="mt-4 space-y-4">
              {polls.map((p) => (
                <div key={p.question}>
                  <p className="text-xs font-semibold">{p.question}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.options.map((o) => (
                      <span key={o} className="rounded-full bg-secondary/70 px-3 py-1.5 text-[11px]">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-4xl p-6">
            <p className="text-sm font-bold">Participants in the plaza</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(people ?? []).slice(0, 24).map((p) => (
                <span
                  key={p.id}
                  title={p.full_name}
                  className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-cool)" }}
                >
                  {p.full_name.slice(0, 1).toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FestivalPage>
  );
}
