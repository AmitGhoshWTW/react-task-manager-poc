import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Footer.module.css';

export const Footer = ({ className }) => {
  return (
    <footer className={classNames(styles.footer, className)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.text}>
            React POC demonstrating: Hooks, Context, Reducers, Memo, ForwardRef, 
            HOCs, Class Components, Local Storage, and more!
          </p>
          <div className={styles.links}>
            <a 
              href="https://reactjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              React Docs
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 Task Manager POC. Built with React {React.version}
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};