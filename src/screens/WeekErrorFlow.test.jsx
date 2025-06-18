import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import ErrorBanner from '../components/ErrorBanner'
import { ContentProvider } from '../contexts/ContentProvider'

describe('week load error flow', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    delete global.fetch
  })

  it('surfaces banner and retries', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ language: ['hi'], mathWindowStart: 0, encyclopedia: [] }),
      })
    global.fetch = fetchMock

    render(
      <MemoryRouter>
        <ContentProvider>
          <ErrorBanner />
          <Home />
        </ContentProvider>
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /retry/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
  })
})
