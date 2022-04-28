import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoList.module.css';
import { getTodos, reset } from '../../store/todo-slice';
import { openSnackBar } from '../../store/snack-slice';

import Spinner from '../../UI/Spinner';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, isLoading, isError, message } = useSelector(state => state.todo);

  useEffect(() => {
    if (isError) {
      dispatch(openSnackBar({ type: 'fail', message }));
    }

    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return <section className={styles['todo-container']}></section>;
};
export default TodoList;
