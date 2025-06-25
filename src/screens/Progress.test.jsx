import { render, screen } from '@testing-library/react';
import Progress from './Progress';
import { useContent } from '../contexts/ContentProvider';
import { useProfiles } from '../contexts/ProfileProvider';

const { TOTAL_WEEKS } = jest.requireActual('../contexts/ContentProvider');

jest.mock('../contexts/ContentProvider');
jest.mock('../contexts/ProfileProvider');

describe('Progress screen', () => {
  it('renders progress info and badges', () => {
    useContent.mockReturnValue({
      progress: { week: 2, day: 3, session: 1 },
    });
    useProfiles.mockReturnValue({
      selectedProfile: { badges: ['first-day'] },
    });

    render(<Progress />);

    expect(
      screen.getByRole('heading', {
        name: 'Term 1 \u00B7 Week 2 \u00B7 Day 3 \u00B7 Session 1',
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('badge-list')).toHaveTextContent('🎈');

    const cells = screen.getAllByTestId(/week-cell-/);
    expect(cells).toHaveLength(TOTAL_WEEKS);
    expect(screen.getByTestId('week-cell-1')).toHaveClass('bg-green-300');
    expect(screen.getByTestId('week-cell-2')).toHaveClass('bg-indigo-200');
  });
});
