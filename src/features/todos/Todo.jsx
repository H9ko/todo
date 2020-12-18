import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { actionsTodos } from './todosSlice';

const Todo = ({ todo }) => {
  const { id, text, completed } = todo;
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(actionsTodos.remove({ id }));
  };
  const handleChecked = () => {
    dispatch(actionsTodos.changeStatus({ id }));
  };
  return (
    <div className="d-flex align-items-baseline border-bottom pb-2 mb-2">
      <div className="form-check me-auto ">
        <input
          className="form-check-input custom-control-lg"
          type="checkbox"
          checked={completed}
          id={id}
          onChange={handleChecked}
        />
        <label
          className={cn('form-check-label', {
            'text-decoration-line-through': completed,
          })}
          htmlFor={id}
        >
          {text}
        </label>
      </div>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={handleRemove}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default Todo;
