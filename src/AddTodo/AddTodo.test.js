import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import store from '../redux/store'
import userEvent from '@testing-library/user-event';
import * as actionsAndSelectors from '../Todo/todoSlice'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { AddTodo } from './AddTodo';

const mockStore = configureMockStore([thunk]);


const renderComponent = () =>
  render(
    <Provider store={store}>
      <AddTodo />
    </Provider>,
  );

test('should render add button', () => {
  const { rerender, asFragment } = renderComponent();
  const addButton = screen.getByText(/\+/);
  expect(addButton).toBeInTheDocument();
})

test('should render a form after clicking the add (+) button', () => {
  // const state = {
  //   handleShow: jest.fn,
  //   handleClose: jest.fn,
  //   show: true,
  //   handleChange: jest.fn,
  //   inputs: {
  //     category: "",
  //     description: "",
  //     dueDate: "",
  //   },
  //   handleSubmit: jest.fn,
  // }
  // const store = mockStore(state);
  renderComponent();
  act(() => {
    userEvent.click(screen.getByRole('button', { name: /\+/i }))
  });
  const addTodoTextOnForm = screen.getByText(/Add Todo$/);
  const submitButton = screen.getByRole('button', {name: /Submit/})
  expect(addTodoTextOnForm).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
})

test('should render an input with label category', () => {
  renderComponent();
  act(() => {
    userEvent.click(screen.getByRole('button', { name: /\+/i }))
  });
  const categoryInput = screen.getByRole('textbox', { name: /Category/i });
  expect(categoryInput).toHaveAttribute('type', 'text');
})

test('should render an input with label category', () => {
  renderComponent();
  act(() => {
    userEvent.click(screen.getByRole('button', { name: /\+/i }))
  });
  const categoryInput = screen.getByRole('textbox', { name: /Category/i });
  expect(categoryInput).toHaveAttribute('type', 'text');
})
