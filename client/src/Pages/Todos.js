import { useSelector } from 'react-redux';
import Calendar from '../components/Calendar/Calendar';
import Time from '../components/Time/Time';
import TodoList from '../components/TodoList/TodoList';
import PrivateRoute from './PrivateRoute';
import styles from './Todos.module.css';

const Todos = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <PrivateRoute>
      <div className={styles.container}>
        <h1 className={styles.title}>{user?.nickname} 님의 TodoList</h1>
        <div className={styles.todo}>
          <aside className={styles['calendar-container']}>
            <Time />
            <Calendar />
          </aside>
          <section className={styles['todo-container']}>
            <TodoList />
          </section>
        </div>
      </div>
    </PrivateRoute>
  );
};
export default Todos;
