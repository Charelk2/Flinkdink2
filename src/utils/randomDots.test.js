import { describe, expect, it } from 'vitest'
import { generateDotPositions } from './randomDots'

describe('generateDotPositions', () => {
  it('creates the requested number of dots within range', () => {
    const count = 5
    const dots = generateDotPositions(count)
    expect(dots).toHaveLength(count)
    dots.forEach(({ top, left }) => {
      const t = parseFloat(top)
      const l = parseFloat(left)
      expect(t).toBeGreaterThanOrEqual(10)
      expect(t).toBeLessThanOrEqual(90)
      expect(l).toBeGreaterThanOrEqual(10)
      expect(l).toBeLessThanOrEqual(90)
    })
  })
})
