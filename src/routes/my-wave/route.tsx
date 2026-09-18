import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/my-wave")({
  component: MyWaveLayout,
});

function MyWaveLayout() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/my-wave"
            className="group inline-flex items-center gap-3"
          >
            <BrandMark className="h-9 w-9" />

            <BrandWordmark className="text-lg" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/my-wave"
              className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground sm:inline-flex"
            >
              My Wave
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.08]"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
