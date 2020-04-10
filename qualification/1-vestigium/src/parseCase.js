export const parseCase = (line, data) => {
  const { isProcessing, ...result } = data

  if (result.N === undefined) {
    result.N = parseInt(line)
    result.isProcessing = true
    return result
  }
  result.N = result.N - 1
  if (result.N !== 0) {
    result.isProcessing = true
  }
  if (!result.M) {
    result.M = [line.split(' ')]
  } else {
    result.M.push(line.split(' '))
  }

  return result
}
