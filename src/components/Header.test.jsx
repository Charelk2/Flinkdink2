/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'
import { useContent } from '../contexts/ContentProvider'

vi.mock('../contexts/ContentProvider')

describe('Header', () => {
  it('shows progress and home link', () => {
    useContent.mockReturnValue({ progress: { week: 1, day: 2, session: 3 } })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText('Week 1 • Day 2 • Session 3')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })
})
