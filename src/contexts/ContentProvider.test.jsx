/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { ContentProvider, useContent } from './ContentProvider'

const TestConsumer = () => {
  const { weekData, loading, error } = useContent()
  if (loading) return <div>loading</div>
  if (error) return <div data-testid="error">{error.message}</div>
  return <div data-testid="language">{weekData.language[0]}</div>
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContentProvider fetch handling', () => {
  it('loads week data successfully', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ language: ['hi'], mathWindowStart: 0, encyclopedia: [] }),
    })

    render(
      <ContentProvider>
        <TestConsumer />
      </ContentProvider>,
    )

    await waitFor(() => expect(screen.getByTestId('language')).toBeInTheDocument())
    expect(screen.getByTestId('language')).toHaveTextContent('hi')
  })

  it('handles fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 404 })

    render(
      <ContentProvider>
        <TestConsumer />
      </ContentProvider>,
    )

    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument())
    expect(screen.getByTestId('error')).toHaveTextContent('404')
  })
})
