export const solve = (data) => {
  const { M } = data;
  const arrSum = arr => arr.reduce((sum, curr, index) => sum + parseInt(curr[index]), 0)
  const hasDuplicates = arr => (new Set(arr)).size !== arr.length;
  const rotate = arr => arr[0].map((col, i) => arr.map(row => row[i]));
  const findDuplicateNumber = arr => arr.reduce((sum, curr) => sum + (hasDuplicates(curr) ? 1 : 0), 0);
  const result = `${arrSum(M)} ${findDuplicateNumber(M)} ${findDuplicateNumber(rotate(M))}`

  return result
}