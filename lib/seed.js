// Seed content so the feed looks alive on first load.
// Timestamps are relative offsets (minutes ago) resolved at hydration time.

export const CATEGORIES = [
  { id: "news", label: "News" },
  { id: "event", label: "Event" },
  { id: "photo", label: "Photo" },
  { id: "repair", label: "Home Repair" },
];

export const categoryStyle = {
  news: "bg-charcoal text-offwhite-paper",
  event: "bg-forest text-offwhite-paper",
  photo: "bg-brick text-offwhite-paper",
  repair: "bg-amber-signal text-charcoal-deep",
};

export const seedPosts = [
  {
    id: "seed-1",
    category: "event",
    author: "Damen Ave Neighbors",
    title: "Marion Ct. cleanup — Saturday 9am",
    body: "Meet at the fountain by the park entrance. Gloves and bags provided. Coffee from the corner cafe afterward. All ages welcome — bring the kids and the dogs.",
    minutesAgo: 42,
    helpful: 18,
    reported: false,
  },
  {
    id: "seed-2",
    category: "repair",
    author: "Maria on Hoyne",
    title: "Trusted handyman for old radiators",
    body: "After three winters of guessing, I finally found someone who knows pre-war steam heat. Reliable, fair pricing, cleans up after himself. Happy to share his number — just reply here.",
    minutesAgo: 130,
    helpful: 27,
    reported: false,
  },
  {
    id: "seed-3",
    category: "news",
    author: "Block Captain — Wolcott",
    title: "New four-way stop at Wolcott & Schiller",
    body: "The city installed the stop signs this week. Please spread the word to drivers who cut through — especially near the school crossing in the mornings.",
    minutesAgo: 305,
    helpful: 12,
    reported: false,
  },
  {
    id: "seed-4",
    category: "photo",
    author: "Jerome",
    title: "Morning light on the Flat Iron Building",
    body: "Caught the sun hitting the brick just right on my walk today. Ninety years old and still the most handsome building on the block.",
    minutesAgo: 520,
    helpful: 34,
    reported: false,
  },
];
