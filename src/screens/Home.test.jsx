import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

describe('Home redirect', () => {
  it('redirects to learning hub', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning-hub" element={<div>Hub</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });
});
