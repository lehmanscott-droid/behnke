"use client";

import { useState } from "react";
import { useHub } from "@/context/HubContext";
import { CATEGORIES } from "@/lib/seed";

export default function PostComposer() {
  const { addPost } = useHub();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("news");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function reset() {
    setCategory("news");
    setAuthor("");
    setTitle("");
    setBody("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addPost({ category, author, title, body });
    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <div className="card p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-charcoal">
            Have something to share with the neighborhood?
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-primary"
          >
            Share an update
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card animate-fade-in space-y-4 p-6">
      <h2 className="text-2xl font-bold text-charcoal">Share an update</h2>

      <div>
        <span className="mb-2 block text-base font-semibold text-charcoal">
          What kind of update?
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={active}
                className={`rounded-lg border-2 px-4 py-2 text-base font-semibold transition-colors ${
                  active
                    ? "border-forest bg-forest text-offwhite-paper"
                    : "border-charcoal-line/40 text-charcoal hover:border-charcoal-line"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="post-title"
          className="mb-1 block text-base font-semibold text-charcoal"
        >
          Title
        </label>
        <input
          id="post-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A short, clear headline"
          className="field"
        />
      </div>

      <div>
        <label
          htmlFor="post-body"
          className="mb-1 block text-base font-semibold text-charcoal"
        >
          Details
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Share the details neighbors will want to know."
          className="field resize-y"
        />
      </div>

      <div>
        <label
          htmlFor="post-author"
          className="mb-1 block text-base font-semibold text-charcoal"
        >
          Your name{" "}
          <span className="font-normal text-charcoal/60">(optional)</span>
        </label>
        <input
          id="post-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Maria on Hoyne"
          className="field"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="submit"
          className="btn-primary"
          disabled={!title.trim() || !body.trim()}
        >
          Post to feed
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            setOpen(false);
          }}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
