import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Card.module.css';

export const Card = ({
  children,
  title,
  subtitle,
  image,
  actions,
  variant = 'default',
  padding = 'medium',
  shadow = true,
  hoverable = false,
  className,
  ...props
}) => {
  const cardClasses = classNames(
    styles.card,
    styles[variant],
    styles[padding],
    {
      [styles.shadow]: shadow,
      [styles.hoverable]: hoverable,
    },
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {image && (
        <div className={styles.imageContainer}>
          {typeof image === 'string' ? (
            <img src={image} alt={title || 'Card image'} className={styles.image} />
          ) : (
            image
          )}
        </div>
      )}
      
      <div className={styles.content}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        
        <div className={styles.body}>
          {children}
        </div>
        
        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  shadow: PropTypes.bool,
  hoverable: PropTypes.bool,
  className: PropTypes.string,
};