import { useEffect, useState } from 'react'
import styles from './NavMenu.module.scss'
import IconZeroOrder from '../assets/ReactionRates/navpanel/zeroordericon@3x.png'
import IconZeroOrderPressed from '../assets/ReactionRates/navpanel/zeroordericon-pressed@3x.png'
import IconFirstOrder from '../assets/ReactionRates/navpanel/firstordericon@3x.png'
import IconFirstOrderPressed from '../assets/ReactionRates/navpanel/firstordericon-pressed@3x.png'
import IconSecondOrder from '../assets/ReactionRates/navpanel/secondordericon@3x.png'
import IconSecondOrderPressed from '../assets/ReactionRates/navpanel/secondordericon-pressed@3x.png'
import IconComparison from '../assets/ReactionRates/navpanel/comparisonicon@3x.png'
import IconComparisonPressed from '../assets/ReactionRates/navpanel/comparisonicon-pressed@3x.png'
import IconKinetics from '../assets/ReactionRates/navpanel/kineticsicon@3x.png'
import IconKineticsPressed from '../assets/ReactionRates/navpanel/kineticsicon-pressed@3x.png'
import IconCircle from '../assets/ReactionRates/navpanel/circle.png'
import IconMessage from '../assets/ReactionRates/navpanel/message.png'
import IconShare from '../assets/ReactionRates/navpanel/share.png'
import IconInfomation from '../assets/ReactionRates/navpanel/information.png'
import ImgPanelBk from '../assets/ReactionRates/navpanel/navpan1.png'

import { useLocation, useNavigate } from 'react-router-dom'
import { MenuList, MenuOrder, routes } from '../constants'
import SvgQuiz from '../components/Icons/SvgQuiz'
import SvgArchive from '../components/Icons/SvgArchive'
import useAppData from '../hooks/useAppData'
import useFunctions from '../hooks/useFunctions'
import useTestFunc from '../hooks/useTestFunc'
import PanelShape from '../components/CanvasNavPanel'

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    // console.log({ showMenu })
    setShowMenu(v => !v)
  }
  return <div className={styles.menuContainer} id='menuContainer'>
    <div
      className={`${styles.menuIcon} ${showMenu ? styles.active : ''}`}
      onClick={() => toggleMenu()}
    >
      <div /><div /><div />
    </div>

    <NavPanel visible={showMenu} onClose={() => setShowMenu(false)} />
  </div>
}
export default NavMenu

// type AvailableMenuStatus = {
//   [x in MenuList]: boolean
// }

