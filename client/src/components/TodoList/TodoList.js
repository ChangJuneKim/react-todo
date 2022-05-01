import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './TodoList.module.css';
import { getTodos, reset, checkAllTodos, deleteTodo } from '../../store/todo-slice';

import Spinner from '../../UI/Spinner';
import TodoItem from '../TodoItem/TodoItem';
import Button from '../../UI/Button';

const TodoList = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos, isLoading, isError, message } = useSelector(state => state.todo);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const checkAllHandler = () => {
    setCheckAll(prev => !prev);
    dispatch(checkAllTodos(isTouched));
    setIsTouched(false);
  };

  const deleteManyHandler = () => {
    dispatch(deleteTodo(finishedTodo));
  };

  const remainedTodo = todos.filter(todo => todo.checked === false);
  const finishedTodo = todos.filter(todo => todo.checked === true).map(v => v._id);
  const remained = remainedTodo.length;

  if (isLoading) {
    return <Spinner />;
  }

  if (todos.length === 0) {
    return (
      <>
        <h2>일정을 추가해보세요</h2>
        <Button
          onClick={() => {
            navigate('/create');
          }}
        >
          추가하러가기
        </Button>
      </>
    );
  }

  return (
    <section className={styles['todo-container']}>
      <ul className={styles['todo-items']}>
        {todos.map(todo => {
          return <TodoItem todo={todo} key={todo._id} setIsTouched={setIsTouched} />;
        })}
      </ul>
      {remained === 0 && (
        <div className='row'>
          <label htmlFor='all'>
            <input type='checkbox' name='all' id='all' onChange={checkAllHandler} checked={true} />
            ALL
          </label>
          <h2>아 할일 다 끝냈다!</h2>
          <Button id='delete' onClick={deleteManyHandler}>
            삭제
          </Button>
        </div>
      )}
      {remained > 0 && (
        <div className='row'>
          <label htmlFor='all'>
            <input type='checkbox' name='all' id='all' onChange={checkAllHandler} checked={checkAll} />
            ALL
          </label>
          <h2>아직 할 일이 {remained}개 남았어요.</h2>
          <Button id='delete' onClick={deleteManyHandler}>
            삭제
          </Button>
        </div>
      )}
    </section>
  );
};
export default TodoList;
