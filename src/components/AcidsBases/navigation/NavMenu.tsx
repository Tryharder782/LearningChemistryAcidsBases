import { useEffect, useState } from 'react'
import styles from './NavMenu.module.scss'
import IconCircle from '../../../assets/ReactionRates/navpanel/circle.png'
import IconMessage from '../../../assets/ReactionRates/navpanel/message.png'
import IconShare from '../../../assets/ReactionRates/navpanel/share.png'
import IconInfomation from '../../../assets/ReactionRates/navpanel/information.png'
import ImgPanelBk from '../../../assets/ReactionRates/navpanel/navpan1.png'
import IconIntroduction from '../../../assets/ui/introduction.png'
import IconIntroductionPressed from '../../../assets/ui/introduction-pressed.png'
import IconBuffer from '../../../assets/ui/buffer.png'
import IconBufferPressed from '../../../assets/ui/buffer-pressed.png'
import IconTitration from '../../../assets/ui/titration.png'
import IconTitrationPressed from '../../../assets/ui/titration-pressed.png'

import { useLocation, useNavigate } from 'react-router-dom'
import { routes, MenuList } from '../../../constants'
import SvgQuiz from '../../Icons/SvgQuiz'

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
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

interface NavPanelProps {
  visible: boolean
  onClose: () => void
}
const NavPanel = ({ visible = false, onClose }: NavPanelProps) => {
  let location = useLocation()
  const navigate = useNavigate()

  const [curMenu, setCurMenu] = useState<string>('introduction')

  useEffect(() => {
    const menuNames = Object.keys(routes) as (keyof typeof routes)[]
    const curRouteMenu = menuNames.find(item => routes[item].path === location.pathname)
    if (curRouteMenu) {
      setCurMenu(curRouteMenu)
    }
  }, [location.pathname])

  const handleMenuItemClick = (menu: string) => {
    const targetRoute = routes[menu as keyof typeof routes]
    if (targetRoute) {
      navigate(targetRoute.path)
    }
    onClose()
  }

  return <div className={`${styles.navPanel} ${visible ? styles.active : ''}`}>

    <div className={styles.navPanBk}>
      <img
        src={ImgPanelBk}
        width={705}
        height={440}
      />
    </div>

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
          alt='IconCircle'
          onClick={() => {
            handleMenuItemClick('introduction')
          }}
        />
        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconShare}
          alt='IconShare'
          onClick={() => {
            handleMenuItemClick('introduction')
          }}
        />
        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconMessage}
          alt='IconMessage'
          onClick={() => {
            handleMenuItemClick('introduction')
          }}
        />
        <img
          className={`
              ${styles.imgInfo}
            `}
          src={IconInfomation}
          alt='IconInformation'
          onClick={() => {
            handleMenuItemClick('introduction')
          }}
        />
      </div>
      <div className={styles.navMenus}>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={(curMenu === 'introduction' || curMenu === 'introductionQuiz') ? IconIntroductionPressed : IconIntroduction}
            alt='Introduction'
            onClick={() => {
              handleMenuItemClick('introduction')
            }}
          />
          <div
            className={styles.quizIconWrapper}
            onClick={() => handleMenuItemClick('introductionQuiz')}
          >
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === 'introductionQuiz'}
            />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={(curMenu === 'buffers' || curMenu === 'buffersQuiz') ? IconBufferPressed : IconBuffer}
            alt='Buffer'
            onClick={() => {
              handleMenuItemClick('buffers')
            }}
          />
          <div
            className={styles.quizIconWrapper}
            onClick={() => handleMenuItemClick('buffersQuiz')}
          >
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === 'buffersQuiz'}
            />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={(curMenu === 'titration' || curMenu === 'titrationQuiz') ? IconTitrationPressed : IconTitration}
            alt='Titration'
            onClick={() => {
              handleMenuItemClick('titration')
            }}
          />
          <div
            className={styles.quizIconWrapper}
            onClick={() => handleMenuItemClick('titrationQuiz')}
          >
            <SvgQuiz
              fillColor={'rgb(68, 150, 247)'}
              width={40}
              height={40}
              isActive={curMenu === 'titrationQuiz'}
            />
          </div>
        </div>
      </div>
    </div>

  </div>
}
