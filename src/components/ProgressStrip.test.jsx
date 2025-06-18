import { render, screen } from '@testing-library/react';
import ProgressStrip from './ProgressStrip';
import { useContent } from '../contexts/ContentProvider';

jest.mock('../contexts/ContentProvider');

describe('ProgressStrip', () => {
  it('shows progress from context', () => {
    useContent.mockReturnValue({ progress: { week: 1, day: 2, session: 3 } });

    render(<ProgressStrip />);

    expect(screen.getByText('Week 1 \u2022 Day 2 \u2022 Session 3')).toBeInTheDocument();
    const group = screen.getByLabelText('sessions-progress');
    expect(group).toBeInTheDocument();

    const dots = screen.getAllByTestId('session-dot');
    expect(dots).toHaveLength(3);
    const filled = dots.filter((d) => d.classList.contains('bg-indigo-600'));
    expect(filled).toHaveLength(3);
  });
});
