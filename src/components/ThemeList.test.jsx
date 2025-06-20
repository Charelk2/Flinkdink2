import { render, screen } from '@testing-library/react'
import ThemeList from './ThemeList'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('ThemeList', () => {
  it('renders themes from context', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 5,
        mathWindowLength: 10,
        encyclopedia: [{ title: 'Lion' }],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('apple')
    expect(items[1]).toHaveTextContent('5–14')
    expect(items[2]).toHaveTextContent('Lion')
  })

  it('includes first addition sum in the math item when provided', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 5,
        mathWindowLength: 10,
        encyclopedia: [{ title: 'Lion' }],
        addition: [[{ a: 1, b: 2, sum: 3 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[1]).toHaveTextContent('1 + 2 = 3')
  })
})
