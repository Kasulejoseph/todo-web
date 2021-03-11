
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
let store;

import {
  todoInitialState,
  addNewTodo,
} from "./todoSlice";

jest.mock("../axios")

describe("mocked ", () => {
  beforeEach(() => {
    store = mockStore(todoInitialState);
    store.clearActions();
  })
  it("should successfully add a new todo", async () => {
    await store.dispatch(addNewTodo({
      category: "testing",
      description: "add new todo",
      dueDate: "2020-11-21"
    }));
    const expectedPayload = { type: 'todo/setSuccessStatus', payload: true }
    const actionPayloadLoading = await store.getActions()[3];
    expect(actionPayloadLoading).toEqual(expectedPayload);
  });

  it("should throw an error with unsuccessful todo creation", async () => {
    await store.dispatch(addNewTodo({}));
    const expectedPayload = { type: 'todo/setSuccessStatus', payload: true }
    const actionPayloadLoading = await store.getActions()[3];
    expect(actionPayloadLoading).toEqual(expectedPayload);
  });
})
