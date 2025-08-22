import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TaskForm.module.css';
import { Button, Input, Select } from '../../ui';
import { PRIORITY_LEVELS } from '../../../utils';
import { validateTask } from '../../../utils';

export const TaskForm = ({ 
  onSubmit, 
  className,
  initialValues = { title: '', priority: PRIORITY_LEVELS.MEDIUM }
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef(null);

  const priorityOptions = [
    { value: PRIORITY_LEVELS.LOW, label: 'Low' },
    { value: PRIORITY_LEVELS.MEDIUM, label: 'Medium' },
    { value: PRIORITY_LEVELS.HIGH, label: 'High' }
  ];

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateTask(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData(initialValues);
      setErrors({});
      titleInputRef.current?.focus();
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.title}>Add New Task</h3>
      
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            ref={titleInputRef}
            label="Task Title"
            value={formData.title}
            onChange={handleInputChange('title')}
            onKeyPress={handleKeyPress}
            placeholder="Enter task title..."
            error={errors.title}
            required
            className={styles.titleInput}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <Select
            label="Priority"
            value={formData.priority}
            onChange={handleInputChange('priority')}
            options={priorityOptions}
            error={errors.priority}
            className={styles.prioritySelect}
          />
        </div>
        
        <div className={styles.actions}>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!formData.title.trim() || isSubmitting}
            className={styles.submitButton}
          >
            Add Task
          </Button>
          
          {formData.title && (
            <Button
              variant="ghost"
              onClick={() => {
                setFormData(initialValues);
                setErrors({});
                titleInputRef.current?.focus();
              }}
              className={styles.clearButton}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    priority: PropTypes.oneOf(Object.values(PRIORITY_LEVELS))
  })
};