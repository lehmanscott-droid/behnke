// Turn a post's timestamp into a friendly, plain-language "time ago" label.
// Seed posts carry `minutesAgo`; resident-created posts carry `createdAt` (ms).
export function timeAgo(post, now = Date.now()) {
  let minutes;
  if (typeof post.minutesAgo === "number") {
    minutes = post.minutesAgo;
  } else if (typeof post.createdAt === "number") {
    minutes = Math.max(0, Math.round((now - post.createdAt) / 60000));
  } else {
    return "just now";
  }

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.round(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}
