import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import userEvent from '@testing-library/user-event';
import * as actionsAndSelectors from '../Todo/todoSlice'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([thunk]);

import { SelectForm } from './SelectTodos';

const changeHandler = jest.fn();

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

// it('should display an error if a user clicks submit button without filling in any field', async () => {
//   const state = { todo: actionsAndSelectors.todoInitialState };
//   const store = mockStore(state);
//   renderComponent(store);

//   userEvent.click(screen.getByRole('option', { name: /Select a category/i }));
//   const summaryError = await screen.findByText(
//     /Summary is a required field/i
//   );

//   expect(summaryError).toBeInTheDocument();
// });
