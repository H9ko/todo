import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { actionsTodos } from './todosSlice';

const maxLength = 20;
const validationSchema = Yup.object().shape({
  textTodo: Yup.string()
    .max(maxLength, `Too Long! Required length ${maxLength}`)
    .required('Required!'),
});

const TodoInput = () => {
  const dispatch = useDispatch();
  const textTodoRef = useRef();
  const handleSubmit = async (values, { resetForm }) => {
    console.log('handleSubmit');
    dispatch(actionsTodos.add({ id: nanoid(), text: values.textTodo }));
    textTodoRef.current.focus();
    resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={{
          textTodo: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isValid, errors, touched, setFieldTouched, handleChange }) => (
          <>
            {errors.textTodo ? (
              <div className="invalid-feedback">
                Please enter a message in the textarea.
              </div>
            ) : null}
            <Form>
              <div className="input-group ">
                <Field
                  type="text"
                  className={cn('form-control', {
                    'is-valid': isValid && touched.textTodo,
                    'is-invalid': !isValid && touched.textTodo,
                  })}
                  onChange={(e) => {
                    setFieldTouched('textTodo');
                    handleChange(e);
                  }}
                  innerRef={textTodoRef}
                  autoComplete="off"
                  placeholder="New todo"
                  name="textTodo"
                />
                <button type="submit" className="btn btn-success">
                  Добавить
                </button>
              </div>
              {!isValid && touched.textTodo && (
                <div className="invalid-feedback d-flex">{errors.textTodo}</div>
              )}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default TodoInput;
