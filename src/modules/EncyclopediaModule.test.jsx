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
    expect(img).toHaveClass('w-full', 'rounded-xl', 'encyclopedia-thumb');
    const picture = img.closest('picture');
    expect(picture).not.toBeNull();
    const sources = picture.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute('type', 'image/avif');
    expect(sources[1]).toHaveAttribute('type', 'image/webp');
  });

  it('fetches remote photos and replaces defaults', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ small: 'https://img.test/s.jpg', regular: 'https://img.test/r.jpg' }),
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
      expect(img).toHaveAttribute('src', 'https://img.test/s.jpg'),
    )
  })

  it('uses the query field when provided', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ small: 'https://img.test/s2.jpg', regular: 'https://img.test/r2.jpg' }),
    })
    global.fetch = fetchMock
    globalThis.fetch = fetchMock
    if (typeof window !== 'undefined') {
      window.fetch = fetchMock
    }

    const cards = [
      { image: '/images/test.svg', title: 'Leeu', query: 'Lion', fact: 'King' },
    ]
    render(<EncyclopediaModule cards={cards} />)

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/api/photos?query=Lion'),
    )
    const img = screen.getByRole('img', { name: 'Leeu' })
    await waitFor(() =>
      expect(img).toHaveAttribute('src', 'https://img.test/s2.jpg'),
    )
  })
});
