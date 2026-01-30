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
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'flex-start',
        overflowX: 'visible',
        overflowY: scrollable.current ? 'auto' : 'hidden',
        background: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflowX: 'visible',
        }}
      >
        <div
          style={{
            width: `${contentSize.width}px`,
            height: `${contentSize.height}px`,
            position: 'relative',
            overflowX: 'visible',
            ...(scale ? {
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              WebkitTransform: `scale(${scale})`,
              WebkitTransformOrigin: 'top center',
              MozTransform: `scale(${scale})`,
              msTransform: `scale(${scale})`,
            } : {}),
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default AcidsBasesLayout
