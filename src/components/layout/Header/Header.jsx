import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Header.module.css';
import { useTheme, useUser } from '../../../contexts';
import { Button } from '../../../lib';

export const Header = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/analytics', label: 'Analytics', icon: '📊' },
    { path: '/api-demo', label: 'API Demo', icon: '🔌' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <h1 className={styles.title}>Task Manager</h1>
            <span className={styles.subtitle}>React POC</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={classNames(
                styles.navLink,
                { [styles.active]: location.pathname === item.path }
              )}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className={styles.right}>
          <div className={styles.userInfo}>
            <img 
              src={user.avatar} 
              alt={user.name}
              className={styles.avatar}
            />
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="small"
            onClick={toggleTheme}
            className={styles.themeToggle}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string
};