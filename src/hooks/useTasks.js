import { useReducer, useEffect, useCallback } from 'react';
import { tasksReducer } from '../reducers';
import { useLocalStorage } from './useLocalStorage';

export const useTasks = () => {
  const [savedTasks] = useLocalStorage('tasks', []);
  const [tasks, dispatch] = useReducer(tasksReducer, savedTasks);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        ...taskData,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const updateTask = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  const loadTasks = useCallback((tasks) => {
    dispatch({ type: 'LOAD_TASKS', payload: tasks });
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    loadTasks
  };
};