import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './Register.module.css';

import { signUp, login, reset } from '../store/auth-slice';
import { openSnackBar } from '../store/snack-slice';
import Spinner from '../UI/Spinner';
import Input from '../components/Input/Input';

const regSchema = yup.object().shape({
  username: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20),
});

const Register = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  const [isRegister, setIsRegister] = useState(false); // 회원가입 폼이냐 로그인 폼이냐

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regSchema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (isError) {
      dispatch(openSnackBar({ message, type: 'fail' }));
    }
    if (isSuccess) {
      navigate('/', { replace: true });
      dispatch(openSnackBar({ message, type: 'success' }));
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const submitHandler = async data => {
    if (isRegister) {
      dispatch(signUp(data));
    } else {
      dispatch(login(data));
    }
  };

  const toggleHandler = () => {
    setIsRegister(prev => !prev);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <section className={`${styles.info} ${isRegister ? '' : styles.reverse}`}>히히히</section>

      <section className={`${styles.form} ${isRegister ? '' : styles.reverse}`}>
        <h2 className={styles.title}>나만의 노트를 가져보세요</h2>
        <div className='underline'></div>

        <form onSubmit={isRegister ? handleSubmit(submitHandler) : handleSubmit2(submitHandler)}>
          <div className={styles['form-group']}>
            {isRegister && (
              <Input
                id='username'
                type='text'
                label='이름'
                placeholder='이름을 입력해주세요...'
                register={isRegister ? register : register2}
                errors={isRegister ? errors : errors2}
                message='이름은 필수 항목입니다.'
              />
            )}

            <Input
              id='email'
              type='email'
              label='이메일'
              placeholder='이메일을 입력해주세요...'
              register={isRegister ? register : register2}
              errors={isRegister ? errors : errors2}
              message='이메일은 필수 항목입니다.'
            />

            <Input
              id='password'
              type='password'
              label='비밀번호'
              placeholder='비밀번호를 입력해주세요...'
              register={isRegister ? register : register2}
              errors={isRegister ? errors : errors2}
              message='비밀번호는 최소 6자리 이상이어야 합니다.'
            />

            {isRegister && (
              <Input
                id='confirmPassword'
                type='password'
                label='비밀번호 확인'
                placeholder='비밀번호를 다시 입력해주세요...'
                register={isRegister ? register : register2}
                errors={isRegister ? errors : errors2}
                message='패스워드가 일치하지 않습니다.'
              />
            )}
          </div>
          <div className={styles.action}>
            <button className={styles.btn}>{isRegister ? '회원가입' : '로그인'}</button>
            {isRegister ? (
              <p onClick={toggleHandler}>
                이미 계정이 있습니다. <u>로그인</u>
              </p>
            ) : (
              <p onClick={toggleHandler}>
                아직 계정이 없으신가요? <u>회원가입</u>
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};
export default Register;
