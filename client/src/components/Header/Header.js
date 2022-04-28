import { useSelector } from 'react-redux';

import styles from './Header.module.css';

import Navbar from './Navbar/Navbar';

function Header() {
  const { user } = useSelector(state => state.auth);

  let content;

  if (user) {
    content = (
      <header className={styles.header}>
        <Navbar user={user} />
      </header>
    );
  } else {
    content = <></>;
  }
  return <>{content}</>;
}

export default Header;
