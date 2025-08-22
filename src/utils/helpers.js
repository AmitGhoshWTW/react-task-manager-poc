import { PRIORITY_LEVELS, FILTER_TYPES } from './constants';

export const filterTasks = (tasks, filter, searchTerm = '') => {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === FILTER_TYPES.ALL ? true :
      filter === FILTER_TYPES.ACTIVE ? !task.completed :
      filter === FILTER_TYPES.COMPLETED ? task.completed : true;
    
    return matchesSearch && matchesFilter;
  });
};

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = {
    [PRIORITY_LEVELS.HIGH]: 3,
    [PRIORITY_LEVELS.MEDIUM]: 2,
    [PRIORITY_LEVELS.LOW]: 1
  };

  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const remaining = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    remaining,
    completionRate
  };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const validateTask = (task) => {
  const errors = {};

  if (!task.title || task.title.trim().length === 0) {
    errors.title = 'Task title is required';
  }

  if (task.title && task.title.trim().length > 200) {
    errors.title = 'Task title must be less than 200 characters';
  }

  if (!Object.values(PRIORITY_LEVELS).includes(task.priority)) {
    errors.priority = 'Invalid priority level';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};