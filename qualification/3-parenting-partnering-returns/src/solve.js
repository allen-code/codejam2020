const checkOverlap = (arr1, arr2) => {
  const min = Math.min(arr1[1], arr2[1])
  const max = Math.max(arr1[0], arr2[0])
  return max < min
}
const checkHasOverlap = (arrCollection, arr) => {
  let hasOverlap = false
  arrCollection.map(currArr => {
    if(checkOverlap(currArr, arr)) {
      hasOverlap = true
    }
  })
  return hasOverlap
}

export const solve = (data) => {
  const { M } = data
  let A = []
  let B = []
  let result = ''
  for (let i = 0; i < M.length; i++) {
    const currArr = M[i]
    if (!A.length) {
      A.push(currArr)
      result += 'C'
    } else {
      if (!checkHasOverlap(A, currArr)) {
        A.push(currArr)
        result += 'C'
      } else {
        if (B.length && checkHasOverlap(B, currArr)) {
          result = 'IMPOSSIBLE'
          break;
        } else {
          B.push(currArr)
          result += 'J'
        }
      }
    }
  }
  return result
}