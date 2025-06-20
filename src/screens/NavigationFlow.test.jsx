import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import Session from './Session';
import { useContent } from '../contexts/ContentProvider';

jest.mock('../contexts/ContentProvider');

describe('Session navigation flow', () => {
  const weekData = {
    language: ['one'],
    mathWindowStart: 1,
    encyclopedia: [{ image: 'a.jpg', title: 'A', fact: 'fact' }],
    addition: [[{ a: 1, b: 1, sum: 2 }]],
  };

  it('advances through modules and completes session', () => {
    const completeSession = jest.fn();
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      weekData,
      loading: false,
      error: null,
      completeSession,
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Session />
        </AuthProvider>
      </MemoryRouter>,
    );

    // Starts at Language step
    expect(screen.getByText('📝 Language')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: /next/i })[1]);
    expect(screen.getByText('🔢 Math Dots')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: /next/i })[1]);
    expect(screen.getByText('➕ Addition')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: /next/i })[1]);
    expect(screen.getByText('🦁 Encyclopedia')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /finish session/i }));
    expect(completeSession).toHaveBeenCalled();
    expect(screen.getByText(/great job/i)).toBeInTheDocument();
  });
});
