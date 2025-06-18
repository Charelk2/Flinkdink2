import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { useContent } from '../contexts/ContentProvider';

jest.mock('../contexts/ContentProvider');

describe('Home screen', () => {
  it('renders hero, progress, themes, CTA and previous week button', () => {
    useContent.mockReturnValue({
      progress: { week: 2, day: 3, session: 2 },
      weekData: {
        language: ['apple'],
        mathWindowStart: 10,
        encyclopedia: [{ title: 'Lion' }],
      },
      loading: false,
      previousWeek: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /flinkdink flashcards/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Week 2 \u2022 Day 3 \u2022 Session 2'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /continue week 2 • day 3 • session 2/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument();
  });

  it('hides previous week button on week one', () => {
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      weekData: {
        language: ['a'],
        mathWindowStart: 1,
        encyclopedia: [{ title: 'A' }],
      },
      loading: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('button', { name: /previous week/i })).toBeNull();
  });
});
