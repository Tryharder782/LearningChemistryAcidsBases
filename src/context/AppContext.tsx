import { createContext, useEffect, useRef, useState } from "react"
import { MenuList, initDots, routes, themeColors } from "../constants"
import { PageMenuType } from "../helper/types"

interface IAppContext {

  // --- Description --- availableMenuList
  // available course(menu) list.
  availableMenuList: MenuList[],
  // setAvailableMenuList: React.Dispatch<React.SetStateAction<MenuList[]>>,
  setAvailableMenuList: (val: MenuList[]) => void,

  // --- Description --- curMenu
  // menu name for opened page.
  curMenu: MenuList,
  setCurMenu: React.Dispatch<React.SetStateAction<MenuList>>,
  // --- Description --- curStep
  // current tutorial step for opened page.
  curStep: number,
  setCurStep: React.Dispatch<React.SetStateAction<number>>,

  // --- Description --- concentrationAB
  // ; minValue = 0, maxValue = 100
  // A: concentrationAB[0],  B: concentrationAB[1]    A > B
  valuesC: (number)[],
  setValuesC: React.Dispatch<React.SetStateAction<(number)[]>>,

  // --- Description --- reactionTime
  // ; minValue = 0, maxValue = 20
  // A: reactionTime[0],     B: reactionTime[1]       A < B
  valuesT: number[],
  setValuesT: React.Dispatch<React.SetStateAction<number[]>>,

  // animation time frame
  timeframe: number,
  setTimeframe: React.Dispatch<React.SetStateAction<number>>,

  // *** canvas Time actions
  // setPlayAnimation: React.Dispatch<React.SetStateAction<boolean>>,
  canvaTimeState: number,
  setCanvaTimeState: React.Dispatch<React.SetStateAction<number>>,
  canvaTimeSliderT: number[]
  setCanvaTimeSliderT: React.Dispatch<React.SetStateAction<number[]>>,
  canvaTimeSliderC: number[]
  setCanvaTimeSliderC: React.Dispatch<React.SetStateAction<number[]>>,

  // *** canvas Beaker actions
  canvaBeakerState: number,
  setCanvaBeakerState: React.Dispatch<React.SetStateAction<number>>,
  beakerDots: React.MutableRefObject<number[]>
  beakerDotsEnd: React.MutableRefObject<number[]>
  // *** canvas Beaker A/B dot colors 
  // beakerDotColorList: string[][],
  // setBeakerDotColorList: React.Dispatch<React.SetStateAction<string[][]>>,

  // *** Choose menu value - 0: 'A to B', 1: 'C to D', 2: 'E to F'
  isEnableChooseMenu: boolean,
  setIsEnableChooseMenu: React.Dispatch<React.SetStateAction<boolean>>,
  activeDotIndex: number,   // need init action
  setActiveDotIndex: React.Dispatch<React.SetStateAction<number>>,

  // *** Catalyst state controller
  catalystItemStates: number[],   // need init action
  setCatalystItemStates: React.Dispatch<React.SetStateAction<number[]>>,

  // test purpose
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,

  // drag n drop hover color
  hoverOrder: number,
  setHoverOrder: React.Dispatch<React.SetStateAction<number>>,

  dragOrder: number,
  setDragOrder: React.Dispatch<React.SetStateAction<number>>,

  // hover Status
  isOver: boolean,
  setIsOver: React.Dispatch<React.SetStateAction<boolean>>,


  scrollable: React.MutableRefObject<boolean>,

  indicatorStep: number,
  setIndicatorStep: React.Dispatch<React.SetStateAction<number>>,

  dragConcentration: number,
  setDragConcentration: React.Dispatch<React.SetStateAction<number>>,

  dragTime: number,
  setDragTime: React.Dispatch<React.SetStateAction<number>>,

  spinValueT: number,
  setSpinValueT: React.Dispatch<React.SetStateAction<number>>,
}

