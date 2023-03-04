import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const typeElement = screen.getByTestId('app-id')
    expect(typeElement).toBeInTheDocument();
});
