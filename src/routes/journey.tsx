import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { JourneyMap } from "@/components/site/JourneyMap";
import { CTABanner } from "@/components/site/CTA";
import { ParticleField } from "@/components/site/ParticleField";

const title = "The UNWAVES Journey — From Discover to Hall of Fame";
const description =
  "Follow the UNWAVES journey: discover, register, enter the season, daily unwinds, main challenges, showcase, voting, recognition and Hall of Fame.";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Journey,
});

function Journey() {
  return (
    <main>
      <Section className="overflow-hidden pt-36">
        <div className="aurora-bg opacity-40" />
        <ParticleField count={16} />
        <SectionHeading
          eyebrow="Journey map"
          title="Nine stops, one unforgettable season"
          subtitle="This is not a schedule. It is the route your festival takes, from the first spark to the season stage."
        />
        <JourneyMap />
      </Section>

      <Section>
        <CTABanner title="Start at stop one" subtitle="Registration takes less than a minute." />
      </Section>
    </main>
  );
}
