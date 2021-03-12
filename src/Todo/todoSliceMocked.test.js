
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
let store;

import {
  todoInitialState,
  addNewTodo,
  deleteTodoAction,
  toggleTodoStatus
} from "./todoSlice";
jest.setTimeout(10000)
jest.mock('../axios', () => {
  return {
    post: jest.fn(() => Promise.resolve({ data: {} })),
    defaults: { baseURL: process.env.REACT_APP_BACKEND_URL }
  };
});
describe("mocked ", () => {
  beforeEach(() => {
    store = mockStore(todoInitialState);
    store.clearActions();
  })
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should successfully add a new todo", async () => {
    await store.dispatch(addNewTodo({
      category: "testing",
      description: "add new todo",
      dueDate: "2020-11-21"
    }));
    const { data } = await store.getActions()[2].payload
    const { id } = data.data
    const expectedPayload = { type: 'todo/setSuccessStatus', payload: true }
    const actionPayloadLoading = await store.getActions()[3];
    expect(actionPayloadLoading).toEqual(expectedPayload);
    await store.dispatch(toggleTodoStatus(id, "completed"))
    await store.dispatch(deleteTodoAction(id))
  });

  it("should throw an error with unsuccessful todo creation", async () => {
    await store.dispatch(addNewTodo({}));
    const expectedPayload = { type: 'todo/setFailureStatus', payload: true }
    const actionPayloadLoading = await store.getActions()[3];
    expect(actionPayloadLoading).toEqual(expectedPayload);
  });
})
