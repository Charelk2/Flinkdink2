import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LearningHub from './LearningHub';
import { useProfiles } from '../contexts/ProfileProvider';
import { useContent } from '../contexts/ContentProvider';

jest.mock('../contexts/ProfileProvider');
jest.mock('../contexts/ContentProvider');

describe('LearningHub', () => {
  it('shows session info and action links', () => {
    useProfiles.mockReturnValue({
      selectedProfile: { name: 'Lila', avatar: '🐱' },
    });
    useContent.mockReturnValue({
      progress: { week: 2, day: 3, session: 1 },
    });

    const today = new Date();
    const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });

    render(
      <MemoryRouter>
        <LearningHub />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /welcome back, lila!/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('session-info')).toHaveTextContent(
      'Week 2 \u00B7 Day 3 \u00B7 Session 1',
    );
    expect(screen.getByTestId('date-info')).toHaveTextContent(
      `${weekday} · Week 2, Day 3`,
    );
    expect(screen.getByRole('link', { name: /continue session/i })).toHaveAttribute(
      'href',
      '/session',
    );
    expect(screen.getByRole('link', { name: /view progress/i })).toHaveAttribute(
      'href',
      '/progress',
    );
  });
});
