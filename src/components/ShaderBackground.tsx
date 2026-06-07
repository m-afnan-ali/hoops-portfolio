import { useEffect, useRef } from 'react'

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Render at 1/3 resolution for performance — CSS scales it up
    const SCALE = 3

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / SCALE)
      canvas.height = Math.ceil(window.innerHeight / SCALE)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Simple noise
    const noise = (x: number, y: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
      return n - Math.floor(n)
    }

    const smoothNoise = (x: number, y: number) => {
      const ix = Math.floor(x), iy = Math.floor(y)
      const fx = x - ix, fy = y - iy
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy)
      return (
        (noise(ix, iy) * (1 - sx) + noise(ix + 1, iy) * sx) * (1 - sy) +
        (noise(ix, iy + 1) * (1 - sx) + noise(ix + 1, iy + 1) * sx) * sy
      )
    }

    // FBM — 3 octaves instead of 4
    const fbm = (x: number, y: number) => {
      let f = 0, amp = 0.5
      for (let i = 0; i < 3; i++) {
        f += amp * smoothNoise(x, y)
        x *= 2.1; y *= 2.1; amp *= 0.5
      }
      return f
    }

    let smoothMx = 0.5, smoothMy = 0.5

    const render = (time: number) => {
      const t = time * 0.001
      const w = canvas.width, h = canvas.height

      // Smooth mouse
      smoothMx += (mouseRef.current.x - smoothMx) * 0.03
      smoothMy += (mouseRef.current.y - smoothMy) * 0.03

      // Dark base
      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, w, h)

      // Drifting smoke — 2 layers, 4 blobs each (was 3 layers × 8)
      ctx.globalCompositeOperation = 'lighter'
      for (let layer = 0; layer < 2; layer++) {
        const speed = [0.015, -0.01][layer]
        const scale = [1.2, 1.6][layer]
        const alpha = [0.04, 0.03][layer]

        for (let i = 0; i < 4; i++) {
          const bx = fbm(i * 3.7 + t * speed, layer * 5 + t * speed * 0.7)
          const by = fbm(i * 2.3 + layer * 7, t * speed * 0.5 + i)
          const cx = bx * w * scale
          const cy = by * h * scale
          const r = (0.15 + fbm(i + t * 0.01, layer) * 0.2) * Math.max(w, h)

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
          grad.addColorStop(0, `rgba(180, 170, 160, ${alpha})`)
          grad.addColorStop(0.5, `rgba(120, 115, 110, ${alpha * 0.5})`)
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = grad
          ctx.fillRect(0, 0, w, h)
        }
      }

      // Neon orange light bleeds
      const lights = [
        { x: 0.3 + Math.sin(t * 0.15) * 0.25, y: 0.4 + Math.cos(t * 0.12) * 0.3, r: 0.4, intensity: 0.08, color: [255, 87, 51] },
        { x: 0.7 + Math.cos(t * 0.1) * 0.2, y: 0.6 + Math.sin(t * 0.18) * 0.25, r: 0.35, intensity: 0.06, color: [230, 50, 20] },
        { x: 0.5 + Math.sin(t * 0.08) * 0.15, y: 0.2 + Math.cos(t * 0.14) * 0.15, r: 0.25, intensity: 0.04, color: [255, 120, 50] },
      ]

      for (const light of lights) {
        const lx = light.x * w, ly = light.y * h
        const lr = light.r * Math.max(w, h)
        const pulse = 0.8 + Math.sin(t * 0.5 + light.x * 10) * 0.2
        const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr)
        const [r, g, b] = light.color
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${light.intensity * pulse})`)
        grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${light.intensity * pulse * 0.4})`)
        grad.addColorStop(0.7, `rgba(${r * 0.5}, ${g * 0.3}, ${b * 0.2}, ${light.intensity * pulse * 0.1})`)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      // Mouse-reactive glow
      const mx = smoothMx * w, my = smoothMy * h
      const mr = 0.2 * Math.max(w, h)
      const mGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mr)
      mGrad.addColorStop(0, 'rgba(255, 87, 51, 0.06)')
      mGrad.addColorStop(0.4, 'rgba(255, 87, 51, 0.02)')
      mGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = mGrad
      ctx.fillRect(0, 0, w, h)

      // Faint court lines
      ctx.strokeStyle = 'rgba(255, 120, 60, 0.025)'
      ctx.lineWidth = 1

      ctx.beginPath()
      ctx.moveTo(w * 0.5, 0)
      ctx.lineTo(w * 0.5, h)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(w * 0.5, h * 0.5, Math.min(w, h) * 0.15, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, h * 0.5, Math.min(w, h) * 0.35, -0.8, 0.8)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(w, h * 0.5, Math.min(w, h) * 0.35, Math.PI - 0.8, Math.PI + 0.8)
      ctx.stroke()

      ctx.globalCompositeOperation = 'source-over'

      // Vignette
      const vigGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.15, w * 0.5, h * 0.5, w * 0.75)
      vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vigGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)')
      vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0.6)')
      ctx.fillStyle = vigGrad
      ctx.fillRect(0, 0, w, h)

      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          imageRendering: 'auto',
        }}
      />
      {/* Grain via CSS — static texture, zero CPU cost */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity: 0.4,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  )
}
