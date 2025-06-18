import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import Home from './Home';
import { useContent } from '../contexts/ContentProvider';

jest.mock('../contexts/ContentProvider');

describe('Home screen', () => {
  it('renders hero, progress, themes and CTA', () => {
    useContent.mockReturnValue({
      progress: { week: 2, day: 3, session: 2 },
      weekData: {
        language: ['apple'],
        mathWindowStart: 10,
        encyclopedia: [{ title: 'Lion' }],
      },
      loading: false,
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /flinkdink flashcards/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Week 2 \u00B7 Day 3 \u00B7 Session 2'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /continue week 2 · day 3 · session 2/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
