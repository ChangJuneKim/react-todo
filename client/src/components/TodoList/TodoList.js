import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoList.module.css';
import { getTodos, reset } from '../../store/todo-slice';
import { openSnackBar } from '../../store/snack-slice';

import Spinner from '../../UI/Spinner';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useDispatch();
  const { todos, isLoading, isError, message } = useSelector(state => state.todo);
  useEffect(() => {
    if (isError) {
      dispatch(openSnackBar({ type: 'fail', message }));
    }

    dispatch(getTodos());
    if (isError) {
      return () => {
        dispatch(reset());
      };
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  const checkAllHandler = () => {
    if (!isTouched) {
    }
  };

  return (
    <section className={styles['todo-container']}>
      <ul className={styles['todo-items']}>
        {todos.map(todo => {
          return <TodoItem todo={todo} key={todo._id} />;
        })}
      </ul>
      {/* {todos.length === 0 && <h2>아 할일 다 끝냈다!</h2>}
      {todos.length > 0 && (
        <div className='row'>
          <label htmlFor='all'>
            <input type='checkbox' name='all' id='all' onChange={handleCheckAll} checked={checkAll} />
            ALL
          </label>
          <p>아직 할 일이 {todos.length} 남았어요.</p>
          <button id='delete' onClick={deleteTodo}>
            Delete
          </button>
        </div>
      )} */}
    </section>
  );
};
export default TodoList;
