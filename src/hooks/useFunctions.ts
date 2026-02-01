import { useLocation, useNavigate } from "react-router-dom"
import { PageMenuType } from "../helper/types"
import useAppData from "./useAppData";
import { MenuList, MenuOrder, routes } from "../constants";
import { useHighLight } from "./useHighlight";
// should be exchanged as App context state
import { maxStep_Zero, tur_Hightlights } from "../pages/ReactionRates/zero/constants";
import { expressWithClass, getStorage, setStorage } from "../helper/functions";

const useFunctions = () => {
  const navigate = useNavigate()
  const {
    setCurMenu,
    curMenu,
    curStep,
    setCurStep,
    availableMenuList,
    setAvailableMenuList,
    setActiveDotIndex,
    setCount,
  } = useAppData()

  const initializePage = (menu: MenuList) => {
    console.log('===initializePage===')
    // update 'availableMenuList' in localStorage and context
    let update = getStorage('availableMenuList') as MenuList[] || []
    if (!update.includes(menu)) {
      update = [...update, menu]
      setStorage('availableMenuList', update)
    }
    // console.log({update})
    setAvailableMenuList(update)

    // Todo: initialize context status.
    setCurStep(0)
    setActiveDotIndex(0)
  }
  // check menu is in availableMenuList
  const checkMenuAvailable = (menu: MenuList) => {
    return availableMenuList.includes(menu)
  }
  // call when menu is clicked
  const updatePageFromMenu = (menu: MenuList, checkAvailableMenu: boolean = false) => {
    // console.log({menu}, {checkAvailableMenu})
    // initializePage(menu)
    if (checkAvailableMenu) {
      // console.log('check: ', !checkMenuAvailable(menu))
      if (!checkMenuAvailable(menu)) return
    }
    const path = routes[menu]?.path
    if (!path) {
      navigate('/')
      return
    }
    // setCurMenu(menu)
    navigate(path)
  }

  const handleTest = () => {
    setCount(v => v + 1)
  }

  // pageStep; -1: returns previous page menu, 1: returns next page menu
  const getNextMenu = (pageStep: number = 1) => {
    const curOrder = MenuOrder.findIndex(item => item === curMenu)
    if (curOrder < -1) return MenuOrder[0]
    let nextOrder = curOrder + pageStep
    if (nextOrder > MenuOrder.length) nextOrder = MenuOrder.length - 1
    else if (nextOrder < 0) nextOrder = 0
    return MenuOrder[nextOrder]
  }

  const updateWithVariable = () => {
    let update = ''
    
    return update
  }

  const convertExpToHtml = (exp: string | undefined) => {
    if (!exp) return
    let update = ''
    update = expressWithClass(exp, '__', 'sm-botom')
    update = expressWithClass(update, '^', 'sm-top')
    update = expressWithClass(update, '**', 'txt-red')
    return update
  }

  const returnValues = {
    initializePage,
    checkMenuAvailable,
    updatePageFromMenu,
    getNextMenu,
    handleTest,
  }
  return returnValues
}
export default useFunctions