import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'

import { GetAllTodos } from './GetTodos';

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
})
