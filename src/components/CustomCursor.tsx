import { useEffect, useRef, useState } from 'react'

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const posRef = useRef<HTMLDivElement>(null)
  const rotRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const rot = useRef(0)
  const lastX = useRef(0)

  useEffect(() => {
    // Don't render or attach listeners on touch devices
    if (isTouchDevice()) return
    setEnabled(true)

    const pos = posRef.current
    const rotEl = rotRef.current
    const scaleEl = scaleRef.current
    if (!pos || !rotEl || !scaleEl) return

    const onMove = (e: MouseEvent) => {
      pos.style.transform = `translate3d(${e.clientX - 14}px,${e.clientY - 14}px,0)`
      pos.style.opacity = '1'

      const dx = e.clientX - lastX.current
      rot.current += dx * 0.4
      rotEl.style.transform = `rotate(${rot.current}deg)`
      lastX.current = e.clientX
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.closest('.photo-card') || t.closest('.chat-widget')) {
        scaleEl.style.transform = 'scale(1.5)'
      }
    }

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.closest('.photo-card') || t.closest('.chat-widget')) {
        scaleEl.style.transform = 'scale(1)'
      }
    }

    const onLeave = () => { pos.style.opacity = '0' }
    const onEnter = () => { pos.style.opacity = '1' }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled])

  // Don't render anything on touch devices
  if (!enabled) return null

  return (
    <div
      ref={posRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        willChange: 'transform',
        transition: 'opacity 0.12s',
      }}
    >
      <div ref={rotRef} style={{ transformOrigin: 'center center' }}>
        <div ref={scaleRef} style={{ transformOrigin: 'center center', transition: 'transform 0.18s ease-out' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" fill="#FF5733" stroke="#1a1a1a" strokeWidth="1.5" />
            <path d="M14 1.5V26.5" stroke="#1a1a1a" strokeWidth="1" opacity="0.6" />
            <path d="M1.5 14H26.5" stroke="#1a1a1a" strokeWidth="1" opacity="0.6" />
            <path d="M4 5.5C7 9 10 12 14 14C18 12 21 9 24 5.5" stroke="#1a1a1a" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M4 22.5C7 19 10 16 14 14C18 16 21 19 24 22.5" stroke="#1a1a1a" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
