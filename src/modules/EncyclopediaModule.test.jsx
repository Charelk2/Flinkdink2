import { render, screen } from '@testing-library/react';
import EncyclopediaModule from './EncyclopediaModule';

// Verify the image uses responsive height classes and includes an alt attribute

describe('EncyclopediaModule', () => {
  it('renders images with responsive classes and alt text', () => {
    const cards = [
      {
        image: '/images/test.svg',
        title: 'Test Card',
        fact: 'A fact',
      },
    ];
    render(<EncyclopediaModule cards={cards} />);
    const img = screen.getByRole('img', { name: 'Test Card' });
    expect(img).toHaveAttribute('alt', 'Test Card');
    expect(img).toHaveClass('w-full', 'h-48', 'sm:h-64', 'object-cover', 'rounded-xl');
  });
});
