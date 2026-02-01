import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './ChapterMenu.module.scss'
import { DropDownButton } from '../components/DropDownButton'
import { MenuList, chaptersMenuList, routes } from '../constants'
import useAppData from '../hooks/useAppData'
import useFunctions from '../hooks/useFunctions'
import { PageMenuType } from '../helper/types'

const ChapterMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div
    className={styles.chapterMenuContainer}
  >
    <DropDownButton
      text='Chapters'
      isActive={isActive}
      toggleActive={() => handleShowChapterList()}
    />
    <ChapterMenuPanel visible={isActive} />
  </div>
}
export default ChapterMenu


interface ChapterMenuPanelProps {
  visible: boolean
}
const ChapterMenuPanel = ({ visible }: ChapterMenuPanelProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { curMenu, setCurMenu, availableMenuList } = useAppData()
  const { updatePageFromMenu } = useFunctions()

  // Determine current menu based on URL path
  const getCurrentMenuFromPath = () => {
    const path = location.pathname
    
    // Check Acids & bases routes
    if (path.includes('/acids/introduction') || path === routes.introduction.path) return 'introduction'
    if (path.includes('/acids/buffers') || path === routes.buffers.path) return 'buffers'
    if (path.includes('/acids/titration') || path === routes.titration.path) return 'titration'
    
    // Check Reaction rates routes - use context curMenu
    if (path.includes('/reaction/') || path === '/' || path === routes.zero.path) {
      return curMenu
    }
    
    return curMenu
  }

  const currentMenu = getCurrentMenuFromPath()

  const subItemsList = chaptersMenuList.map(menu => menu.subItems?.map(sub => sub.value) || [])
  const pageMenuIndex = subItemsList.findIndex(item => item.includes(currentMenu))

  const [openedMenuIndex, setOpenedMenuIndex] = useState(pageMenuIndex >= 0 ? pageMenuIndex : -1)

  // Auto-expand current section when path changes
  useEffect(() => {
    const newIndex = subItemsList.findIndex(item => item.includes(currentMenu))
    if (newIndex >= 0) {
      setOpenedMenuIndex(newIndex)
    }
  }, [location.pathname, currentMenu])

  const handleMenuItemClick = (menuItemIndex: any) => {
    let update: number
    if (menuItemIndex === openedMenuIndex) update = -1
    else update = menuItemIndex
    setOpenedMenuIndex(update)
  }
  
  const handleSubItemClick = (subItem: any) => {
    const itemValue = subItem.value
    
    // For Acids & bases pages, navigate directly
    if (itemValue === 'introduction' || itemValue === 'buffers' || itemValue === 'titration') {
      const path = routes[itemValue as keyof typeof routes]?.path
      if (path) {
        navigate(path)
      }
    } else {
      // For Reaction rates and other pages, check if path exists in routes
      const path = routes[itemValue as keyof typeof routes]?.path
      if (path) {
        navigate(path)
      } else {
        // Fallback to context-based navigation
        updatePageFromMenu(itemValue)
      }
    }
  }

  return <div className={`${styles.chapterMenuPanel} ${visible ? styles.activeChapterPanel : ''}`}>
    {chaptersMenuList.map((menuItem, menuIndex) => {
      return <div
        key={menuIndex}
        className={styles.menuItem}
      >
        <DropDownButton
          text={menuItem.title}
          isActive={openedMenuIndex === menuIndex}
          toggleActive={() => handleMenuItemClick(menuIndex)}
        />

        <div className={`${styles.menuItemPanel} ${openedMenuIndex === menuIndex ? styles.activeMenuItemPane : ''}`}>
          {menuItem.subItems?.map(subItem => {
            const isActiveSubItem = currentMenu === subItem.value
            
            // For Reaction rates - always enable navigation (no need to check availableMenuList for navigation)
            // For Acids & bases - always enable
            const isAcidsBasesItem = ['introduction', 'buffers', 'titration'].includes(subItem.value)
            const isReactionRatesItem = ['zero', 'first', 'second', 'comparison', 'kinetics'].includes(subItem.value)
            const isDisabled = (isAcidsBasesItem || isReactionRatesItem) ? false : true
            
            return <button
              key={subItem.value}
              className={`${styles.subItem} ${isActiveSubItem ? styles.activeSubItem : ''}`}
              onClick={() => handleSubItemClick(subItem)}
              disabled={isDisabled}
            >
              {subItem.title}
            </button>
          })}
        </div>
      </div>
    })}
    <span />
    {/* <p>This is Chapter Menu Panel</p> */}
  </div>
}