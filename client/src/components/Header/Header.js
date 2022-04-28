import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../store/auth-slice';

import styles from './Header.module.css';

function Header() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/register', { replace: true });
  };
  let content;

  if (user) {
    content = (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'>내 북~</Link>
        </div>

        <ul>
          <li>
            <button className={styles.btn} onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </header>
    );
  } else {
    content = <></>;
  }
  return <>{content}</>;
}

export default Header;
