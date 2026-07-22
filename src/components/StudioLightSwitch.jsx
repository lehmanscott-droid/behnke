// ---------------------------------------------------------------------------
// StudioLightSwitch — environment presets for the modal's viewing wall
// ---------------------------------------------------------------------------
// Each preset drives (a) the background environment behind the painting and
// (b) a CSS filter / drop-shadow applied to the artwork itself, so the piece
// visibly changes character under each "light". Consumed by ArtworkModal.

export const LIGHT_MODES = {
  spotlight: {
    id: 'spotlight',
    label: 'Dim Gallery Spotlight',
    // Warm pool of light fading into near-dark.
    stage:
      'radial-gradient(60% 55% at 50% 42%, rgba(255,236,200,0.16), rgba(11,11,13,0.96) 70%)',
    artFilter: 'contrast(1.05) brightness(0.96) saturate(1.02)',
    artShadow: '0 40px 80px rgba(0,0,0,0.75)',
    accent: '#ffd7a0',
  },
  daylight: {
    id: 'daylight',
    label: 'Daylight Studio',
    // Bright, neutral north-light studio.
    stage:
      'linear-gradient(180deg, #d9d9d4 0%, #b9bab4 55%, #9a9b95 100%)',
    artFilter: 'contrast(1.02) brightness(1.03) saturate(1.0)',
    artShadow: '0 24px 50px rgba(0,0,0,0.35)',
    accent: '#f5f5f0',
  },
  blacklight: {
    id: 'blacklight',
    label: 'UV Blacklight Look',
    // Deep violet room; the art fluoresces via hue-rotate + saturation push.
    stage:
      'radial-gradient(70% 60% at 50% 45%, rgba(80,0,180,0.35), #0a0018 75%)',
    artFilter:
      'saturate(1.9) contrast(1.25) hue-rotate(255deg) brightness(1.15)',
    artShadow: '0 0 70px rgba(150,60,255,0.5)',
    accent: '#b46bff',
  },
}

export const LIGHT_ORDER = ['spotlight', 'daylight', 'blacklight']

export default function StudioLightSwitch({ value, onChange }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
        Studio Light Switch
      </p>
      <div className="flex flex-col gap-2">
        {LIGHT_ORDER.map((key) => {
          const mode = LIGHT_MODES[key]
          const active = value === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-pressed={active}
              className={`group flex items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                active
                  ? 'border-electric bg-electric/10 text-white'
                  : 'border-white/15 text-neutral-400 hover:border-white/40'
              }`}
            >
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full border border-black/40"
                style={{
                  background: mode.accent,
                  boxShadow: active ? `0 0 10px ${mode.accent}` : 'none',
                }}
              />
              <span className="font-mono text-xs uppercase tracking-widest">
                {mode.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
