import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SelectKid from './SelectKid';

jest.mock('../components/KidSelector', () => () => (
  <div data-testid="kid-selector">selector</div>
));

test('renders heading and kid selector', () => {
  render(
    <MemoryRouter>
      <SelectKid />
    </MemoryRouter>
  );
  expect(screen.getByText("Who’s learning today?")).toBeInTheDocument();
  expect(screen.getByTestId('kid-selector')).toBeInTheDocument();
});
