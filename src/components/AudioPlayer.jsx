import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import channels from '../data/channels.js'
import Waveform from './Waveform.jsx'

// ---------------------------------------------------------------------------
// AudioPlayer — "The Studio Playlist"
// ---------------------------------------------------------------------------
// A self-contained, floating vinyl player. It is mounted ONCE at the App root
// and owns 100% of its own state, so opening the artwork modal, the checkout
// panel, or scrolling the grid never re-mounts it and never interrupts audio.
//
// One <audio> element is created per channel (see data/channels.js). Only the
// active channel is ever played; switching "vibe" pauses the old element and
// resumes the new one at its current position, so the swap is seamless.
// ---------------------------------------------------------------------------

export default function AudioPlayer() {
  const [activeId, setActiveId] = useState(channels[0].id)
  const [playing, setPlaying] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [note, setNote] = useState('') // friendly message when audio is missing

  // One ref per channel's <audio> element.
  const audioRefs = useRef({})
  const active = channels.find((c) => c.id === activeId) ?? channels[0]

  const getEl = (id) => audioRefs.current[id]

  const stopAllExcept = (keepId) => {
    channels.forEach((c) => {
      if (c.id !== keepId) {
        const el = getEl(c.id)
        if (el) el.pause()
      }
    })
  }

  const play = async () => {
    const el = getEl(activeId)
    if (!el) return
    stopAllExcept(activeId)
    try {
      await el.play()
      setPlaying(true)
      setNote('')
    } catch (err) {
      // Most common cause here: the placeholder file doesn't exist yet.
      setPlaying(false)
      setNote('Add a file at ' + active.src)
    }
  }

  const pause = () => {
    const el = getEl(activeId)
    if (el) el.pause()
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  const selectChannel = async (id) => {
    setMenuOpen(false)
    if (id === activeId) return
    const wasPlaying = playing
    stopAllExcept(id)
    setActiveId(id)
    if (wasPlaying) {
      const el = getEl(id)
      try {
        await el?.play()
        setPlaying(true)
        setNote('')
      } catch {
        setPlaying(false)
        const next = channels.find((c) => c.id === id)
        setNote('Add a file at ' + (next?.src ?? ''))
      }
    }
  }

  // Keep React state honest if the media ends or errors on its own.
  useEffect(() => {
    const els = channels.map((c) => getEl(c.id)).filter(Boolean)
    const onEnd = () => setPlaying(false)
    els.forEach((el) => {
      el.addEventListener('ended', onEnd)
      el.addEventListener('pause', () => {
        // Only reflect pauses on the active element.
        if (el === getEl(activeId)) setPlaying(!el.paused)
      })
    })
    return () => els.forEach((el) => el.removeEventListener('ended', onEnd))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  return (
    <div className="fixed bottom-4 left-4 z-50 select-none">
      {/* Hidden media elements — one per channel, looped ambient beds. */}
      {channels.map((c) => (
        <audio
          key={c.id}
          ref={(el) => (audioRefs.current[c.id] = el)}
          src={c.src}
          loop
          preload="none"
        />
      ))}

      <div className="relative flex items-center gap-3 rounded-none border border-white/15 bg-ink-800/90 backdrop-blur px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.6)] scanlines">
        {/* Spinning vinyl / play toggle */}
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause studio playlist' : 'Play studio playlist'}
          className="group relative h-12 w-12 shrink-0 rounded-full border border-white/20 outline-none focus-visible:ring-2 focus-visible:ring-electric"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'repeating-radial-gradient(circle at 50% 50%, #17171c 0 2px, #0b0b0d 2px 4px)',
            }}
            animate={{ rotate: playing ? 360 : 0 }}
            transition={
              playing
                ? { repeat: Infinity, ease: 'linear', duration: 4 }
                : { duration: 0.3 }
            }
          />
          {/* Vinyl label */}
          <span
            className="absolute inset-0 m-auto h-4 w-4 rounded-full border border-black"
            style={{ background: active.accent }}
          />
          {/* Play / pause glyph */}
          <span className="absolute inset-0 grid place-items-center text-white">
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="3.5" height="12" />
                <rect x="8.5" y="1" width="3.5" height="12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M2 1 L13 7 L2 13 Z" />
              </svg>
            )}
          </span>
        </button>

        {/* Visualizer */}
        <Waveform playing={playing} color={active.accent} />

        {/* Channel selector */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 border border-white/15 bg-ink-700 px-3 py-2 text-[11px] uppercase tracking-widest text-neutral-300 hover:border-white/40"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: active.accent, boxShadow: `0 0 8px ${active.accent}` }}
            />
            <span className="hidden sm:inline">{active.label}</span>
            <span className="sm:hidden">Vibe</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
            >
              <path d="M1 3 L5 7 L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                role="listbox"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 w-56 border border-white/15 bg-ink-800/95 backdrop-blur shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
              >
                <li className="border-b border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Studio Vibe
                </li>
                {channels.map((c) => {
                  const isActive = c.id === activeId
                  return (
                    <li key={c.id} role="option" aria-selected={isActive}>
                      <button
                        onClick={() => selectChannel(c.id)}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/5 ${
                          isActive ? 'text-white' : 'text-neutral-400'
                        }`}
                      >
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            background: c.accent,
                            boxShadow: isActive ? `0 0 8px ${c.accent}` : 'none',
                          }}
                        />
                        {c.label}
                        {isActive && (
                          <span className="ml-auto text-[10px] uppercase tracking-widest text-neutral-500">
                            {playing ? 'live' : 'set'}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Non-blocking hint shown only when the placeholder file is missing */}
      <AnimatePresence>
        {note && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 max-w-[16rem] border-l-2 border-hotpink bg-ink-800/90 px-2 py-1 font-mono text-[10px] leading-tight text-neutral-400"
          >
            ♪ {note}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
