import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TaskCounter.module.css';
import { getTaskStats } from '../../../utils';

export class TaskCounter extends React.Component {
  render() {
    const { tasks, className } = this.props;
    const stats = getTaskStats(tasks);

    return (
      <div className={classNames(styles.container, className)}>
        <div className={styles.header}>
          <h3 className={styles.title}>Task Statistics</h3>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.remaining}</span>
            <span className={styles.statLabel}>Remaining</span>
          </div>
        </div>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {stats.completionRate}% Complete
          </span>
        </div>
      </div>
    );
  }
}

TaskCounter.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  className: PropTypes.string
};