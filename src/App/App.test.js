import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'

import App from '.';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
      </Provider>
  );
  const linkElement = screen.getByText(/New Listings/i);
  expect(linkElement).toBeInTheDocument();
});
