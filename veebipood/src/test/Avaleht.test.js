import { fireEvent, render, screen } from '@testing-library/react';
import Avaleht from '../pages/Avaleht';

test('renders "uuenda kogust" text when nothing changed', () => {
  render(<Avaleht />);
  const linkElement = screen.getByText(/Uuenda kogust/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders "Suurendatud" text when clicked "+"', () => {
  render(<Avaleht />);
  const button = screen.getByText("+");
  fireEvent.click(button);
  const linkElement = screen.getByText(/Suurendatud/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders "Vähendatud" text when clicked "-"', () => {
  render(<Avaleht />);
  const button = screen.getByText("-");
  fireEvent.click(button);
  const linkElement = screen.getByText(/Vähendatud/i);
  expect(linkElement).toBeInTheDocument();
});
