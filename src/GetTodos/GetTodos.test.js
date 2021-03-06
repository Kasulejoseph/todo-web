import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import userEvent from '@testing-library/user-event';
import * as actionsAndSelectors from '../Todo/todoSlice'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';


const mockStore = configureMockStore([thunk]);

import { GetAllTodos } from './GetTodos';

const changeHandler = jest.fn();

const renderComponent = () =>
  render(
    <Provider store={store}>
      <GetAllTodos />
    </Provider>,
  );

describe("Get All Todos", () => {
  it("should load 'loading text' first before rendering todos", () => {
    renderComponent();
    const LoadingText = screen.getByText(/Loading/);
    expect(LoadingText).toBeInTheDocument();
  })

  // it("should mark todo as completed", async () => {
  //   renderComponent();
  //   await act(() => Promise.resolve());
  //   await act( async () => {
  //     userEvent.click(await screen.findAllByRole('textbox', { name: /checkbox/i }))
  //    });
  //   const LoadingText = screen.getByText(/Loading/);
  //   expect(LoadingText).toBeInTheDocument();
  // })
})
