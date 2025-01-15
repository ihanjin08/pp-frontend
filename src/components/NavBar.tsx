import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>IB Grader</div>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.navbarLink} ${styles.active}` : styles.navbarLink
            }
          >
            Grade
          </NavLink>
        </li>
        <li className={styles.navbarItem}>
          <NavLink 
            to="/how-to-use" 
            className={({ isActive }) => 
              isActive ? `${styles.navbarLink} ${styles.active}` : styles.navbarLink
            }
          >
            How to Use
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
