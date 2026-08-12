"use client";

import { useMemo, useState } from "react";
import { useHub } from "@/context/HubContext";
import { CATEGORIES } from "@/lib/seed";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";

// Newest first: resident posts carry createdAt (ms); seed posts carry
// minutesAgo. Convert both to an absolute moment for a stable chronological sort.
function sortKey(post, now) {
  if (typeof post.createdAt === "number") return post.createdAt;
  if (typeof post.minutesAgo === "number") return now - post.minutesAgo * 60000;
  return 0;
}

export default function CommunityFeed() {
  const { posts } = useHub();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = useMemo(() => {
    const now = Date.now();
    const q = query.trim().toLowerCase();

    return posts
      .filter((p) => (filter === "all" ? true : p.category === filter))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
        );
      })
      .slice()
      .sort((a, b) => sortKey(b, now) - sortKey(a, now));
  }, [posts, query, filter]);

  return (
    <section aria-labelledby="feed-heading" className="space-y-5">
      <div className="flex items-baseline justify-between">
        <h2 id="feed-heading" className="text-2xl font-bold text-charcoal">
          Community Feed
        </h2>
        <span className="text-base text-charcoal/60">
          {visible.length} {visible.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <PostComposer />

      {/* Search */}
      <div>
        <label htmlFor="feed-search" className="sr-only">
          Search the feed
        </label>
        <input
          id="feed-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts, names, or keywords…"
          className="field"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <FilterChip value="all" current={filter} onSelect={setFilter} label="All" />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.id}
            value={c.id}
            current={filter}
            onSelect={setFilter}
            label={c.label}
          />
        ))}
      </div>

      {/* Feed */}
      {visible.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-lg font-semibold text-charcoal">
            No posts match your search.
          </p>
          <p className="mt-1 text-base text-charcoal/70">
            Try a different word, or clear the filters above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

function FilterChip({ value, current, onSelect, label }) {
  const active = value === current;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={active}
      className={`rounded-full border-2 px-4 py-2 text-base font-semibold transition-colors ${
        active
          ? "border-charcoal bg-charcoal text-offwhite-paper"
          : "border-charcoal-line/40 text-charcoal hover:border-charcoal-line"
      }`}
    >
      {label}
    </button>
  );
}
