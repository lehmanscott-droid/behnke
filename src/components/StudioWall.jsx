import ArtworkCard from './ArtworkCard.jsx'

// ---------------------------------------------------------------------------
// StudioWall — the masonry grid ("The Interactive Studio Wall")
// ---------------------------------------------------------------------------
// CSS multi-column masonry keeps tiles of varying heights tightly packed while
// staying dependency-free and fully responsive. `break-inside-avoid` on each
// card (via mb-4 + inline-block behaviour of the button) prevents splitting.

export default function StudioWall({ paintings, onOpen }) {
  return (
    <section id="wall" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="[column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3">
        {paintings.map((p, i) => (
          <div key={p.id} className="break-inside-avoid">
            <ArtworkCard painting={p} onOpen={onOpen} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
