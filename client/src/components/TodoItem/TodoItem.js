import { useDispatch } from 'react-redux';
import styles from './TodoItem.module.css';
import { toggleCheckTodo, deleteTodo } from '../../store/todo-slice';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

// edit일땐 모달 띄워서 하고 새로 만들땐 생성 페이지에서 하기
const TodoItem = ({ todo }) => {
  const { _id, checked, title, description, date } = todo;
  const dispatch = useDispatch();

  const switchCompleteHandler = id => {
    dispatch(toggleCheckTodo(id));
  };

  const openEditModalHandler = () => {
    console.log('모달 열림');
    // 수정할때 모달띄워서 내용, 날짜도 수정할 수 있게 하기
  };

  const deleteTodoHandler = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <li className={styles['todo-item']}>
      <div className={styles['first-line']}>
        <div className={styles.check}>
          <input type='checkbox' id={_id} checked={checked} onChange={() => switchCompleteHandler(_id)} />
          <label htmlFor={_id} className={checked ? styles.active : ''}>
            <h1>{title}</h1>
          </label>
        </div>

        <div className={styles.buttons}>
          <button disabled={checked} onClick={openEditModalHandler}>
            수정 <FaPencilAlt />
          </button>
          <button disabled={checked} onClick={() => deleteTodoHandler(_id)}>
            삭제 <FaTrashAlt />
          </button>
        </div>
      </div>

      <div className={styles['second-line']}>
        <p className={styles.desc}>{description}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </li>
  );
};
export default TodoItem;
