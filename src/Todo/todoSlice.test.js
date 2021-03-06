import todoReducer, {
  todoInitialState,
  setLoading,
  selectLoadingStatus,
  selectStatusMessages,
  setSuccessStatus,
  setFailureStatus,
  setTodoList,
  selectAllTodos,
  setItemToList,
} from "./todoSlice";
const sampleTodoResponse = {
  id: 2,
  category: "test 3",
  description: "all details",
  dueDate: "2020-11-21T00:00:00.000Z",
  status: "completed",
  createdAt: "2021-03-04T04:00:04.226Z",
  updatedAt: "2021-03-04T20:38:06.453Z",
};

describe("todoSlice - reducer, actions and selectors", () => {
  it("should return the initial state on first run", () => {
    const nextState = todoInitialState;
    const result = todoReducer(undefined, { type: "" });
    expect(result).toEqual(nextState);
  });

  it("should set isLoading to true after dispatching an action", () => {
    const nextState = todoReducer(todoInitialState, setLoading(true));
    const rootState = { todo: nextState };
    expect(selectLoadingStatus(rootState)).toEqual(true);
  });

  it("should set status messages when action is dispatched", () => {
    const nextStateSuccess = todoReducer(
      todoInitialState,
      setSuccessStatus(true)
    );
    const nextStateFailure = todoReducer(
      todoInitialState,
      setFailureStatus(false)
    );
    const rootStateSuccess = { todo: nextStateSuccess };
    const rootStateFailure = { todo: nextStateFailure };
    expect(selectStatusMessages(rootStateSuccess).success).toEqual(true);
    expect(selectStatusMessages(rootStateFailure).failure).toEqual(false);
  });

  it("should update the state appropriately when todoList is successfully updated", () => {
    const nextState = todoReducer(
      todoInitialState,
      setTodoList([sampleTodoResponse])
    );
    const rootState = { todo: nextState };
    expect(selectAllTodos(rootState).length).toEqual(1);
    expect(selectAllTodos(rootState)[0].id).toEqual(2);
  });

  it("should update the state appropriately when new todo is successfully added", () => {
    const nextState = todoReducer(
      todoInitialState,
      setItemToList([sampleTodoResponse])
    );
    expect(nextState.oneTodo.length).toEqual(1);
    expect(nextState.oneTodo[0].category).toEqual("test 3");
  });
});
