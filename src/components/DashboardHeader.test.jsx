import { render, screen } from '@testing-library/react';
import DashboardHeader from './DashboardHeader';
import { useContent } from '../contexts/ContentProvider';

jest.mock('../contexts/ContentProvider');

describe('DashboardHeader', () => {
  it('shows progress values and session dots', () => {
    useContent.mockReturnValue({ progress: { week: 2, day: 3, session: 1, streak: 4 } });

    render(<DashboardHeader />);

    expect(screen.getAllByText('Term 1 \u00B7 Week 2 \u00B7 Day 3 \u00B7 Session 1')).toHaveLength(2);
    expect(screen.getByTestId('streak')).toHaveTextContent('Streak: 4');

    const dots = screen.getAllByTestId('session-dot');
    expect(dots).toHaveLength(3);
    const filled = dots.filter((d) => d.classList.contains('bg-indigo-600'));
    expect(filled).toHaveLength(1);
  });
});
