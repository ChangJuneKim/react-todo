import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../store/auth-slice';

import classes from './DashBoard.module.css';

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value.trim();
    const nameIsValid = enteredName !== '';

    if (!nameIsValid) {
      console.log('이름을 입력해주세요');
      return;
    }
    dispatch(login(enteredName));
    // console.log(enteredName);
    navigate('/todos');
  };

  return (
    <div className='center'>
      <div className={classes.book}>
        <h1>My NOTE</h1>
        <div className='underline'></div>
        <form onSubmit={submitHandler}>
          <label htmlFor='name'>name</label>
          <div className={classes['white-box']}>
            <input type='text' id='name' ref={nameInputRef} />
          </div>
          <button className={classes.btn}>
            <h3>쓰러가기</h3>
          </button>
        </form>
      </div>
    </div>
  );
};
export default DashBoard;
