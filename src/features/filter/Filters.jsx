/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorTodos } from '../todos/todosSlice';
import { selectorFilter, actionsFilter } from './filterSlice';

const filters = ['All', 'Completed', 'Active'];

const Filter = ({ filter, activeFilter, handleChange }) => {
  const count = useSelector(selectorTodos.todosByFilter(filter)).length;
  const checked = activeFilter === filter;
  return (
    <div key={filter} className="d-flex">
      <div className="form-check me-2 ">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            name="filterTodos"
            checked={checked}
            onChange={handleChange(filter)}
          />
          {filter}
        </label>
      </div>
      <span className="badge bg-primary align-self-center">{count}</span>
    </div>
  );
};

const Filters = () => {
  const activeFilter = useSelector(selectorFilter.selectFilter);
  const dispatch = useDispatch();
  const handleChange = (filter) => () => {
    dispatch(actionsFilter.change({ filter }));
  };
  return (
    <div>
      <h3>Фильтры</h3>
      {filters.map((filter) => (
        <Filter
          filter={filter}
          activeFilter={activeFilter}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default Filters;
