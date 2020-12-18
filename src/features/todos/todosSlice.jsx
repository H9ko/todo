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
  // extraReducers: {
  //   [gettodos.fulfilled]: (state, { payload }) => {
  //     todosAdapter.setAll(state, payload);
  //   },
  // },
});

// export const removeContact = createAsyncThunk(
//   'todos/remove',
//   async (userData, { dispatch, getState }) => {
//     const { jwtToken } = getState().auth;
//     const { id } = userData;

//     try {
//       await Axios.delete([routes.todosPath(), id].join('/'), {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });
//       dispatch(todosSlice.actions.remove({ id }));
//     } catch (err) {
//       dispatch(actionsModals.showModal('INFO', err.response.data));
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'todos/add',
//   async (userData, { dispatch, getState }) => {
//     const { jwtToken } = getState().auth;
//     const maxId = getState().todos.ids.reduce((acc, id) =>
//       id > acc ? id : acc
//     );
//     const { name, email, phone } = userData;
//     const newUser = {
//       id: maxId + 1,
//       name,
//       email,
//       avatar: faker.internet.avatar(),
//       phone,
//     };

//     try {
//       const response = await Axios.post(routes.todosPath(), newUser, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });
//       dispatch(todosSlice.actions.add({ newUser: response.data }));
//     } catch (err) {
//       dispatch(actionsModals.showModal('INFO', err.response.data));
//     }
//   }
// );
// export const editContact = createAsyncThunk(
//   'todos/edit',
//   async (userData, { dispatch, getState }) => {
//     const { jwtToken } = getState().auth;

//     try {
//       const response = await Axios.patch(
//         [routes.todosPath(), userData.id].join('/'),
//         userData,
//         {
//           headers: { Authorization: `Bearer ${jwtToken}` },
//         }
//       );
//       dispatch(todosSlice.actions.edit({ userData: response.data }));
//     } catch (err) {
//       dispatch(actionsModals.showModal('INFO', err.response.data));
//     }
//   }
// );

export const { actions: actionsTodos } = todosSlice;
// export const asyncActionstodos = {
//   gettodos,
//   removeContact,
//   addContact,
//   editContact,
// };

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
