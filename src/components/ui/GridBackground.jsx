import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const dotsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const SPACING = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildDots()
    }

    const buildDots = () => {
      const cols = Math.ceil(canvas.width / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      dotsRef.current = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsRef.current.push({ x: c * SPACING, y: r * SPACING })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current
      const R = 140

      for (const { x, y } of dotsRef.current) {
        const dx = mx - x
        const dy = my - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const prox = Math.max(0, 1 - dist / R)
        const alpha = 0.08 + prox * 0.35
        const size = 0.8 + prox * 1.6

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
    }

    let active = true

    const loop = () => {
      if (!active) return
      draw()
      animRef.current = requestAnimationFrame(loop)
    }

    const onVisibilityChange = () => {
      active = !document.hidden
      if (active) loop()
    }

    resize()
    loop()

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }, { passive: true })
    document.addEventListener('mouseleave', () => {
      mouseRef.current = { x: -9999, y: -9999 }
    })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      active = false
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-60"
        aria-hidden="true"
      />
    </>
  )
}
