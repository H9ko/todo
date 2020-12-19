/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { selectorFilter } from '../filter/filterSlice';

const todosAdapter = createEntityAdapter();

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    add: (state, { payload }) => {
      const { id, text } = payload;
      const todo = { id, text, completed: false };
      todosAdapter.addOne(state, todo);
    },
    remove: (state, { payload }) => {
      const { id } = payload;
      todosAdapter.removeOne(state, id);
    },
    changeStatus: (state, { payload }) => {
      const { id } = payload;
      state.entities[id].completed = !state.entities[id].completed;
    },
  },
});

export const { actions: actionsTodos } = todosSlice;

export default todosSlice.reducer;

const { selectAll } = todosAdapter.getSelectors((state) => state.todos);

const getFilteredTodos = (filter, todos) => {
  switch (filter) {
    case 'All':
      return todos;
    case 'Completed': {
      return todos.filter(({ completed }) => completed === true);
    }
    case 'Active':
      return todos.filter(({ completed }) => completed === false);
    default:
      return [];
  }
};
const todosByFilter = (filter) =>
  createSelector(selectAll, (todos) => {
    return getFilteredTodos(filter, todos);
  });
const filteredTodos = createSelector(
  selectorFilter.selectFilter,
  selectAll,
  getFilteredTodos
);

export const selectorTodos = {
  selectTodos: selectAll,
  filteredTodos,
  todosByFilter,
};
