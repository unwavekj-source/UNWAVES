import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, Reveal } from "@/components/site/Section";
import { AchievementCard } from "@/components/site/AchievementCard";
import { CTABanner } from "@/components/site/CTA";
import { ParticleField } from "@/components/site/ParticleField";
import { HALL_OF_FAME } from "@/data/site";

const title = "Hall of Fame | UNWAVES";

const description =
  "The UNWAVES Hall of Fame — a growing archive celebrating the people, ideas, creations and contributions that move the community forward.";

export const Route = createFileRoute("/hall-of-fame")({
  head: () => ({
    meta: [
      {
        title,
      },
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: HallOfFame,
});

const recognitionTypes = [
  "Wave Maker",
  "Featured Creator",
  "Community Voice",
  "Most Creative",
  "People's Choice",
  "Outstanding Contribution",
];

function HallOfFame() {
  return (
    <main>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-36">
        <div className="aurora-bg opacity-45" />
        <ParticleField count={20} />

        <div className="relative z-10">
          <SectionHeading
            eyebrow="Hall of Fame"
            title="Some waves leave a mark."
            subtitle="A growing archive of the people, ideas and creations that made an impact across UNWAVES."
          />

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-muted-foreground">
            Recognition here is not just about winning. It is about creating
            something memorable, helping someone else, showing up for the
            community, or moving the movement forward.
          </p>
        </div>

        <div className="relative z-10 mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HALL_OF_FAME.map((entry, index) => (
            <AchievementCard
              key={entry.title}
              {...entry}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* Recognition */}
      <Section>
        <SectionHeading
          eyebrow="Recognition"
          title="Many ways to make your mark."
          subtitle="Different contributions can create different kinds of recognition."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {recognitionTypes.map((type, index) => (
            <Reveal key={type} delay={index * 0.05}>
              <span className="glass glass-hover inline-flex rounded-full px-5 py-3 text-sm font-semibold">
                {type}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Archive */}
      <Section>
        <SectionHeading
          eyebrow="The archive"
          title="Built one wave at a time."
          subtitle="As UNWAVES grows, this space will become a living record of the people and moments worth remembering."
        />

        <Reveal className="mt-10">
          <div className="glass gradient-border rounded-4xl p-10 text-center">
            <p className="text-lg font-semibold text-foreground">
              The archive is taking shape.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Featured people, creations, milestones and community
              contributions will appear here as UNWAVES grows.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <CTABanner
          title="Create something worth remembering."
        />
      </Section>
    </main>
  );
}
