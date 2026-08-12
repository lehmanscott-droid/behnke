"use client";

import { useHub } from "@/context/HubContext";

export default function EmergencyBanner() {
  const { emergency, bannerVisible, dismissEmergency } = useHub();

  if (!bannerVisible || !emergency) return null;

  const isAlert = emergency.level === "alert";

  // Signal colors adapt to severity: brick red for alerts, warm amber for notices.
  const signalColor = isAlert ? "#e6604d" : "#e0a94a";
  const bgClass = isAlert ? "bg-brick-dark" : "bg-charcoal";
  const kicker = isAlert ? "Emergency Alert" : "Neighborhood Notice";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`sticky top-0 z-50 w-full animate-slide-down ${bgClass} text-offwhite-paper shadow-lg`}
      style={{ "--signal-color": `${signalColor}88` }}
    >
      <div className="mx-auto flex max-w-content items-start gap-3 px-4 py-3 sm:items-center">
        {/* Pulsing indicator light */}
        <span className="mt-1 flex shrink-0 sm:mt-0" aria-hidden="true">
          <span
            className="h-4 w-4 rounded-full animate-signal-pulse"
            style={{ backgroundColor: signalColor }}
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-offwhite-paper/80">
            {kicker}
          </p>
          <p className="text-lg font-semibold leading-snug">{emergency.message}</p>
        </div>

        <button
          type="button"
          onClick={dismissEmergency}
          className="shrink-0 rounded-lg border-2 border-offwhite-paper/40 px-4 py-2 text-base font-semibold text-offwhite-paper transition-colors hover:bg-offwhite-paper hover:text-charcoal focus-visible:outline-offwhite"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
