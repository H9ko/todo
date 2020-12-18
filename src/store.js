import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import filterReducer from './features/filter/filterSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
  },
});
