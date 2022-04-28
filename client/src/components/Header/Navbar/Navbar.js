import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import styles from './Navbar.module.css';
import NavItems from '../NavItems/NavItems';

const Navbar = ({ user }) => {
  const [toggle, setToggle] = useState(false);

  const toggleIconHandler = () => {
    setToggle(prev => !prev);
  };

  const closeMobileMenuHandler = () => {
    setToggle(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <h1>
          <Link to='/'>My NOTE</Link>
        </h1>
      </div>
      <div className={styles.menu} onClick={toggleIconHandler}>
        {toggle ? <FaTimes /> : <FaBars />}
      </div>
      <NavItems user={user} show={toggle} closeMenu={closeMobileMenuHandler} />
    </nav>
  );
};
export default Navbar;
