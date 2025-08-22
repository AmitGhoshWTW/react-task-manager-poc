// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import styles from './Button.module.css';

// export const Button = ({
//   children,
//   variant = 'primary',
//   size = 'medium',
//   disabled = false,
//   loading = false,
//   onClick,
//   type = 'button',
//   className,
//   icon,
//   ...props
// }) => {
//   const buttonClasses = classNames(
//     styles.button,
//     styles[variant],
//     styles[size],
//     {
//       [styles.loading]: loading,
//       [styles.disabled]: disabled,
//       [styles.withIcon]: icon,
//     },
//     className
//   );

//   return (
//     <button
//       type={type}
//       className={buttonClasses}
//       onClick={onClick}
//       disabled={disabled || loading}
//       {...props}
//     >
//       {loading && <span className={styles.spinner} />}
//       {icon && !loading && <span className={styles.icon}>{icon}</span>}
//       <span className={loading ? styles.hiddenText : ''}>{children}</span>
//     </button>
//   );
// };

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'outline']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   disabled: PropTypes.bool,
//   loading: PropTypes.bool,
//   onClick: PropTypes.func,
//   type: PropTypes.oneOf(['button', 'submit', 'reset']),
//   className: PropTypes.string,
//   icon: PropTypes.node,
// };

import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) => {
  const buttonClass = [
    'lib-button',
    `lib-button--${variant}`,
    `lib-button--${size}`,
    disabled && 'lib-button--disabled',
    loading && 'lib-button--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      style={style}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="lib-button__spinner" />
      )}
      <span className={loading ? 'lib-button__text--hidden' : 'lib-button__text'}>
        {children}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  style: PropTypes.object
};