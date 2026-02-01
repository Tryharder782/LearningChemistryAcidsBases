import { ReactNode, useEffect, useRef, useState } from "react"
import styles from './CommonLayout.module.scss'
import NavMenu from "./NavMenu"
import useAppData from "../hooks/useAppData"
import { MenuList, routes } from "../constants"
import Swal from 'sweetalert2'


interface CommonLayoutProps {
  children: ReactNode,
}

const chapterMenu = [MenuList.zero, MenuList.first, MenuList.second, MenuList.comparison, MenuList.kinetics] as string[]
// const chooseMenu = [MenuList.zero, MenuList.first, MenuList.second, MenuList.comparison, MenuList.kinetics] as string[]
// const watchMenu = [MenuList.zero, MenuList.first, MenuList.second, MenuList.comparison, MenuList.kinetics] as string[]
const quizMenus = [MenuList.zeroQuiz, MenuList.firstQuiz, MenuList.secondQuiz, MenuList.comparisonQuiz, MenuList.kineticsQuiz] as string[]

const CommonLayout = ({
  children,
}: CommonLayoutProps) => {
  const contentSize = { width: 1150, height: 650 }
  const { curMenu, scrollable } = useAppData()
  const isQuiz = routes[curMenu].type === 'quiz'
  // console.log({ isQuiz, curMenu, curMenuType: routes[curMenu].type })
  const scaleX = window.innerWidth / contentSize.width
  const scaleY = window.innerHeight / contentSize.height
  const [scale, setScale] = useState<number | undefined>(Math.min(scaleX, scaleY))

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      if (innerWidth < 1150 || innerHeight < contentSize.height) {
        const scaleX = innerWidth / contentSize.width
        const scaleY = innerHeight / contentSize.height
        setScale(Math.min(scaleX, scaleY))
        // if (scaleX < scaleY) setScale((scaleX + scaleY) * 0.38)  
      } else {
        setScale(undefined)
      }

      // Alert portrait
      if (innerWidth < innerHeight) {
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

    function preventBehavior(e: { preventDefault: () => void }) {
      if (scrollable.current) return
      // e.preventDefault(); 
    };

    // document.addEventListener("touchmove", preventBehavior, {passive: false});
    return () => {
      window.removeEventListener('resize', handleResize)
      // document.addEventListener("touchmove", preventBehavior, {passive: false});
    }
  }, [])

  return <div className={styles.layout}>
    <div className={styles.wrapper}>
      <div
        style={{
          padding: '0 30px',
          // transform: `scale(${scaleX})`,
          ...(scale ? {
            // zoom: `${scale}`,
            // transformOrigin: 0,
            msTransform: `scale(${scale})`, /* IE 9 */
            // '-ms-transform-origin': '0 0',
            MozTransform: `scale(${scale})`, /* Firefox */
            // '-moz-transform-origin': '0 0',
            OTransform: `scale(${scale})`, /* Opera */
            // '-o-transform-origin': '0 0',
            WebkitTransform: `scale(${scale})`, /* Safari And Chrome */
            // '-webkit-transform-origin': '0 0',
            WebkitTransformOriginY: 0,
          } : {}),
        }}
      >
        {/* <span>{window.innerWidth}</span> and       fasdfasdfdsfds
        <span>{scale}</span> -
        <span>{window.innerHeight / 720}</span> */}
        {isQuiz && <div className={styles.navMenuDivider} />}
        <div className={styles.container}>
          <NavMenu />
          {/* {showChapterMenu && <ChapterMenu />} */}
          {/* {showChooseMenu && <ChooseMenu />} */}
          {/* {showWatchMenu && <WatchMenu />} */}
          {/* <p>This is CommonLayout</p> */}
          {children}
        </div>
      </div>
    </div>
  </div>
}

export default CommonLayout