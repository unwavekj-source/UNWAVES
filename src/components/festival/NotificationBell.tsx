import { useState } from "react";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@/hooks/useUnwinds";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/unwind-api";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { userId, list, unread } = useNotifications();

  async function refresh() {
    await qc.invalidateQueries({ queryKey: ["notifications", userId] });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative grid h-10 w-10 place-items-center rounded-full border border-border"
      >
        <Icons.Bell className="h-4.5 w-4.5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-festival-pink px-1 text-[10px] font-bold text-primary-foreground">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass gradient-border absolute right-0 top-12 z-50 w-80 rounded-3xl p-3"
          >
            <div className="flex items-center justify-between px-1 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Notifications</p>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    await markAllNotificationsRead(userId);
                    await refresh();
                  }}
                  className="text-[11px] font-semibold text-festival-pink"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {list.length === 0 && <p className="px-1 py-4 text-xs text-muted-foreground">Nothing yet. Your verifications will appear here.</p>}
              {list.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={async () => {
                    if (!n.read_at) {
                      await markNotificationRead(n.id);
                      await refresh();
                    }
                  }}
                  className={`block w-full rounded-2xl p-3 text-left ${n.read_at ? "bg-secondary/40" : "bg-secondary/70"}`}
                >
                  <p className="flex items-center gap-2 text-xs font-bold">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        n.kind === "success" ? "bg-emerald-400" : n.kind === "error" ? "bg-rose-500" : n.kind === "warning" ? "bg-orange-400" : "bg-festival-gold"
                      }`}
                    />
                    {n.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground/70">{new Date(n.created_at).toLocaleString("en-IN")}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
