import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../store/todo-slice';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

const CreateTodo = () => {
  const [todo, setTodo] = useState({ title: '', description: '', date: today });

  const { isLoading } = useSelector(state => state.todo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createTodo(todo));
    navigate('/todos');
  };

  const changeInputHandler = e => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='create-note'>
      <h2>목표 만들기</h2>
      <form onSubmit={submitHandler} autoComplete='off'>
        <div className='row'>
          <label htmlFor='title'>제목</label>
          <input type='text' value={todo.title} id='title' name='title' required onChange={changeInputHandler} />
        </div>

        <div className='row'>
          <label htmlFor='description'>내용</label>
          <textarea
            type='text'
            value={todo.description}
            id='description'
            name='description'
            required
            rows='10'
            onChange={changeInputHandler}
          />
        </div>

        <label htmlFor='date'>목표 날짜 : {todo.date} </label>
        <div className='row'>
          <input type='date' id='date' name='date' value={todo.date} onChange={changeInputHandler} />
        </div>

        <p>오늘은 {today} 입니다.</p>

        <Button type='submit'>Save</Button>
      </form>
    </div>
  );
};

export default CreateTodo;
