import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/data/site";
import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Waves", to: "/waves" },
  { label: "Experiences", to: "/experiences" },
  { label: "Missions", to: "/missions" },
  { label: "Community", to: "/community" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center rounded-2xl border border-white/[0.08] bg-[#0D0D14]/75 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
            aria-label={`${BRAND.name} home`}
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.045]">
              <span className="absolute inset-0 bg-gradient-to-br from-[#6D3CFF]/25 via-[#FF2FA6]/10 to-[#FFC700]/20 opacity-80" />

              <BrandMark className="relative h-6 w-6" />
            </div>

            <div className="hidden sm:block">
              <BrandWordmark className="block text-sm" />


              <div className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/35">
                {BRAND.descriptor}
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{
                  className: "bg-white/[0.07] text-white",
                }}
                inactiveProps={{
                  className:
                    "text-white/50 hover:bg-white/[0.045] hover:text-white",
                }}
                className="rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}

            <div className="mx-2 h-5 w-px bg-white/[0.08]" />

            <Link
              to="/login"
              className="rounded-xl px-3.5 py-2 text-xs font-medium text-white/60 transition-all duration-200 hover:bg-white/[0.045] hover:text-white"
            >
              Sign in
            </Link>

            <Link
              to="/join"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1]"
            >
              Join UNWAVES
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D14]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{
                    className: "bg-white/[0.07] text-white",
                  }}
                  inactiveProps={{
                    className:
                      "text-white/55 hover:bg-white/[0.045] hover:text-white",
                  }}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-white/[0.07]" />

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.045] hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/join"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#6D3CFF]/20 via-[#FF2FA6]/10 to-[#FFB000]/15 px-4 py-3.5 text-sm font-semibold text-white"
              >
                <span>Join UNWAVES</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
