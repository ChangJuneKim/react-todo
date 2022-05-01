import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import dayjs from 'dayjs';

import { toggleCheckTodo, deleteTodo } from '../../store/todo-slice';
import Modal from '../../UI/Modal';

import styles from './TodoItem.module.css';

// edit일땐 모달 띄워서 하고 새로 만들땐 생성 페이지에서 하기
const TodoItem = ({ todo, setIsTouched }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { _id, checked, title, description, date } = todo;
  const dispatch = useDispatch();

  const switchCompleteHandler = id => {
    setIsTouched(true);
    dispatch(toggleCheckTodo(id));
  };

  const openEditModalHandler = () => {
    setIsEditing(true);
    // 수정할때 모달띄워서 내용, 날짜도 수정할 수 있게 하기
  };

  const deleteTodoHandler = id => {
    dispatch(deleteTodo(id));
  };

  const today = dayjs();
  const expiredAt = dayjs(date);
  const d_day = Math.floor(expiredAt.diff(today, 'day', true)) + 1;

  return (
    <>
      {isEditing && <Modal closeModal={setIsEditing} todo={todo} />}

      <li className={styles['todo-item']}>
        <div className={styles['first-line']}>
          <div className={styles.check}>
            <input type='checkbox' id={_id} checked={checked} onChange={() => switchCompleteHandler(_id)} />
            <label htmlFor={_id} className={checked ? styles.checked : styles.unchecked}>
              <h1>{title}</h1>
            </label>
          </div>

          <div className={styles.icons}>
            <button disabled={checked} onClick={openEditModalHandler}>
              <FaPencilAlt />
            </button>
            <button disabled={checked} onClick={() => deleteTodoHandler(_id)}>
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <div className={`${styles['second-line']} ${checked ? styles.checked : styles.unchecked}`}>
          <p className={styles.desc}>{description}</p>
          {d_day === 0 ? <p className={styles.date}>오늘이 마감이에요!</p> : <p className={styles.date}>D - {d_day}</p>}
        </div>
      </li>
    </>
  );
};
export default TodoItem;
