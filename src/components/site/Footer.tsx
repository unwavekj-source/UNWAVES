import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import { BRAND } from "@/data/site";
import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";

const groups = [
  {
    heading: "Explore",
    links: [
      { to: "/waves", label: "Waves" },
      { to: "/experiences", label: "Experiences" },
      { to: "/daily-waves", label: "Daily Waves" },
      { to: "/missions", label: "Missions" },
      { to: "/community", label: "Community" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { to: "/showcase", label: "Showcase" },
      { to: "/creators", label: "Creators" },
      { to: "/stories", label: "Stories" },
      { to: "/hall-of-fame", label: "Hall of Fame" },
      { to: "/faqs", label: "FAQs" },
    ],
  },
] as const;

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] px-5 pb-8 pt-16 sm:px-8">
      <div className="aurora-bg opacity-20" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-3"
            aria-label={`${BRAND.name} home`}
          >
            <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.045]">
              <span className="absolute inset-0 bg-gradient-to-br from-[#6D3CFF]/25 via-[#FF2FA6]/10 to-[#FF7A00]/20" />

              <BrandMark className="relative h-6 w-6" />
            </div>

            <div>
              <BrandWordmark className="block text-base" />


              <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.2em] text-white/35">
                {BRAND.descriptor}
              </div>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
            {BRAND.descriptor} A space to pause, explore, create, connect, and
            move forward together.
          </p>

          <p className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {BRAND.line}
          </p>
        </div>

        {/* Explore */}
        {groups.map((group) => (
          <div key={group.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {group.heading}
            </h3>

            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Stay connected */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Stay connected
          </h3>

          <p className="mt-5 max-w-xs text-sm leading-6 text-white/50">
            The movement keeps moving. Follow UNWAVES for new experiences,
            stories, missions, and community moments.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/55">
            <Mail className="h-4 w-4 text-white/35" />
            <span>More ways to connect coming soon.</span>
          </div>

          <div className="mt-6 flex gap-2">
            {socials.map((social) => (
              <span
                key={social.label}
                title={`${social.label} — coming soon`}
                aria-label={`${social.label} — coming soon`}
                className="grid h-10 w-10 cursor-default place-items-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-white/30"
              >
                <social.icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto mt-14 flex w-full max-w-7xl flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. Made with people, ideas,
          and experiences.
        </p>

        <p className="font-medium uppercase tracking-[0.16em]">
          One Wave. Many Stories.
        </p>
      </div>
    </footer>
  );
}
