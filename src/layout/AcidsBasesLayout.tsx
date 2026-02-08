import { ReactNode, useEffect, useRef, useState } from "react"
import Swal from 'sweetalert2'
import useAppData from "../hooks/useAppData"

interface AcidsBasesLayoutProps {
  children: ReactNode
}

/**
 * AcidsBasesLayout - Wrapper component that scales content to fit any screen.
 * Uses the SAME strategy as CommonLayout for ReactionRates:
 * - Fixed content size designed for desktop (1420×780)
 * - CSS transform scale() to fit smaller screens — ONE path for ALL platforms
 * - No zoom, no position:absolute, no body style manipulation
 * - Portrait mode warning for mobile devices
 */
const AcidsBasesLayout = ({ children }: AcidsBasesLayoutProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const contentSize = { width: 1420, height: 780 }

  const calculateScale = () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    if (innerWidth < contentSize.width || innerHeight < contentSize.height) {
      const scaleX = innerWidth / contentSize.width
      const scaleY = innerHeight / contentSize.height
      return Math.min(scaleX, scaleY)
    }
    return undefined
  }

  const [scale, setScale] = useState<number | undefined>(calculateScale)

  useEffect(() => {
    const handleResize = () => {
      setScale(calculateScale())

      // Alert portrait mode on mobile
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      if (innerWidth < innerHeight && innerWidth < 1024) {
        Swal.fire({
          title: 'Please use Landscape Mode!',
          text: 'For the best experience, please rotate your device to landscape mode.',
          icon: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          customClass: {
            confirmButton: 'swal-btn-ok'
          },
        })
      } else {
        Swal.close()
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // iOS Safari click synthesis fix: inside transform:scale(), click events
  // are not reliably synthesized from touch events when a pointer-events:none
  // overlay sits above the target in the stacking order. This polyfill
  // manually dispatches click on touchend for tap gestures (< 10px movement).
  useEffect(() => {
    const container = rootRef.current
    if (!container) return

    let touchStartPos: { x: number; y: number } | null = null

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1 || !touchStartPos) return
      const dx = e.changedTouches[0].clientX - touchStartPos.x
      const dy = e.changedTouches[0].clientY - touchStartPos.y
      const moved = Math.sqrt(dx * dx + dy * dy)
      touchStartPos = null
      if (moved > 10) return // Not a tap — scroll or drag

      const el = e.target as HTMLElement
      const btn = el.closest('button, a, [role="button"]') as HTMLElement | null
      if (btn) {
        e.preventDefault()   // Prevent broken native click synthesis
        btn.click()          // Fire click manually
      }
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: false })
    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transformOrigin: 'top center',
            ...(scale ? {
              transform: `scale(${scale})`,
              WebkitTransform: `scale(${scale})`,
              MozTransform: `scale(${scale})`,
              msTransform: `scale(${scale})`,
            } : {}),
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              width: `${contentSize.width}px`,
              height: `${contentSize.height}px`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcidsBasesLayout
