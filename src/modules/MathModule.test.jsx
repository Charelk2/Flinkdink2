import { render, screen } from '@testing-library/react';
import MathModule from './MathModule';

describe('MathModule', () => {
  it('creates a carousel with ten number slides', () => {
    render(<MathModule start={1} />);
    const dots = screen.getAllByTestId('carousel-dot');
    expect(dots).toHaveLength(10);
  });

  it('renders visible dots for each math slide', () => {
    const style = document.createElement('style');
    style.innerHTML = '.w-4{width:1rem;} .h-4{height:1rem;} .inline-block{display:inline-block;}';
    document.head.appendChild(style);
    const { container } = render(<MathModule start={1} />);
    const dot = container.querySelector('.bg-red-500');
    expect(dot).not.toBeNull();
    const computed = getComputedStyle(dot);
    expect(parseFloat(computed.width)).toBeGreaterThan(0);
    expect(parseFloat(computed.height)).toBeGreaterThan(0);
    style.remove();
  });
});
