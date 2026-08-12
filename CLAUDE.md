# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

**Marion Ct. Hub** — a mobile-responsive neighborhood web app for the Marion
Ct. community. It pairs a real-time emergency banner (published by "block
captains") with a community feed of news, events, photos, and trusted
home-repair recommendations.

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **Tailwind CSS 3** for styling
- Plain JavaScript (`.js` / `.jsx`), no TypeScript
- No external state library — state lives in a React Context provider

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (next/core-web-vitals)

## Architecture

- `app/` — App Router entry (`layout.js`, `page.js`, `globals.css`).
  `layout.js` wraps the app in `HubProvider`.
- `context/HubContext.js` — the single source of truth. Holds the emergency
  banner state and the feed posts, exposes actions (`publishEmergency`,
  `clearEmergency`, `dismissEmergency`, `addPost`, `upvotePost`, `reportPost`),
  persists to `localStorage`, and syncs across open tabs via `BroadcastChannel`
  so an alert published in one tab appears instantly in all of them.
- `components/` — presentational + interactive pieces:
  - `EmergencyBanner.js` — sticky top banner with a pulsing signal light.
  - `AdminPanel.js` — the discreet "Block Captain" launcher + alert composer.
  - `CommunityFeed.js` — search, category filters, and the chronological feed.
  - `PostComposer.js`, `PostCard.js`, `Header.js`.
- `lib/` — `seed.js` (initial posts + category metadata), `time.js` (relative
  time labels).

## Design system

"Modern Industrial Heritage" — high-contrast and accessible for all ages.
Palette and tokens are defined in `tailwind.config.js`:

- `charcoal` (deep neutral), `brick` (warm red, primary action + alerts),
  `offwhite` (backgrounds), `forest` (green accent), `amber.signal` (notices).
- Base font size is 18px; buttons are large and text-labeled (no icon-only
  controls); focus states are always visible. Keep it that way.

## Repository notes

- The repository's default branch (`claude/art-portfolio-advanced-features-ob2pzs`)
  contains an unrelated art portfolio project. This app is independent of it.
