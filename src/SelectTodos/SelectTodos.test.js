import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import { SelectForm } from './SelectTodos';
const renderComponent = () =>
  render(
    <Provider store={store}>
      <SelectForm />
    </Provider>,
  );

test('should render select input feild', () => {
  const { rerender, asFragment } = renderComponent();
  const selectCategory = screen.getByText(/Select a category/);
  expect(selectCategory).toBeInTheDocument();
})
