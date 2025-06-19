import { render, screen } from '@testing-library/react';
import MathModule, { createSlides } from './MathModule';

describe('MathModule', () => {
  it('creates a carousel with ten number slides', () => {
    render(<MathModule start={1} />);
    const dots = screen.getAllByTestId('carousel-dot');
    expect(dots).toHaveLength(10);
  });

  it('renders visible dots for each math slide', () => {
    const { container } = render(<MathModule start={1} />);
    const board = container.querySelector('.relative');
    expect(board).not.toBeNull();
    const dots = board.querySelectorAll('span');
    expect(dots.length).toBeGreaterThan(0);
    dots.forEach((dot) => {
      const computed = getComputedStyle(dot);
      expect(parseFloat(computed.width)).toBeGreaterThan(0);
      expect(parseFloat(computed.height)).toBeGreaterThan(0);
    });
  });

  describe('createSlides', () => {
    it('returns week one numbers in order', () => {
      expect(createSlides(1)).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ]);
    });

    it('shuffles only the first half for later weeks', () => {
      const slides = createSlides(6);
      expect(slides.slice(5)).toEqual([11, 12, 13, 14, 15]);
      const firstHalf = [...slides.slice(0, 5)].sort((a, b) => a - b);
      expect(firstHalf).toEqual([6, 7, 8, 9, 10]);
    });
  });
});
