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
import { routes } from '../../../constants'

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
    if (location.pathname === routes.introduction.path) {
      setCurMenu('introduction')
    } else if (location.pathname === routes.buffers.path) {
      setCurMenu('buffers')
    } else if (location.pathname === routes.titration.path) {
      setCurMenu('titration')
    }
  }, [location.pathname])
  
  const handleMenuItemClick = (menu: 'introduction' | 'buffers' | 'titration') => {
    navigate(routes[menu].path)
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
            src={curMenu === 'introduction' ? IconIntroductionPressed : IconIntroduction}
            alt='Introduction'
            onClick={() => {
              handleMenuItemClick('introduction')
            }}
          />
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={curMenu === 'buffers' ? IconBufferPressed : IconBuffer}
            alt='Buffer'
            onClick={() => {
              handleMenuItemClick('buffers')
            }}
          />
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={curMenu === 'titration' ? IconTitrationPressed : IconTitration}
            alt='Titration'
            onClick={() => {
              handleMenuItemClick('titration')
            }}
          />
        </div>
      </div>
    </div>

  </div>
}
