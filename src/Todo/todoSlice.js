import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

export const todoInitialState = {
  todoList: [],
  oneTodo: {
    id: 0,
    status: "",
    description: "",
    dueDate: "",
    createdAt: "",
    updatedAt: "",
  },
  messages: {
    success: false,
    failure: false,
    loading: false,
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {
    setItemToList: (state, action) => {
      state.oneTodo = action.payload;
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    setSuccessStatus: (state, action) => {
      state.messages.success = action.payload;
    },
    setFailureStatus: (state, action) => {
      state.messages.failure = action.payload;
    },
    setLoading: (state, action) => {
      state.messages.loading = action.payload;
    },
  },
});

export const {
  setFailureStatus,
  setSuccessStatus,
  setItemToList,
  setTodoList,
  setTodoStatus,
  setLoading,
} = todoSlice.actions;

export const addNewTodo = (content) => async (dispatch) => {
  dispatch(setSuccessStatus(false));
  try {
    dispatch(setLoading(true));
    const response = await axios({
      method: "post",
      url: "https://todo-baxk.herokuapp.com/todos/add",
      data: content,
    });
    dispatch(setItemToList(response));
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    console.log(error.response);
    dispatch(setLoading(false));
  }
};

export const getAllTodos = (params) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios({
      method: "get",
      url: `https://todo-baxk.herokuapp.com/todos?${params}`,
    });
    dispatch(setTodoList(data.data));
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    // console.log(data);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    console.error(error);
    dispatch(setLoading(false));
  }
};

export const toggleTodoStatus = (id, status) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios({
      method: "put",
      url: `https://todo-baxk.herokuapp.com/todos/${id}`,
      data: { status },
    });
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    console.error(error);
    dispatch(setLoading(false));
  }
};

export const deleteTodoAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios({
      method: "delete",
      url: `https://todo-baxk.herokuapp.com/todos/${id}`,
    });
    console.log(data);
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    console.error(error);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.todo.value;

export const selectAllTodos = (state) => state.todo.todoList;
export const selectLoadingStatus = (state) => state.todo.messages.loading;
export const selectStatusMessages = (state) => state.todo.messages;

export default todoSlice.reducer;
