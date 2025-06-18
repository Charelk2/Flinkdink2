import { render, screen } from '@testing-library/react'
import ThemeList from './ThemeList'

describe('ThemeList', () => {
  it('renders provided themes', () => {
    render(<ThemeList languageTheme="A" mathRange="B" knowledgeTheme="C" />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('A')
    expect(items[1]).toHaveTextContent('B')
    expect(items[2]).toHaveTextContent('C')
  })
})
