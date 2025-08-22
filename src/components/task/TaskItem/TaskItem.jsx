import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TaskItem.module.css';
import { useTheme } from '../../../contexts';
import { Button, Input } from '../../ui';
import { formatDate } from '../../../utils';

export const TaskItem = memo(({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdate,
  className 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const { theme } = useTheme();

  const handleSave = useCallback(() => {
    if (editText.trim() && editText.trim() !== task.title) {
      onUpdate(task.id, { title: editText.trim() });
    }
    setIsEditing(false);
  }, [editText, onUpdate, task.id, task.title]);

  const handleCancel = useCallback(() => {
    setEditText(task.title);
    setIsEditing(false);
  }, [task.title]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const priorityClass = `priority-${task.priority}`;

  return (
    <div className={classNames(
      styles.taskItem, 
      {
        [styles.completed]: task.completed,
        [styles.dark]: theme === 'dark'
      },
      className
    )}>
      <div className={styles.left}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className={styles.checkbox}
        />
        
        <div className={styles.content}>
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyPress}
              className={styles.editInput}
              autoFocus
            />
          ) : (
            <div className={styles.taskContent}>
              <span 
                className={classNames(styles.title, {
                  [styles.completedTitle]: task.completed
                })}
                onDoubleClick={() => setIsEditing(true)}
                title="Double-click to edit"
              >
                {task.title}
              </span>
              {task.createdAt && (
                <span className={styles.date}>
                  Created: {formatDate(task.createdAt)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.right}>
        <span className={classNames(styles.priority, styles[priorityClass])}>
          {task.priority}
        </span>
        
        <div className={styles.actions}>
          {!isEditing && (
            <Button
              variant="ghost"
              size="small"
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              Edit
            </Button>
          )}
          
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(task.id)}
            className={styles.deleteButton}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    createdAt: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  className: PropTypes.string
};