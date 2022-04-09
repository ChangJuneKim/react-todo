import { useSelector } from 'react-redux';
import Calendar from '../components/Calendar/Calendar';
import Time from '../components/Time/Time';
import TodoList from '../components/TodoList/TodoList';
import classes from './Todos.module.css';

const Todos = () => {
  const { username } = useSelector(state => state.auth);

  return (
    <>
      <h1 className={classes.title}>{username} 님의 TodoList</h1>
      <div className={classes.todo}>
        <aside className={classes['calendar-container']}>
          <Time />
          <Calendar />
        </aside>
        <section className={classes['todo-container']}>
          <TodoList />
        </section>
      </div>
    </>
  );
};
export default Todos;
