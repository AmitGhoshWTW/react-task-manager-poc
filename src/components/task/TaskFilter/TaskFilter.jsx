import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TaskFilter.module.css';
import { Button } from '../../ui';
import { FILTER_TYPES } from '../../../utils';

export const TaskFilter = ({ 
  activeFilter, 
  onFilterChange, 
  taskCounts,
  onClearCompleted,
  className 
}) => {
  const filters = [
    { key: FILTER_TYPES.ALL, label: 'All', count: taskCounts.total },
    { key: FILTER_TYPES.ACTIVE, label: 'Active', count: taskCounts.active },
    { key: FILTER_TYPES.COMPLETED, label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.filters}>
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={classNames(
              styles.filterButton,
              {
                [styles.active]: activeFilter === filter.key
              }
            )}
          >
            {filter.label}
            <span className={styles.count}>({filter.count})</span>
          </button>
        ))}
      </div>
      
      <div className={styles.actions}>
        <Button
          variant="danger"
          size="small"
          onClick={onClearCompleted}
          disabled={taskCounts.completed === 0}
          className={styles.clearButton}
        >
          Clear Completed ({taskCounts.completed})
        </Button>
      </div>
    </div>
  );
};

TaskFilter.propTypes = {
  activeFilter: PropTypes.oneOf(Object.values(FILTER_TYPES)).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  taskCounts: PropTypes.shape({
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired
  }).isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  className: PropTypes.string
};