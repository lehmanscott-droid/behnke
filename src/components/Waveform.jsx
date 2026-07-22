// ---------------------------------------------------------------------------
// Waveform — a purely-CSS "audio is playing" visualizer.
// ---------------------------------------------------------------------------
// Not wired to real frequency data (that would require the Web Audio API and a
// user-gesture-unlocked AnalyserNode). Instead it's a lightweight, glitchy
// equalizer that animates only while `playing` is true. Staggered delays +
// slightly irregular heights read as a live signal without any JS per frame.

const BARS = [0, 0.12, 0.3, 0.05, 0.22, 0.4, 0.16, 0.34, 0.08]

export default function Waveform({ playing, color = '#00e5ff' }) {
  return (
    <div
      className="flex items-end gap-[3px] h-6"
      aria-hidden="true"
      title={playing ? 'Now playing' : 'Paused'}
    >
      {BARS.map((delay, i) => (
        <span
          key={i}
          className="eq-bar rounded-sm"
          style={{
            height: '100%',
            background: color,
            boxShadow: `0 0 6px ${color}`,
            animationPlayState: playing ? 'running' : 'paused',
            animationDelay: `-${delay}s`,
            // Freeze bars low when paused instead of leaving them mid-jump
            transform: playing ? undefined : 'scaleY(0.15)',
            opacity: playing ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  )
}
