import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Todo/todoSlice';

export default configureStore({
  reducer: {
    todo: counterReducer,
  },
});
