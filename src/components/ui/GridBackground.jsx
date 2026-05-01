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
      const numColumns = Math.ceil(canvas.width / SPACING) + 1
      const numRows = Math.ceil(canvas.height / SPACING) + 1
      dotsRef.current = []
      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        for (let colIndex = 0; colIndex < numColumns; colIndex++) {
          dotsRef.current.push({ x: colIndex * SPACING, y: rowIndex * SPACING })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mouseX, y: mouseY } = mouseRef.current
      const PROXIMITY_RADIUS = 140
      const isDark = document.documentElement.classList.contains('dark')
      const dotRgb = isDark ? '255,255,255' : '0,0,0'

      for (const { x, y } of dotsRef.current) {
        const deltaX = mouseX - x
        const deltaY = mouseY - y
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const proximity = Math.max(0, 1 - distance / PROXIMITY_RADIUS)
        const alpha = (isDark ? 0.08 : 0.12) + proximity * 0.35
        const size = 0.8 + proximity * 1.6

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotRgb},${alpha})`
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
