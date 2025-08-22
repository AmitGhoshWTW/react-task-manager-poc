import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TaskList.module.css';
import { TaskItem } from '../TaskItem';
import { withLoading } from '../../../hoc';

const TaskListComponent = ({ 
  tasks, 
  onToggle, 
  onDelete, 
  onUpdate,
  emptyMessage = "No tasks found. Add some tasks to get started!",
  className 
}) => {
  if (tasks.length === 0) {
    return (
      <div className={classNames(styles.emptyState, className)}>
        <div className={styles.emptyIcon}>📝</div>
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={classNames(styles.taskList, className)}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

TaskListComponent.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
  className: PropTypes.string
};

export const TaskList = withLoading(TaskListComponent);