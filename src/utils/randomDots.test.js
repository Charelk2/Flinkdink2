import { generateDotPositions, MIN_DISTANCE } from './randomDots'

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

  it('ensures dots do not overlap within the minimum distance', () => {
    const count = 8
    const dots = generateDotPositions(count)
    dots.forEach(({ top, left }) => {
      const t = parseFloat(top)
      const l = parseFloat(left)
      expect(t).toBeGreaterThanOrEqual(10)
      expect(t).toBeLessThanOrEqual(90)
      expect(l).toBeGreaterThanOrEqual(10)
      expect(l).toBeLessThanOrEqual(90)
    })
    for (let i = 0; i < dots.length; i += 1) {
      for (let j = i + 1; j < dots.length; j += 1) {
        const dx = parseFloat(dots[i].left) - parseFloat(dots[j].left)
        const dy = parseFloat(dots[i].top) - parseFloat(dots[j].top)
        const dist = Math.hypot(dx, dy)
        expect(dist).toBeGreaterThanOrEqual(MIN_DISTANCE)
      }
    }
  })
})
