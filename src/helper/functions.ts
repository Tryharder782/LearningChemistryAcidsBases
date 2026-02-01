
let h: any = 0
export function debounce<T extends (...args: any[]) => any>(cb: T, wait = 1000) {
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// This function converts array item values from 'value' into '!value'
//    change given count of random items.
// arr: example - [true, true, true, true, false, true]
// count: array item count to be converted.
// value: array item value to be converted.
// count = 2, value = true, then result : example - [false, true, true, false, false, true]
export const generateEnergyArray = (arr: any, percentage: any, originVal: number = 0, toVal: number = 1) => {
  const arrNum: number[] = []
  const res = [...arr]

  // // if toVal === 0 then fill other items with originVal(1).
  // if (toVal === 0) {
  //   res.forEach((item, index) => {
  //     if (item > 1) {
  //       res[index] = originVal
  //     }
  //   })
  // }

  let toCount = 0
  let originCount = 0
  res.forEach((item, index) => {
    if (item === originVal) {
      originCount++
    } else if (item === toVal) {
      toCount++
    }
  })
  const totalCount = originCount + toCount
  // console.log({ originCount, toCount, totalCount })
  const expectedCount = Math.floor(totalCount * (percentage / 100))
  // console.log({ percentage, expectedCount })
  
  const updateCount = expectedCount - toCount
  // console.log({originCount, toCount, percentage, expectedCount, updateCount})
  // const updateCount = count - fromCount

  // updatedArrIndexes: variable for debug purpose.
  const updatedArrIndexes: number[] = []

  if (updateCount < 0) {
    res.forEach((item, index) => {
      if (item === toVal) {
        arrNum.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrNum.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrNum.length)
      const n = arrNum.splice(rand, 1)[0]
      res[n] = originVal
      updatedArrIndexes.push(n)
    })
  } else if (updateCount > 0) {
    res.forEach((item, index) => {
      if (item === originVal) {
        arrNum.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrNum.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrNum.length)
      const n = arrNum.splice(rand, 1)[0]
      res[n] = toVal
      updatedArrIndexes.push(n)
    })
  }

  // updated index Array
  updatedArrIndexes.sort((a, b) => a - b)
  // console.log({ updatedArrIndexes })
  return {
    changedCount: updatedArrIndexes.length,
    items: res
  }
}

// debug purpose
export const energyBeforeAnimation = (arr: number[], percentage: number, originVal: number = 1) => {
  const res = [...arr]
  res.forEach((item, index) => {
    if (item > 0) res[index] = originVal
  })
  return res
}

export const getItemsRandomlyFromArray = (arr: any[], count?: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  const res = shuffled.slice(0, count ? count : shuffled.length)
  return res
}

// local storage functions
export const getStorage = (key: string) => {
  const res = localStorage.getItem(key)
  if (!res) return
  return JSON.parse(res)
}
export const setStorage = (key: string, val: any) => {
  const update = JSON.stringify(val)
  localStorage.setItem(key, update)
}

export const expressWithClass = (str: string, mark: string, className: string) => {
  const parts = str.split(mark)
  let final = parts[0]
  // console.log('expclass- aaa', { str, mark, parts, final })
  if (parts.length === 1) return final
  for (let i = 1; i < parts.length - 1; i++) {
    if (i % 2 === 1) {
      final += `<span class="${className}">`
    } else {
      final += `</span>`
    }
    // console.log('zzz - ', i, parts[i], final)
    final += parts[i]
  }
  final += `</span>` + parts[parts.length - 1]
  // console.log('expclass- bbb', { final })
  return final
}

export const convertExpToHtml = (exp: string | undefined) => {
  if (!exp) return ''
  let update = ''
  update = expressWithClass(exp, '__', 'sm-botom')
  update = expressWithClass(update, '^', 'sm-top')
  update = expressWithClass(update, '**', 'txt-red')
  update = expressWithClass(update, '--', 'sm-botom txt-black')
  return update
}

export const getRandom = (a: number, b: number) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  const r = Math.random() * (max - min) + min
  return r
}

// Similar function with above 'generateEnergyArray()'
// input: arr = [false, false, true, false, true, false], percentage = 50
// result:      [false,  true, true, false, true, false]
// percentage -> 0 : goes to false array,   percentage -> 100 : goes to true array.
export const generateBinaryArr = (arr: boolean[], percentage: number) => {
  const len = arr.length
  const finalCount = Math.floor(len * Math.min(percentage, 100) / 100)
  const originCount = arr.reduce((res, cur) => res + (cur ? 1 : 0), 0)
  const updateCount = finalCount - originCount
  const update = [...arr]
  const arrIdx: number[] = []  // array indexrd which can be updated.

  if (updateCount > 0) {
    update.forEach((item, index) => {
      if (item === false) {
        arrIdx.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrIdx.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrIdx.length)
      const idx = arrIdx.splice(rand, 1)[0]
      update[idx] = true
    })
  } else if (updateCount < 0) {
    update.forEach((item, index) => {
      if (item === true) {
        arrIdx.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrIdx.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrIdx.length)
      const idx = arrIdx.splice(rand, 1)[0]
      update[idx] = false
    })
  }
  return update
}
