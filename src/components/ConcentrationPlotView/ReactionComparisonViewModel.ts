import { ConcentrationBEquation, FirstOrderConcentration, SecondOrderConcentration, ZeroOrderConcentration } from "./ConcentrationEquation"

export interface ReactionInput {
  c1: number
  c2: number
  t1: number
  t2: number
}

export const ReactionComparisonDefaults = {
  c1: 1,
  c2: 0.1,
  time: 15,
  input: {
    c1: 1,
    c2: 0.1,
    t1: 0,
    t2: 20
  }
}

class ReactionComparisonViewModel {

  zeroOrderInput: ReactionInput
  firstOrderInput: ReactionInput
  secondOrderInput: ReactionInput


  constructor() {
    try {
      const zeroOrder = localStorage.getItem('zeroOrder')
      this.zeroOrderInput = zeroOrder ? JSON.parse(zeroOrder) as ReactionInput : ReactionComparisonDefaults.input
    } catch {
      this.zeroOrderInput = ReactionComparisonDefaults.input
    }
    try {
      const firstOrder = localStorage.getItem('firstOrder')
      this.firstOrderInput = firstOrder ? JSON.parse(firstOrder) : ReactionComparisonDefaults.input
    } catch {
      this.firstOrderInput = ReactionComparisonDefaults.input
    }
    try {
      const secondOrder = localStorage.getItem('secondOrder')
      this.secondOrderInput = secondOrder ? JSON.parse(secondOrder) : ReactionComparisonDefaults.input
    } catch {
      this.secondOrderInput = ReactionComparisonDefaults.input
    }
  }
  initParams(initInput: ReactionInput, order: number) {
    switch(order) {
      case 0: this.zeroOrderInput = initInput; break;
      case 1: this.firstOrderInput = initInput; break;
      case 2: this.secondOrderInput = initInput; break;
    }
  }

  // var navigation: NavigationModel<ReactionComparisonState>?

  // statement = [TextLine]()
  currentTime0?: number
  currentTime1?: number
  currentTime2?: number
  // highlightedElements = [ReactionComparisonScreenElement]()
  canDragOrders = false
  // correctOrderSelections = [ReactionOrder]()
  reactionHasEnded = false
  canStartAnimation = false

  showDragTutorial = false
  dragTutorialHandIsMoving = false
  dragTutorialHandIsComplete = false

  // let reactionOrdering: [ReactionOrder] = [.Zero, .First, .Second].shuffled()

  initialTime = 0

  // let moleculesA = MoleculeGridSettings.fullGrid.shuffled()

  // func addToCorrectSelection(order: ReactionOrder) {
  //     correctOrderSelections.append(order)
  // }

  // func next() {
  //     if !canClickNext {
  //         statement = ReactionComparisonStatements.blockClickingNextBeforeChoosingReactions
  //     } else {
  //         navigation?.next()
  //         if reactionHasEnded {
  //             persistence.setHasIdentifiedReactionOrders()
  //         }
  //     }
  // }

  // var canClickNext: Bool {
  //     let reactionIsRunning = currentTime0 != nil && reactionHasEnded == false
  //         let hasIdentifiedOrders = persistence.hasIdentifiedReactionOrders()
  //         let ordersHaveBeenSelected = correctOrderSelections.count == ReactionOrder.allCases.count
  //         let nextIsBlocked = reactionIsRunning && !hasIdentifiedOrders && !ordersHaveBeenSelected
  //         return !nextIsBlocked
  //     }

  //     func back() {
  //     navigation?.back()
  // }

  get finalTime0() {
    return this.zeroOrder.time(0.1)!
  }

  get finalTime1() {
    return this.firstOrder.time(0.1)!
  }

  get finalTime2() {
    return this.secondOrder.time(0.1)!
  }

  get zeroOrder() {
    const zeroOrderConcentration = new ZeroOrderConcentration()
    const k = zeroOrderConcentration.getRate(
      this.zeroOrderInput.t1,
      this.zeroOrderInput.c1,
      this.zeroOrderInput.t2,
      this.zeroOrderInput.c2
    )
    zeroOrderConcentration.init2Params(1, k)
    return zeroOrderConcentration
  }

  get firstOrder() {
    const firstOrderConcentration = new FirstOrderConcentration()
    const k = firstOrderConcentration.getRate(
      this.firstOrderInput.t1,
      this.firstOrderInput.c1,
      this.firstOrderInput.t2,
      this.firstOrderInput.c2
    )
    firstOrderConcentration.init2Params(1, k)
    return firstOrderConcentration
  }

  get secondOrder() {
    const secondOrderConcentration = new SecondOrderConcentration()
    const k = secondOrderConcentration.getRate(
      this.secondOrderInput.t1,
      this.secondOrderInput.c1,
      this.secondOrderInput.t2,
      this.secondOrderInput.c2
    )
    secondOrderConcentration.init2Params(1, k)
    return secondOrderConcentration
  }

  get zeroOrderB() {
    return this.concentrationB(this.zeroOrder, this.zeroOrderInput.c1)
  }

  get firstOrderB() {
    return this.concentrationB(this.firstOrder, this.firstOrderInput.c1)
  }

  get secondOrderB() {
    return this.concentrationB(this.secondOrder, this.secondOrderInput.c1)
  }

  concentrationB(concentrationA: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration, initialAConcentration: number) {
    return new ConcentrationBEquation(concentrationA, initialAConcentration)
  }

}

export { ReactionComparisonViewModel }