interface NavPanelProps {
  visible: boolean
  onClose: () => void
}
const NavPanel = ({ visible = false, onClose }: NavPanelProps) => {
  let location = useLocation()
  const { curMenu, setCurMenu, availableMenuList, count } = useAppData()
  const { updatePageFromMenu, initializePage, handleTest } = useFunctions()
  // const { handleTest } = useTestFunc()
  useEffect(() => {
    // console.log({ location })

    const menuNames = Object.keys(routes) as MenuList[]
    const curRouteMenu = menuNames.find(item => routes[item].path === location.pathname)
    if (!curRouteMenu) return
    setCurMenu(curRouteMenu)

    if (location.pathname === routes[MenuList.zero].path) {
      setCurMenu(MenuList.zero)
    } else if (location.pathname === routes[MenuList.first].path) {
      setCurMenu(MenuList.first)
    } else if (location.pathname === routes[MenuList.second].path) {
      setCurMenu(MenuList.second)
    } else if (location.pathname === routes[MenuList.comparison].path) {
      setCurMenu(MenuList.comparison)
    } else if (location.pathname === routes[MenuList.kinetics].path) {
      setCurMenu(MenuList.kinetics)
    }
  }, [location.pathname])
  useEffect(() => {
    initializePage(curMenu)
  }, [curMenu])
  const handleMenuItemClick = (menu: MenuList) => {
    // console.log('===handleMenuItemClick===')
    // console.log({ availableMenuList, menu })
    // console.log('isavailable menu; ', availableMenuList.includes(menu))
    updatePageFromMenu(menu, true)
  }

  return <div className={`${styles.navPanel} ${visible ? styles.active : ''}`}>
    
    <div className={styles.navPanBk}>
      <img
        src={ImgPanelBk}
        width={705}
        height={440}
      />
    </div>
    {/* <PanelShape
      tabWidth={60}
      tabHeight={60}
      cornerRadius={20}
    /> */}
    <div
      className={`${styles.closeIcon}`}
      onClick={() => onClose()}
    >
      <div /><div /><div />
    </div>

    <div className={styles.navContent}>
      <div className={styles.navLinks}>

        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconCircle}
          alt='IconKinetics'
          onClick={() => {
            handleMenuItemClick(MenuList.kinetics)
          }}
        />
        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconShare}
          alt='IconKinetics'
          onClick={() => {
            handleMenuItemClick(MenuList.kinetics)
          }}
        />
        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconMessage}
          alt='IconKinetics'
          onClick={() => {
            handleMenuItemClick(MenuList.kinetics)
          }}
        />
        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconInfomation}
          alt='IconKinetics'
          onClick={() => {
            handleMenuItemClick(MenuList.kinetics)
          }}
        />
      </div>
      <div className={styles.navMenus}>
        <div className={styles.navMenuItem}>
          <img
            className={`
              ${styles.imgChapter}
            `}
            src={curMenu === MenuList.zero ? IconZeroOrderPressed : IconZeroOrder}
            alt='IconZero'
            onClick={() => {
              handleMenuItemClick(MenuList.zero)
            }}
          />
          <div onClick={() => {
            handleMenuItemClick(MenuList.zeroQuiz)
          }}>
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.zeroQuiz}
            />
          </div>
          <div onClick={() => {
            updatePageFromMenu(MenuList.zeroReview)
          }}>
            <SvgArchive
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.zeroReview}
            />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={`
              ${styles.imgChapter}
            `}
            src={curMenu === MenuList.first ? IconFirstOrderPressed : IconFirstOrder}
            alt='IconFirst'
            onClick={() => {
              handleMenuItemClick(MenuList.first)
            }}
          />
          <div onClick={() => {
            handleMenuItemClick(MenuList.firstQuiz)
          }}>
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.firstQuiz}
            />
          </div>
          <div onClick={() => {
            updatePageFromMenu(MenuList.firstReview)
          }}>
            <SvgArchive
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.firstReview}
            />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={`
              ${styles.imgChapter}
            `}
            src={curMenu === MenuList.second ? IconSecondOrderPressed : IconSecondOrder}
            alt='IconSecond'
            onClick={() => {
              handleMenuItemClick(MenuList.second)
            }}
          />
          <div onClick={() => {
            handleMenuItemClick(MenuList.secondQuiz)
          }}>
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.secondQuiz}
            />
          </div>
          <div onClick={() => {
            updatePageFromMenu(MenuList.secondReview)
          }}>
            <SvgArchive
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.secondReview}
            />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={`
              ${styles.imgChapter}
            `}
            src={curMenu === MenuList.comparison ? IconComparisonPressed : IconComparison}
            alt='IconComparison'
            onClick={() => {
              handleMenuItemClick(MenuList.comparison)
            }}
          />
          <div onClick={() => {
            handleMenuItemClick(MenuList.comparisonQuiz)
          }}>
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.comparisonQuiz}
            />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={`
              ${styles.imgChapter}
            `}
            src={curMenu === MenuList.kinetics ? IconKineticsPressed : IconKinetics}
            alt='IconKinetics'
            onClick={() => {
              handleMenuItemClick(MenuList.kinetics)
            }}
          />
          <div onClick={() => {
            handleMenuItemClick(MenuList.kineticsQuiz)
          }
          }>
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.kineticsQuiz}
            />
          </div>
          <div onClick={() => {
            updatePageFromMenu(MenuList.kineticsReview)
          }}>
            <SvgArchive
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === MenuList.kineticsReview}
            />
          </div>
        </div>
      </div>
    </div>

    {/* <button onClick={() => handleTEST()}>TEST HERE</button> */}

  </div>
}