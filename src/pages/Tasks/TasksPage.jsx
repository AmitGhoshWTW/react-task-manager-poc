import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Card } from '../../lib';
import {
  TaskForm,
  TaskList,
  TaskFilter,
  TaskCounter,
  SearchInput
} from '../../components';
import { useTasks } from '../../hooks';
import { filterTasks, sortTasksByPriority, FILTER_TYPES } from '../../utils';
import './TasksPage.css';

const TasksPage = () => {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    updateTask, 
    clearCompleted 
  } = useTasks();

  const [filter, setFilter] = useState(FILTER_TYPES.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchInputRef = useRef(null);

  // Memoized filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter, searchTerm);
    return sortTasksByPriority(filtered);
  }, [tasks, filter, searchTerm]);

  const taskCounts = useMemo(() => ({
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  }), [tasks]);

  // Callbacks
  const handleAddTask = useCallback(async (taskData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addTask(taskData);
    setIsLoading(false);
  }, [addTask]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleClearCompleted = useCallback(() => {
    clearCompleted();
  }, [clearCompleted]);

  return (
    <div className="tasks-page">
      <div className="container">
        <div className="tasks-header">
          <h1>Task Management</h1>
          <p>Create, organize, and track your tasks efficiently</p>
        </div>

        {/* Statistics */}
        <section className="tasks-stats">
          <TaskCounter tasks={tasks} />
        </section>

        {/* Task Form */}
        <section className="tasks-form">
          <Card title="Add New Task" variant="outlined">
            <TaskForm onSubmit={handleAddTask} />
          </Card>
        </section>

        {/* Search and Filters */}
        <section className="tasks-controls">
          <Card title="Search & Filter" variant="default">
            <div className="controls-content">
              <div className="search-section">
                <SearchInput
                  ref={searchInputRef}
                  onSearch={handleSearch}
                  placeholder="Search tasks..."
                />
              </div>
              
              <TaskFilter
                activeFilter={filter}
                onFilterChange={handleFilterChange}
                taskCounts={taskCounts}
                onClearCompleted={handleClearCompleted}
              />
            </div>
          </Card>
        </section>

        {/* Task List */}
        <section className="tasks-list">
          <Card 
            title={`Tasks (${filteredTasks.length})`}
            variant="default"
            className="tasks-list-card"
          >
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
              isLoading={isLoading}
              emptyMessage={
                searchTerm 
                  ? `No tasks found for "${searchTerm}"`
                  : filter === FILTER_TYPES.COMPLETED
                  ? "No completed tasks yet"
                  : filter === FILTER_TYPES.ACTIVE
                  ? "No active tasks. Great job!"
                  : "No tasks found. Add some tasks to get started!"
              }
            />
          </Card>
        </section>
      </div>
    </div>
  );
};

export default TasksPage;