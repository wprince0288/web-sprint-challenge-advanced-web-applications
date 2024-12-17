// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Spinner from '../components/Spinner'

test('sanity', () => {
  expect(true).toBe(true)
});

describe('Spinner Componet', () => {
  it('renders nothing when "on" prop is false', () => {
    render(<Spinner on={false} />);
    expect(screen.queryByText(/please wait/i)).not.toBeInTheDocument();
  });

  test('renders the spinner when "on" prop is true', () => {
    render(<Spinner on={true} />);
    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('.');
    expect(screen.getByText(/please wait/i).closest('div')).toHaveAttribute('id', 'spinner');
});

test('matches snapshot when spinner is on', () => {
  const { asFragment } = render(<Spinner on={true} />);
  expect(asFragment()).toMatchSnapshot();
});

test('matches snapshot when spinner is off', () => {
  const { asFragment } = render(<Spinner on={false} />);
  expect(asFragment()).toMatchSnapshot();
});
  });

