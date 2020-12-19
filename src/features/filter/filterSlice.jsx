/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { todos: 'All' },
  reducers: {
    change: (state, { payload }) => {
      const { filter } = payload;
      state.todos = filter;
    },
  },
});

export const { actions: actionsFilter } = filterSlice;

export default filterSlice.reducer;

const selectFilter = (state) => state.filter.todos;

export const selectorFilter = {
  selectFilter,
};
