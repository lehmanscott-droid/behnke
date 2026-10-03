import { MotionConfig } from 'framer-motion'
import ArtworkCard from './ArtworkCard.jsx'

// ---------------------------------------------------------------------------
// StudioWall — the masonry grid ("The Interactive Studio Wall")
// ---------------------------------------------------------------------------
// CSS multi-column masonry keeps tiles of varying heights tightly packed while
// staying dependency-free and fully responsive. `break-inside-avoid` on each
// card (via mb-4 + inline-block behaviour of the button) prevents splitting.
// MotionConfig makes the tile tilt and rise instant (no animated movement) for
// visitors who ask for reduced motion; the CSS rule in index.css can't reach
// Framer's animations.

export default function StudioWall({ paintings, onOpen }) {
  return (
    <section id="wall" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <MotionConfig reducedMotion="user">
        <div className="[column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3">
          {paintings.map((p, i) => (
            <div key={p.id} className="break-inside-avoid">
              <ArtworkCard painting={p} onOpen={onOpen} index={i} />
            </div>
          ))}
        </div>
      </MotionConfig>
    </section>
  )
}
