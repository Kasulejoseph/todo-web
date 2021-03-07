import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios"

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

export const addNewTodo = (data) => async (dispatch) => {

  dispatch(setSuccessStatus(false));
  try {
    dispatch(setLoading(true));
    const response = await axios({
      method: "/post",
      url: 'add',
      data,
    });
    dispatch(setItemToList(response));
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    dispatch(setLoading(false));
  }
};

export const getAllTodos = (params) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios({
      method: "get",
      url: `?${params}`,
    });
    dispatch(setTodoList(data.data));
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    dispatch(setLoading(false));
  }
};

export const toggleTodoStatus = (id, status) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios({
      method: "put",
      url: `/${id}`,
      data: { status },
    });
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
    dispatch(setLoading(false));
  }
};

export const deleteTodoAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios({
      method: "delete",
      url: `/${id}`,
    });
    dispatch(setSuccessStatus(true));
    dispatch(setFailureStatus(false));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setSuccessStatus(false));
    dispatch(setFailureStatus(true));
  }
};

export const selectAllTodos = (state) => state.todo.todoList;
export const selectLoadingStatus = (state) => state.todo.messages.loading;
export const selectStatusMessages = (state) => state.todo.messages;

export default todoSlice.reducer;
