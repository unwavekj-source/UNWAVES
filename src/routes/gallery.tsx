import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { GalleryCard } from "@/components/site/GalleryCard";
import { CTABanner } from "@/components/site/CTA";
import { ParticleField } from "@/components/site/ParticleField";
import { GALLERY } from "@/data/site";

const title = "Community Showcase Gallery | UNWAVES";
const description =
  "The UNWAVES festival wall: reels, art, photography, writing and voice notes created by the community during the season.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <main>
      <Section className="overflow-hidden pt-36">
        <div className="aurora-bg opacity-35" />
        <ParticleField count={14} />
        <SectionHeading
          eyebrow="Community showcase"
          title="The festival wall"
          subtitle="Sample submissions shown as placeholders — Season 1 fills this wall with real student work."
        />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, i) => (
            <GalleryCard key={g.title} {...g} span={g.span as "tall" | "short"} index={i} />
          ))}
        </div>
      </Section>

      <Section>
        <CTABanner title="Put your work on this wall" />
      </Section>
    </main>
  );
}
