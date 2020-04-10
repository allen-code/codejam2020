import { parseCase } from './parseCase'
import { solve } from './solve'

test('Google sample 1 with my own answer', () => {
  let data = {}
  data = parseCase('4', data)
  data = parseCase('1 8', data)
  data = parseCase('1 2', data)

  const result = solve(data)

  expect(result).toBe('3 0 1')
})

test('Google sample 2 with my own answer', () => {
  let data = {}
  data = parseCase('4', data)
  data = parseCase('1 2 3 4', data)
  data = parseCase('2 1 4 3', data)
  data = parseCase('3 4 1 2', data)
  data = parseCase('4 3 2 1', data)

  const result = solve(data)

  expect(result).toBe('4 0 0')
})
