import { ReactNode, useEffect, useState } from "react"
import Swal from 'sweetalert2'
import useAppData from "../hooks/useAppData"

interface AcidsBasesLayoutProps {
  children: ReactNode
}

/**
 * AcidsBasesLayout - Wrapper component that scales content to fit any screen.
 * Uses the same strategy as CommonLayout for ReactionRates:
 * - Fixed content size designed for desktop
 * - CSS transform scale() to fit smaller screens
 * - Portrait mode warning for mobile devices
 */
const AcidsBasesLayout = ({ children }: AcidsBasesLayoutProps) => {
  const { scrollable } = useAppData()
  const isIOS =
    typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

  // Design size - the content is designed for this resolution
  // Added extra 140px width for mascot overflow on the right
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

    // Manage body scrolling and touch actions
    if (scrollable.current) {
      document.body.style.overflow = 'auto'
      document.body.style.touchAction = 'pan-y'
    } else {
      document.body.style.overflow = isIOS ? 'auto' : 'hidden'
      document.body.style.touchAction = isIOS ? 'manipulation' : 'none'
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'manipulation'
    }
  }, [scrollable.current, children, isIOS])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        height: scrollable.current ? 'auto' : '100vh',
        width: '100vw',
        justifyContent: 'flex-start',
        overflowX: 'hidden',
        overflowY: scrollable.current || isIOS ? 'auto' : 'hidden',
        background: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isIOS ? 'flex-start' : 'center',
          justifyContent: 'flex-start',
          width: '100%',
          minHeight: '100vh',
          height: scrollable.current ? 'auto' : '100%',
          overflow: scrollable.current ? 'visible' : 'hidden',
        }}
      >
        {isIOS ? (
          /* iOS path: zoom in normal flow (no position:absolute).
           * zoom scales both visual output AND layout contribution,
           * so children correctly inherit the pre-zoom dimensions
           * (1420×780) for their h-full / flex calculations, while
           * the element takes up scaled space in the parent flow. */
          <div
            style={{
              width: `${contentSize.width}px`,
              height: scrollable.current ? 'auto' : `${contentSize.height}px`,
              minHeight: `${contentSize.height}px`,
              transformOrigin: 'top left',
              ...(scale ? { zoom: scale } : {}),
            }}
          >
            {children}
          </div>
        ) : (
          /* Non-iOS path: transform:scale with absolute positioning.
           * transform doesn't affect layout, so we need a wrapper
           * sized to the scaled dimensions. */
          <div
            style={{
              width: `${contentSize.width * (scale || 1)}px`,
              height: scrollable.current ? 'auto' : `${contentSize.height * (scale || 1)}px`,
              minHeight: `${contentSize.height * (scale || 1)}px`,
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${contentSize.width}px`,
                height: scrollable.current ? 'auto' : `${contentSize.height}px`,
                minHeight: `${contentSize.height}px`,
                position: 'absolute',
                top: 0,
                left: 0,
                transformOrigin: 'top left',
                ...(scale ? {
                  transform: `scale(${scale})`,
                  WebkitTransform: `scale(${scale})`,
                  MozTransform: `scale(${scale})`,
                  msTransform: `scale(${scale})`,
                } : {}),
              }}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcidsBasesLayout
