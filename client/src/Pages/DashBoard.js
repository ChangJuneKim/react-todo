import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setNickname } from '../store/auth-slice';
import { openSnackBar } from '../store/snack-slice';

import styles from './DashBoard.module.css';
import PrivateRoute from './PrivateRoute';

const Login = () => {
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current !== null) {
      nameInputRef.current.focus();
    }

    if (user !== null) {
      nameInputRef.current.value = user.nickname;
    }
  }, [user]);

  const submitHandler = async e => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value.trim();

    const nameIsValid = enteredName !== '';
    if (!nameIsValid) {
      dispatch(openSnackBar({ type: 'fail', message: '닉네임을 입력해주세요.' }));
      return;
    }
    dispatch(setNickname(enteredName));
    // console.log(enteredName);
    navigate('/todos');
  };

  return (
    <PrivateRoute>
      <div className='center'>
        <div className={styles.book}>
          <h1>My NOTE</h1>
          <div className={`${styles.underline} underline`}></div>
          <form onSubmit={submitHandler}>
            <div className={styles['white-box']}>
              <label htmlFor='name'>닉네임</label>
              <input type='text' id='name' ref={nameInputRef} />
            </div>

            <button className={styles.btn}>
              <h3>쓰러가기</h3>
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};
export default Login;
