import { render, screen } from '@testing-library/react';
import MathModule from './MathModule';

describe('MathModule', () => {
  it('creates a carousel with ten number slides', () => {
    render(<MathModule start={1} />);
    const dots = screen.getAllByTestId('carousel-dot');
    expect(dots).toHaveLength(10);
  });
});
