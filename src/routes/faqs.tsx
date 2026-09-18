import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading, Reveal } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTA";
import { ParticleField } from "@/components/site/ParticleField";
import { FAQS } from "@/data/site";

const title = "FAQs | UNWAVES";

const description =
  "Answers about UNWAVES, how the movement works, who can participate, what you can explore and how you can contribute.";

export const Route = createFileRoute("/faqs")({
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
        content:
          "Everything you might want to know about UNWAVES and the movement behind it.",
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
  component: Faqs,
});

function Faqs() {
  return (
    <main>
      <Section className="relative overflow-hidden pt-36">
        <div className="aurora-bg opacity-35" />
        <ParticleField count={12} />

        <div className="relative z-10">
          <SectionHeading
            eyebrow="FAQs"
            title="Everything you might be wondering"
            subtitle="A few answers before you step into the movement."
          />

          <Reveal className="mt-12">
            <Accordion
              type="single"
              collapsible
              className="glass gradient-border rounded-4xl px-5 py-2 sm:px-8"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline sm:text-lg">
                    {faq.q}
                  </AccordionTrigger>

                  <AccordionContent className="text-sm text-muted-foreground sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      <Section>
        <CTABanner title="Still curious? Step into the wave." />
      </Section>
    </main>
  );
}
