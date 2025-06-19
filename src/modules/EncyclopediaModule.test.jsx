import { render, screen, waitFor } from '@testing-library/react'
import EncyclopediaModule from './EncyclopediaModule'

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

  it('fetches remote photos and replaces defaults', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'https://img.test/photo.jpg' }),
    })
    global.fetch = fetchMock
    globalThis.fetch = fetchMock
    if (typeof window !== 'undefined') {
      window.fetch = fetchMock
    }

    const cards = [
      { image: '/images/test.svg', title: 'Lion', fact: 'King' },
    ]
    render(<EncyclopediaModule cards={cards} />)

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/api/photos?query=Lion'),
    )
    const img = screen.getByRole('img', { name: 'Lion' })
    await waitFor(() =>
      expect(img).toHaveAttribute('src', 'https://img.test/photo.jpg'),
    )
  })
});
