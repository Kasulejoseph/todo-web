import { createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
    oneTodo: {
      id: 0,
      status: '',
      description: '',
      dueDate: '',
      createdAt: '',
      updatedAt: ''
    },
    messages: {
      success: false,
      failure: false
    }
  },
  reducers: {
    addItemToList: (state, action) => {
      state.oneTodo = action.payload;
    },
    getTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    setSuccessStatus: (state, action) => {
      state.messages.success = action.payload
    },
    setFailureStatus: (state, action) => {
      state.messages.failure = action.payload
    }
  },
});

export const { setFailureStatus, setSuccessStatus, addItemToList, getTodoList, setTodoStatus } = todoSlice.actions;

export const addNewTodo = content => async (dispatch) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://todo-baxk.herokuapp.com/todos/add',
      data: content
    });
    dispatch(addItemToList(response))
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}


export const getAllTodos = params => async (dispatch) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://todo-baxk.herokuapp.com/todos?${params}`
    });
    dispatch(getTodoList(data.data))
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export const toggleTodoStatus = (id, status) => async (dispatch) => {
  try {
    const { data }  = await axios({
      method: 'put',
      url: `https://todo-baxk.herokuapp.com/todos/${id}`,
      data: { status }
    });
    dispatch(setSuccessStatus(true))
    
  } catch (error) {
    console.error(error);
  }
}

export const deleteTodoAction = (id) => async (dispatch) => {
  try {
    const { data }  = await axios({
      method: 'delete',
      url: `https://todo-baxk.herokuapp.com/todos/${id}`
    });
    console.log(data);
    dispatch(setSuccessStatus(true))
    
  } catch (error) {
    console.error(error);
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.todo.value;

export const selectAllTodos = state => state.todo.todoList;

export default todoSlice.reducer;
