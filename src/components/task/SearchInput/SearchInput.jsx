import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './SearchInput.module.css';
import { useDebounce } from '../../../hooks';
import { Input } from '../../ui';

export const SearchInput = forwardRef(({ 
  onSearch, 
  placeholder = "Search tasks...",
  delay = 300,
  className 
}, ref) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, delay);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setSearchTerm('');
    },
    getValue: () => searchTerm
  }));

  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.inputWrapper}>
        <div className={styles.searchIcon}>
          🔍
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className={styles.clearButton}
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  delay: PropTypes.number,
  className: PropTypes.string
};