"use client";

import { useState } from "react";
import { useHub } from "@/context/HubContext";

// The "Block Captain" simulation. A discreet, low-key launcher sits in the
// corner so it stays out of the way of everyday residents; opening it reveals
// the controls that push an emergency to the top banner in real time.
export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("alert");
  const { emergency, publishEmergency, clearEmergency } = useHub();

  function handlePublish(e) {
    e.preventDefault();
    if (!message.trim()) return;
    publishEmergency(message, level);
    setMessage("");
  }

  return (
    <>
      {/* Discreet launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-40 rounded-full border border-charcoal-line/50 bg-charcoal/90 px-4 py-2 text-sm font-semibold text-offwhite-paper/90 shadow-md backdrop-blur transition-colors hover:bg-charcoal focus-visible:outline-forest"
      >
        Block Captain
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal-deep/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-content animate-fade-in card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-forest">
                  Block Captain Controls
                </p>
                <h2
                  id="admin-title"
                  className="mt-1 text-2xl font-bold text-charcoal"
                >
                  Post a neighborhood alert
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-quiet !px-4 !py-2 !text-base"
              >
                Close
              </button>
            </div>

            <p className="mt-2 text-base text-charcoal/75">
              Anything you publish here appears immediately in the banner at the
              top of the app for everyone — no refresh needed.
            </p>

            <form onSubmit={handlePublish} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="alert-message"
                  className="mb-1 block text-base font-semibold text-charcoal"
                >
                  Alert message
                </label>
                <textarea
                  id="alert-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="e.g. Street cleaning on Damen today — move cars to the east side by 9am."
                  className="field resize-y"
                />
              </div>

              <fieldset>
                <legend className="mb-2 text-base font-semibold text-charcoal">
                  Severity
                </legend>
                <div className="flex flex-wrap gap-3">
                  <SeverityChoice
                    value="alert"
                    current={level}
                    onSelect={setLevel}
                    label="Emergency Alert"
                    hint="Red — urgent safety issue"
                  />
                  <SeverityChoice
                    value="notice"
                    current={level}
                    onSelect={setLevel}
                    label="Notice"
                    hint="Amber — heads-up / reminder"
                  />
                </div>
              </fieldset>

              <div className="flex flex-wrap gap-3 pt-1">
                <button type="submit" className="btn-primary">
                  Publish to banner
                </button>
                {emergency && (
                  <button
                    type="button"
                    onClick={clearEmergency}
                    className="btn-secondary"
                  >
                    Clear active alert
                  </button>
                )}
              </div>
            </form>

            {emergency && (
              <div className="mt-5 rounded-lg border border-charcoal-line/40 bg-offwhite-dim px-4 py-3">
                <p className="text-sm font-semibold text-charcoal/70">
                  Currently live:
                </p>
                <p className="text-base text-charcoal">{emergency.message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SeverityChoice({ value, current, onSelect, label, hint }) {
  const active = value === current;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={active}
      className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
        active
          ? "border-forest bg-forest/10"
          : "border-charcoal-line/40 hover:border-charcoal-line"
      }`}
    >
      <span className="block text-base font-semibold text-charcoal">
        {label}
      </span>
      <span className="block text-sm text-charcoal/70">{hint}</span>
    </button>
  );
}
