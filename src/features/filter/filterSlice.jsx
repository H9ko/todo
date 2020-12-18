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
  // extraReducers: {
  //   [getfilter.fulfilled]: (state, { payload }) => {
  //     filterAdapter.setAll(state, payload);
  //   },
  // },
});

export const { actions: actionsFilter } = filterSlice;
// export const asyncActionsfilter = {
//   getfilter,
//   removeContact,
//   addContact,
//   editContact,
// };

export default filterSlice.reducer;

// const { selectAll, selectById } = filterAdapter.getSelectors(
//   (state) => state.filter
// );

const selectFilter = (state) => state.filter.todos;

export const selectorFilter = {
  selectFilter,
};
