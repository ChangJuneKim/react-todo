import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Button from './Button';

import styles from './Modal.module.css';
import dayjs from 'dayjs';
import { updateTodo } from '../store/todo-slice';

const Backdrop = ({ closeModal }) => {
  return <div className={styles.backdrop} onClick={() => closeModal(false)} />;
};

const ModalOverlay = ({ todo, closeModal }) => {
  const dispatch = useDispatch();

  const { title, description, date, _id } = todo;
  const newDate = dayjs(date).format('YYYY-MM-DD');
  const [updatedTodo, setUpdatedTodo] = useState({ title: title, description: description, date: newDate });

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateTodo({ todoId: _id, data: updatedTodo }));
    closeModal(false);
  };

  const changeInputHandler = e => {
    const { name, value } = e.target;
    setUpdatedTodo({ ...updatedTodo, [name]: value });
  };

  return (
    <Card className={styles.modal}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2>수정</h2>
        </header>
        <form onSubmit={submitHandler} autoComplete='off'>
          <div className='row'>
            <input
              type='text'
              value={updatedTodo.title}
              id='title'
              name='title'
              required
              onChange={changeInputHandler}
            />
          </div>

          <div className='row'>
            <textarea
              type='text'
              value={updatedTodo.description}
              id='description'
              name='description'
              required
              rows='10'
              onChange={changeInputHandler}
            />
          </div>

          <div className='row'>
            <p>{updatedTodo.date}</p>
            <input type='date' id='date' name='date' value={updatedTodo.date} onChange={changeInputHandler} />
          </div>
          <footer className={styles.actions}>
            <Button type='submit'>수정</Button>
            <Button onClick={() => closeModal(false)}>닫기</Button>
          </footer>
        </form>
      </div>
    </Card>
  );
};

const Modal = ({ todo, closeModal }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop closeModal={closeModal} />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(
        <ModalOverlay todo={todo} closeModal={closeModal} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default Modal;
