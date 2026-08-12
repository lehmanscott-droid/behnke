"use client";

import { useHub } from "@/context/HubContext";
import { categoryStyle, CATEGORIES } from "@/lib/seed";
import { timeAgo } from "@/lib/time";

const categoryLabel = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
);

export default function PostCard({ post }) {
  const { upvotePost, reportPost } = useHub();

  return (
    <article className="card animate-fade-in p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className={`rounded-md px-2.5 py-1 text-sm font-bold uppercase tracking-wide ${
            categoryStyle[post.category] || "bg-charcoal text-offwhite-paper"
          }`}
        >
          {categoryLabel[post.category] || "Update"}
        </span>
        <span className="text-base font-semibold text-charcoal">
          {post.author}
        </span>
        <span aria-hidden="true" className="text-charcoal/40">
          ·
        </span>
        <span className="text-base text-charcoal/60">{timeAgo(post)}</span>
      </div>

      <h3 className="mt-3 text-xl font-bold leading-snug text-charcoal">
        {post.title}
      </h3>
      <p className="mt-1.5 text-lg leading-relaxed text-charcoal/85">
        {post.body}
      </p>

      {post.reported && (
        <p className="mt-3 rounded-md bg-amber-signal/20 px-3 py-2 text-base font-semibold text-charcoal">
          Flagged for review by a neighbor. A moderator will take a look.
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-charcoal-line/20 pt-4">
        <button
          type="button"
          onClick={() => upvotePost(post.id)}
          className="btn-quiet !px-4 !py-2 !text-base"
        >
          Helpful
          <span className="ml-1 rounded-md bg-charcoal/10 px-2 py-0.5 text-sm font-bold text-charcoal">
            {post.helpful}
          </span>
        </button>

        <button
          type="button"
          onClick={() => reportPost(post.id)}
          aria-pressed={post.reported}
          className={`btn !px-4 !py-2 !text-base ${
            post.reported
              ? "bg-brick text-offwhite-paper hover:bg-brick-dark"
              : "border-2 border-charcoal-line/40 text-charcoal hover:bg-charcoal hover:text-offwhite-paper"
          }`}
        >
          {post.reported ? "Reported" : "Report"}
        </button>
      </div>
    </article>
  );
}
