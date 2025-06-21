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

  it('includes first subtraction in the math item when provided', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 5,
        mathWindowLength: 10,
        encyclopedia: [{ title: 'Lion' }],
        subtraction: [[{ a: 5, b: 2, difference: 3 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('5 - 2 = 3')
  })

  it('includes first multiplication in the math item when provided', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 5,
        mathWindowLength: 10,
        encyclopedia: [{ title: 'Lion' }],
        multiplication: [[{ a: 2, b: 3, product: 6 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('2 × 3 = 6')
  })

  it('includes first division in the math item when provided', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 5,
        mathWindowLength: 10,
        encyclopedia: [{ title: 'Lion' }],
        division: [[{ a: 8, b: 2, quotient: 4 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('8 ÷ 2 = 4')
  })

  it('shows only the sum when math length is zero', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 60,
        mathWindowLength: 0,
        encyclopedia: [{ title: 'Lion' }],
        addition: [[{ a: 1, b: 2, sum: 3 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('1 + 2 = 3')
  })

  it('shows only the difference when math length is zero', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 60,
        mathWindowLength: 0,
        encyclopedia: [{ title: 'Lion' }],
        subtraction: [[{ a: 7, b: 4, difference: 3 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('7 - 4 = 3')
  })

  it('shows only the product when math length is zero', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 60,
        mathWindowLength: 0,
        encyclopedia: [{ title: 'Lion' }],
        multiplication: [[{ a: 3, b: 2, product: 6 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('3 × 2 = 6')
  })

  it('shows only the quotient when math length is zero', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 60,
        mathWindowLength: 0,
        encyclopedia: [{ title: 'Lion' }],
        division: [[{ a: 9, b: 3, quotient: 3 }]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('9 ÷ 3 = 3')
  })

  it('shows counting numbers when provided', () => {
    useContent.mockReturnValue({
      weekData: {
        language: ['apple'],
        mathWindowStart: 60,
        mathWindowLength: 5,
        encyclopedia: [{ title: 'Lion' }],
        counting: [[2, 4, 6, 8, 10]],
      },
    })

    render(<ThemeList />)
    const items = screen.getAllByRole('listitem')
    expect(items[1]).toHaveTextContent('2, 4, 6, 8, 10')
  })
})
