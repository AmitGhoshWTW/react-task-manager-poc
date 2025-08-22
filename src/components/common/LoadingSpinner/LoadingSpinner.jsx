import React from 'react';
import styles from './LoadingSpinner.module.css';
import classNames from 'classnames';

export const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  className,
  text = 'Loading...' 
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div 
        className={classNames(
          styles.spinner,
          styles[size],
          styles[color]
        )}
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};