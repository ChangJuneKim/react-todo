import { NavLink } from 'react-router-dom';

import styles from './NavItems.module.css';

import Dropdown from '../Dropdown/Dropdown';

const itemList = [
  { id: 0, title: '목록', path: 'todos' },
  { id: 1, title: '목표만들기', path: 'create' },
];

const NavItems = ({ user, show, closeMenu }) => {
  return (
    <ul className={`${styles['nav-items']} ${show ? styles.active : ''}`}>
      {itemList.map(item => {
        const { title, path, id } = item;
        return (
          <li key={id} onClick={closeMenu}>
            <NavLink to={path} className={navData => (navData.isActive ? styles.active : '')}>
              {title}
            </NavLink>
          </li>
        );
      })}

      <Dropdown user={user} closeMenu={closeMenu} />
    </ul>
  );
};
export default NavItems;
