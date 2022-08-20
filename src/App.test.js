import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
//
// test('render link', () => {
//   const { getByText } = render(<App/>);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// })

test('show DOM in console with screen', () => {
  render(<App/>);
  screen.debug()
})

test('use fragment', () => {
  const { asFragment } = render(<App/>);
  expect(asFragment(<App/>)).toMatchSnapshot();
})
