import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout, reset } from '../../../store/auth-slice';

import styles from './Dropdown.module.css';

const menuList = [
  { id: 0, title: '마이 페이지', path: 'info' },
  { id: 1, title: '설정', path: 'settings' },
];

const Dropdown = ({ user, closeMenu }) => {
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownHandler = () => {
    setDropdown(prev => !prev);
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <li //
      className={styles.dropdown}
      onClick={dropdownHandler}
    >
      {user.nickname}
      <FaCaretDown />
      {dropdown && (
        <ul className={`${styles['dropdown-items']} ${dropdown ? styles.show : ''}`}>
          {menuList.map(item => {
            const { title, path, id } = item;
            return (
              <li key={id} className={styles['dropdown-item']} onClick={closeMenu}>
                <Link to={path}>{title}</Link>
              </li>
            );
          })}
          <li className={styles['dropdown-item']} onClick={logoutHandler}>
            로그아웃
          </li>
        </ul>
      )}
    </li>
  );
};
export default Dropdown;
