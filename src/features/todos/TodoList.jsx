import React from 'react';
import { useSelector } from 'react-redux';
import Todo from './Todo';
import { selectorTodos } from './todosSlice';

const TodoList = () => {
  const todos = useSelector(selectorTodos.filteredTodos);
  return (
    <div className="mt-3">
      {todos &&
        todos.map((todo) => {
          return <Todo todo={todo} key={todo.id} />;
        })}
    </div>
  );
};

export default TodoList;
