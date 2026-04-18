import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const dotsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDots()
    }

    const initDots = () => {
      const spacing = 60
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1
      dotsRef.current = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsRef.current.push({ x: c * spacing, y: r * spacing })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current
      const radius = 120

      dotsRef.current.forEach(({ x, y }) => {
        const dx = mouse.x - x
        const dy = mouse.y - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - dist / radius)
        const size = 1 + proximity * 2
        const alpha = 0.15 + proximity * 0.5

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      })
    }

    let isVisible = true

    const loop = () => {
      if (isVisible) {
        draw()
        animationRef.current = requestAnimationFrame(loop)
      }
    }

    const onVisibilityChange = () => {
      isVisible = !document.hidden
      if (isVisible) loop()
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    resize()
    loop()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  )
}