const initialState = {
  count: 0,

  stepPlay: 0,
  concentration: [70, 35],
  reactionTime: [10, 15],

  // animation time frame (0-100)
  timeframe: 0,

  // *** canvas Time graph
  // playAnimation: false,
  canvaTimeState: 0, // 0: frame, 1: show graph, 2: animation, 3: show end

  // 0: hidden, 1: disabled, 2: active
  canvaTimeSliderC: [2, 0],
  canvaTimeSliderT: [2, 0],

  // *** canvas Beaker
  canvaBeakerState: 0, // 0: empty, 1: show one, 2: animation, 3: show two
  beakerDots: initDots,
  // beakerDotColorList: [
  //   [themeColors.none, themeColors.A, themeColors.B], // A to B
  //   [themeColors.none, themeColors.C, themeColors.D], // C to D
  //   [themeColors.none, themeColors.E, themeColors.F], // E to F
  // ],
  catalystItemStates: [3, 2, 2],
  activeDotIndex: 0
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props

  // test purpose
  const [count, setCount] = useState<number>(props.count || initialState.count || 0)

  // ** available course (menu) list in order by
  const [availableMenuList, setAvailableMenuList1] = useState<MenuList[]>([])
  const setAvailableMenuList = (val: MenuList[]) => {
    // console.log('===setAvailableMenuList===')
    // console.log({ val })
    setAvailableMenuList1(val)
  }

  // ** use Menu, Step to manage page
  const [curMenu, setCurMenu] = useState<MenuList>(MenuList.zero)
  const [curStep, setCurStep] = useState(props.stepMotion || initialState.stepPlay || 0)

  // ** animation time frame (0-100)
  const [timeframe, setTimeframe] = useState<number>(initialState.timeframe)

  // 0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  const [canvaTimeState, setCanvaTimeState] = useState<number>(initialState.canvaTimeState)

  // [0-100, 0-100]
  const [valuesC, setValuesC] = useState<(number)[]>(initialState.concentration)
  // [0-20, 0-20]
  const [valuesT, setValuesT] = useState<number[]>(initialState.reactionTime)
  // [0-2, 0-2]       0: hidden, 1: disabled, 2: show
  const [canvaTimeSliderC, setCanvaTimeSliderC] = useState<number[]>(initialState.canvaTimeSliderC)
  // [0-2, 0-2]       0: hidden, 1: disabled, 2: show
  const [canvaTimeSliderT, setCanvaTimeSliderT] = useState<number[]>(initialState.canvaTimeSliderT)

  // 0: empty, 1: show one, 2: animation, 3: show two
  const [canvaBeakerState, setCanvaBeakerState] = useState<number>(initialState.canvaBeakerState)

  // [0, 1, 2, 0, 2, ...]            0: none, 1: A, 2: B
  const beakerDots = useRef<number[]>(initialState.beakerDots)
  const beakerDotsEnd = useRef<number[]>(initialState.beakerDots)

  // themeColors[][]
  // const [beakerDotColorList, setBeakerDotColorList] = useState<string[][]>(initialState.beakerDotColorList)

  // 0: A to B, 1: C to D, 2: E to F
  const [isEnableChooseMenu, setIsEnableChooseMenu] = useState<boolean>(true)
  const [activeDotIndex, setActiveDotIndex] = useState<number>(initialState.activeDotIndex)

  // 0: hidden, 1: moveable, 2: menu item disabled, 3: menu item active
  const [catalystItemStates, setCatalystItemStates] = useState(initialState.catalystItemStates)

  const [hoverOrder, setHoverOrder] = useState(0)
  const [dragOrder, setDragOrder] = useState(0)
  const [isOver, setIsOver] = useState(false)
  const [indicatorStep, setIndicatorStep] = useState<number>(-1)
  const [dragConcentration, setDragConcentration] = useState(0)
  const [dragTime, setDragTime] = useState(0)
  const scrollable = useRef<boolean>(false)

  const [spinValueT, setSpinValueT] = useState<number>(0.5)

  // need update, don't use yet
  const updateStepPlay = (step: number) => {
    let update = curStep + step
    if (update < 0) update = 0
    else if (update > 5) update = 5
    setCurStep(update)
  }

  return (
    <AppContext.Provider
      value={{
        availableMenuList,
        setAvailableMenuList,
        curMenu,
        setCurMenu,
        curStep,
        setCurStep,
        // updateStepPlay,
        valuesC,
        setValuesC,
        valuesT,
        setValuesT,
        // playAnimation,
        // setPlayAnimation,

        // ** controllers - Time Canvas
        canvaTimeState,
        setCanvaTimeState,
        canvaTimeSliderT,
        setCanvaTimeSliderT,
        canvaTimeSliderC,
        setCanvaTimeSliderC,

        // ** controllers - Energy Canvas
        canvaBeakerState,
        setCanvaBeakerState,
        beakerDots,
        beakerDotsEnd,
        // beakerDotColorList,
        // setBeakerDotColorList,

        // ** animation Time change status (1-100)
        timeframe,
        setTimeframe,

        // ** Choose Menu - 0: 'A to B', ...
        isEnableChooseMenu,
        setIsEnableChooseMenu,
        activeDotIndex,
        setActiveDotIndex,

        // Catalyst State Controller
        catalystItemStates,
        setCatalystItemStates,

        // test purpose
        count, setCount,
        // drag n drop hover color
        hoverOrder, setHoverOrder,
        // hover Status
        isOver, setIsOver,
        dragOrder, setDragOrder,

        scrollable,

        indicatorStep, setIndicatorStep,
        dragConcentration, setDragConcentration,
        dragTime, setDragTime,

        spinValueT: spinValueT,
        setSpinValueT: setSpinValueT,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext