"use client"

import { useState, useEffect, useRef } from "react"

export default function SmoothFollower() {
  const mousePosition = useRef({ x: 0, y: 0 })

  const dotPosition = useRef({ x: 0, y: 0 })
  const borderDotPosition = useRef({ x: 0, y: 0 })

  const [renderPos, setRenderPos] = useState({ dot: { x: 0, y: 0 }, border: { x: 0, y: 0 } })
  const [isHovering, setIsHovering] = useState(false)

  const DOT_SMOOTHNESS = 0.2
  const BORDER_DOT_SMOOTHNESS = 0.1

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const interactiveSelector = "a, button, img, input, textarea, select"

    // Delegated on document (rather than querySelectorAll + per-element
    // listeners) so elements that mount after this effect runs - e.g.
    // scroll/whileInView-revealed content - are still picked up, since the
    // selector is checked at event time instead of once on mount.
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) setIsHovering(true)
    }
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element
      const related = e.relatedTarget as Element | null
      if (target.closest(interactiveSelector) && !related?.closest(interactiveSelector)) {
        setIsHovering(false)
      }
    }

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    // Animation function for smooth movement
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS)
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS)

      borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS)
      borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS)

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
      })

      requestAnimationFrame(animate)
    }

    // Start animation loop
    const animationId = requestAnimationFrame(animate)

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)

      cancelAnimationFrame(animationId)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        className="absolute rounded-full dark:bg-white bg-black "
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      <div
        className="absolute rounded-full border dark:border-white border-black "
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </div>
  )
}
