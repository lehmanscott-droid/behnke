// ---------------------------------------------------------------------------
// STUDIO PLAYLIST — audio channels
// ---------------------------------------------------------------------------
// Drop your own files into /public/audio (e.g. /public/audio/lofi.mp3) OR paste
// a streaming URL into `src`. Each entry maps 1:1 to a dropdown option in the
// AudioPlayer. The player pre-creates one <audio> element per channel and only
// ever plays the active one, so switching vibes is instant.
//
// The `src` values below are placeholders. They point at local paths that don't
// exist yet — the player degrades gracefully (shows the UI, logs a friendly
// note) until you supply real audio. Swap them for your tracks or live streams.
// ---------------------------------------------------------------------------

export const channels = [
  {
    id: 'lofi',
    label: 'Lo-Fi Beats',
    // e.g. a royalty-free lofi loop or a stream like 'https://.../lofi'
    src: '/audio/lofi.mp3',
    accent: '#00e5ff',
  },
  {
    id: 'alt',
    label: 'Alternative / Radiohead',
    src: '/audio/alternative.mp3',
    accent: '#ff2d95',
  },
  {
    id: 'industrial',
    label: 'Industrial Electronic',
    src: '/audio/industrial.mp3',
    accent: '#c6ff00',
  },
]

export default channels
