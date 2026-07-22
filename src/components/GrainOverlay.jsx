// Fixed, pointer-events-free film grain layered over the whole app.
// Kept as its own component so the gritty texture is a single source of truth.
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />
}
