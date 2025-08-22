// // // import React, { useState, useRef, useMemo, useCallback } from 'react';
// // // // In your main app files (src/App.js, src/components/*, etc.)
// // // import { Card } from './lib';
// // // import classNames from 'classnames';
// // // import './App.css';

// // // // Context Providers
// // // import { ThemeProvider, UserProvider, useTheme } from './contexts';

// // // // Components
// // // import {
// // //   Header,
// // //   Footer,
// // //   TaskForm,
// // //   TaskList,
// // //   TaskFilter,
// // //   TaskCounter,
// // //   SearchInput
// // // } from './components';

// // // // Hooks and utilities
// // // import { useTasks } from './hooks';
// // // import { filterTasks, sortTasksByPriority, getTaskStats, FILTER_TYPES } from './utils';

// // // // Main App Component
// // // const AppContent = () => {
// // //   const { theme } = useTheme();
// // //   const { 
// // //     tasks, 
// // //     addTask, 
// // //     toggleTask, 
// // //     deleteTask, 
// // //     updateTask, 
// // //     clearCompleted 
// // //   } = useTasks();

// // //   // Local state
// // //   const [filter, setFilter] = useState(FILTER_TYPES.ALL);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   // Refs
// // //   const searchInputRef = useRef(null);

// // //   // Memoized filtered and sorted tasks
// // //   const filteredTasks = useMemo(() => {
// // //     const filtered = filterTasks(tasks, filter, searchTerm);
// // //     return sortTasksByPriority(filtered);
// // //   }, [tasks, filter, searchTerm]);

// // //   // Memoized task statistics
// // //   const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);
// // //   const taskCounts = useMemo(() => ({
// // //     total: tasks.length,
// // //     active: tasks.filter(task => !task.completed).length,
// // //     completed: tasks.filter(task => task.completed).length
// // //   }), [tasks]);

// // //   // Callbacks
// // //   const handleAddTask = useCallback(async (taskData) => {
// // //     setIsLoading(true);
    
// // //     // Simulate API call
// // //     await new Promise(resolve => setTimeout(resolve, 500));
    
// // //     addTask(taskData);
// // //     setIsLoading(false);
// // //   }, [addTask]);

// // //   const handleSearch = useCallback((term) => {
// // //     setSearchTerm(term);
// // //   }, []);

// // //   const handleFilterChange = useCallback((newFilter) => {
// // //     setFilter(newFilter);
// // //   }, []);

// // //   const handleClearCompleted = useCallback(() => {
// // //     clearCompleted();
// // //   }, [clearCompleted]);

// // //   const focusSearch = useCallback(() => {
// // //     searchInputRef.current?.focus();
// // //   }, []);

// // //   const clearSearch = useCallback(() => {
// // //     searchInputRef.current?.clear();
// // //   }, []);

// // //   return (
// // //     <div className={classNames('app', `theme-${theme}`)}>
// // //       <Header />
      
// // //       <main className="main">
// // //         <div className="container">
// // //           {/* Hero Section */}
// // //           <section className="hero">
// // //             <h1 className="hero-title">
// // //               React Task Manager POC
// // //             </h1>
// // //             <p className="hero-subtitle">
// // //               Comprehensive demonstration of React concepts including Hooks, Context, 
// // //               Reducers, Memo, ForwardRef, HOCs, and more!
// // //             </p>
// // //           </section>

// // //           {/* Statistics */}
// // //           <section className="stats-section">
// // //             <TaskCounter tasks={tasks} />
// // //           </section>

// // //           {/* Task Form */}
// // //           <section className="form-section">
// // //             <TaskForm onSubmit={handleAddTask} />
// // //           </section>

// // //           {/* Search and Filters */}
// // //           <section className="controls-section">
// // //             <div className="search-container">
// // //               <SearchInput
// // //                 ref={searchInputRef}
// // //                 onSearch={handleSearch}
// // //                 placeholder="Search tasks..."
// // //               />
// // //             </div>
            
// // //             <TaskFilter
// // //               activeFilter={filter}
// // //               onFilterChange={handleFilterChange}
// // //               taskCounts={taskCounts}
// // //               onClearCompleted={handleClearCompleted}
// // //             />
// // //           </section>

// // //           {/* Task List */}
// // //           <section className="tasks-section">
// // //             <TaskList
// // //               tasks={filteredTasks}
// // //               onToggle={toggleTask}
// // //               onDelete={deleteTask}
// // //               onUpdate={updateTask}
// // //               isLoading={isLoading}
// // //               emptyMessage={
// // //                 searchTerm 
// // //                   ? `No tasks found for "${searchTerm}"`
// // //                   : filter === FILTER_TYPES.COMPLETED
// // //                   ? "No completed tasks yet"
// // //                   : filter === FILTER_TYPES.ACTIVE
// // //                   ? "No active tasks. Great job!"
// // //                   : "No tasks found. Add some tasks to get started!"
// // //               }
// // //             />
// // //           </section>

// // //           {/* Quick Actions */}
// // //           <section className="actions-section">
// // //             <div className="quick-actions">
// // //               <button onClick={focusSearch} className="action-button">
// // //                 🔍 Focus Search
// // //               </button>
// // //               <button onClick={clearSearch} className="action-button">
// // //                 🗑️ Clear Search
// // //               </button>
// // //               <button 
// // //                 onClick={() => setFilter(FILTER_TYPES.ALL)} 
// // //                 className="action-button"
// // //               >
// // //                 📋 Show All Tasks
// // //               </button>
// // //             </div>
// // //           </section>
// // //         </div>
// // //       </main>
      
// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // // App with Providers
// // // const App = () => {
// // //   return (
// // //     <ThemeProvider>
// // //       <UserProvider>
// // //         <AppContent />
// // //       </UserProvider>
// // //     </ThemeProvider>
// // //   );
// // // };

// // // export default App;

// // import React from 'react';
// // import './App.css';

// // // Import from your component library
// // import { Card, Button } from './lib';

// // // Import existing components from your main app
// // import {
// //   Header,
// //   Footer,
// //   TaskForm,
// //   TaskList,
// //   TaskFilter,
// //   TaskCounter,
// //   SearchInput
// // } from './components';

// // // Import contexts and hooks
// // import { ThemeProvider, UserProvider, useTheme } from './contexts';
// // import { useTasks } from './hooks';
// // import { filterTasks, sortTasksByPriority, getTaskStats, FILTER_TYPES } from './utils';

// // const AppContent = () => {
// //   const { theme } = useTheme();
// //   const { 
// //     tasks, 
// //     addTask, 
// //     toggleTask, 
// //     deleteTask, 
// //     updateTask, 
// //     clearCompleted 
// //   } = useTasks();

// //   const [filter, setFilter] = React.useState(FILTER_TYPES.ALL);
// //   const [searchTerm, setSearchTerm] = React.useState('');
// //   const [isLoading, setIsLoading] = React.useState(false);

// //   const searchInputRef = React.useRef(null);

// //   // Your existing logic...
// //   const filteredTasks = React.useMemo(() => {
// //     const filtered = filterTasks(tasks, filter, searchTerm);
// //     return sortTasksByPriority(filtered);
// //   }, [tasks, filter, searchTerm]);

// //   const taskStats = React.useMemo(() => getTaskStats(tasks), [tasks]);
// //   const taskCounts = React.useMemo(() => ({
// //     total: tasks.length,
// //     active: tasks.filter(task => !task.completed).length,
// //     completed: tasks.filter(task => task.completed).length
// //   }), [tasks]);

// //   const handleAddTask = React.useCallback(async (taskData) => {
// //     setIsLoading(true);
// //     await new Promise(resolve => setTimeout(resolve, 500));
// //     addTask(taskData);
// //     setIsLoading(false);
// //   }, [addTask]);

// //   const handleSearch = React.useCallback((term) => {
// //     setSearchTerm(term);
// //   }, []);

// //   const handleFilterChange = React.useCallback((newFilter) => {
// //     setFilter(newFilter);
// //   }, []);

// //   const handleClearCompleted = React.useCallback(() => {
// //     clearCompleted();
// //   }, [clearCompleted]);

// //   return (
// //     <div className={`app theme-${theme}`}>
// //       <Header />
      
// //       <main className="main">
// //         <div className="container">
// //           {/* Hero Section - Using Library Card Component */}
// //           <section className="hero">
// //             <Card 
// //               title="React Task Manager POC"
// //               subtitle="Comprehensive demonstration of React concepts including Hooks, Context, Reducers, Memo, ForwardRef, HOCs, and more!"
// //               variant="elevated"
// //               hoverable
// //               className="hero-card"
// //             >
// //               <div style={{ textAlign: 'center', padding: '1rem 0' }}>
// //                 <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
// //                   This application showcases modern React patterns and includes a 
// //                   reusable component library!
// //                 </p>
// //                 <Button 
// //                   variant="primary" 
// //                   onClick={() => searchInputRef.current?.focus()}
// //                 >
// //                   🚀 Start Managing Tasks
// //                 </Button>
// //               </div>
// //             </Card>
// //           </section>

// //           {/* Statistics Section - Using Library Card */}
// //           <section className="stats-section">
// //             <Card title="Task Statistics" variant="outlined">
// //               <TaskCounter tasks={tasks} />
// //             </Card>
// //           </section>

// //           {/* Task Form Section - Using Library Card */}
// //           <section className="form-section">
// //             <Card title="Add New Task" variant="default">
// //               <TaskForm onSubmit={handleAddTask} />
// //             </Card>
// //           </section>

// //           {/* Controls Section - Using Library Card */}
// //           <section className="controls-section">
// //             <Card title="Search & Filter Tasks" variant="outlined">
// //               <div style={{ marginBottom: '1rem' }}>
// //                 <SearchInput
// //                   ref={searchInputRef}
// //                   onSearch={handleSearch}
// //                   placeholder="Search tasks..."
// //                 />
// //               </div>
              
// //               <TaskFilter
// //                 activeFilter={filter}
// //                 onFilterChange={handleFilterChange}
// //                 taskCounts={taskCounts}
// //                 onClearCompleted={handleClearCompleted}
// //               />
// //             </Card>
// //           </section>

// //           {/* Task List Section - Using Library Card */}
// //           <section className="tasks-section">
// //             <Card 
// //               title={`Tasks (${filteredTasks.length})`}
// //               variant="default"
// //               actions={
// //                 <Button 
// //                   variant="secondary" 
// //                   onClick={() => setFilter(FILTER_TYPES.ALL)}
// //                 >
// //                   Show All
// //                 </Button>
// //               }
// //             >
// //               <TaskList
// //                 tasks={filteredTasks}
// //                 onToggle={toggleTask}
// //                 onDelete={deleteTask}
// //                 onUpdate={updateTask}
// //                 isLoading={isLoading}
// //                 emptyMessage={
// //                   searchTerm 
// //                     ? `No tasks found for "${searchTerm}"`
// //                     : filter === FILTER_TYPES.COMPLETED
// //                     ? "No completed tasks yet"
// //                     : filter === FILTER_TYPES.ACTIVE
// //                     ? "No active tasks. Great job!"
// //                     : "No tasks found. Add some tasks to get started!"
// //                 }
// //               />
// //             </Card>
// //           </section>

// //           {/* Quick Actions Section - Using Library Card */}
// //           <section className="actions-section">
// //             <Card 
// //               title="Quick Actions" 
// //               variant="elevated"
// //               hoverable
// //             >
// //               <div style={{ 
// //                 display: 'flex', 
// //                 gap: '1rem', 
// //                 justifyContent: 'center',
// //                 flexWrap: 'wrap'
// //               }}>
// //                 <Button 
// //                   variant="primary"
// //                   onClick={() => searchInputRef.current?.focus()}
// //                 >
// //                   🔍 Focus Search
// //                 </Button>
// //                 <Button 
// //                   variant="secondary"
// //                   onClick={() => searchInputRef.current?.clear()}
// //                 >
// //                   🗑️ Clear Search
// //                 </Button>
// //                 <Button 
// //                   variant="secondary"
// //                   onClick={() => setFilter(FILTER_TYPES.ALL)}
// //                 >
// //                   📋 Show All Tasks
// //                 </Button>
// //               </div>
// //             </Card>
// //           </section>

// //           {/* Component Library Demo Section */}
// //           <section className="demo-section" style={{ marginTop: '2rem' }}>
// //             <Card 
// //               title="Component Library Demo" 
// //               subtitle="Examples of reusable components from our library"
// //               variant="outlined"
// //               image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
// //               actions={
// //                 <div>
// //                   <Button variant="secondary" style={{ marginRight: '0.5rem' }}>
// //                     View Docs
// //                   </Button>
// //                   <Button variant="primary">
// //                     Use Components
// //                   </Button>
// //                 </div>
// //               }
// //             >
// //               <p>These cards are from your custom component library! Features include:</p>
// //               <ul>
// //                 <li>✅ Multiple variants (default, outlined, elevated)</li>
// //                 <li>✅ Configurable padding and spacing</li>
// //                 <li>✅ Support for images, actions, and hover effects</li>
// //                 <li>✅ Fully accessible and responsive</li>
// //                 <li>✅ Built with modern React patterns</li>
// //               </ul>
// //             </Card>
// //           </section>
// //         </div>
// //       </main>
      
// //       <Footer />
// //     </div>
// //   );
// // };

// // // Main App with Providers
// // const App = () => {
// //   return (
// //     <ThemeProvider>
// //       <UserProvider>
// //         <AppContent />
// //       </UserProvider>
// //     </ThemeProvider>
// //   );
// // };

// // export default App;

// import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import { ThemeProvider, UserProvider } from './contexts';
// import { Header, Footer, LoadingSpinner } from './components';
// import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

// // Lazy load pages for code splitting
// const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
// const TasksPage = React.lazy(() => import('./pages/Tasks/TasksPage'));
// const AnalyticsPage = React.lazy(() => import('./pages/Analytics/AnalyticsPage'));
// const ProfilePage = React.lazy(() => import('./pages/Profile/ProfilePage'));
// const ApiDemoPage = React.lazy(() => import('./pages/ApiDemo/ApiDemoPage'));

// const App = () => {
//   return (
//     <ErrorBoundary>
//       <ThemeProvider>
//         <UserProvider>
//           <Router>
//             <div className="app">
//               <Header />
//               <main className="main">
//                 <Suspense fallback={
//                   <div className="page-loading">
//                     <LoadingSpinner size="large" text="Loading page..." />
//                   </div>
//                 }>
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/tasks" element={<TasksPage />} />
//                     <Route path="/analytics" element={<AnalyticsPage />} />
//                     <Route path="/profile" element={<ProfilePage />} />
//                     <Route path="/api-demo" element={<ApiDemoPage />} />
//                     <Route path="*" element={<NotFoundPage />} />
//                   </Routes>
//                 </Suspense>
//               </main>
//               <Footer />
//             </div>
//           </Router>
//         </UserProvider>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// };

// // 404 Page Component
// const NotFoundPage = () => (
//   <div className="not-found">
//     <h1>404 - Page Not Found</h1>
//     <p>The page you're looking for doesn't exist.</p>
//   </div>
// );

// export default App;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, UserProvider, useTheme } from './contexts';
import { Header, Footer, LoadingSpinner } from './components';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const TasksPage = React.lazy(() => import('./pages/Tasks/TasksPage'));
const AnalyticsPage = React.lazy(() => import('./pages/Analytics/AnalyticsPage'));
const ProfilePage = React.lazy(() => import('./pages/Profile/ProfilePage'));
const ApiDemoPage = React.lazy(() => import('./pages/ApiDemo/ApiDemoPage'));

// App Content Component that has access to theme
const AppContent = () => {
  const { theme } = useTheme();

  // Apply theme class to document body
  React.useEffect(() => {
    document.body.className = `theme-${theme}`;
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={`app theme-${theme}`}>
      <Header />
      <main className="main">
        <Suspense fallback={
          <div className="page-loading">
            <LoadingSpinner size="large" text="Loading page..." />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/api-demo" element={<ApiDemoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

// 404 Page Component
const NotFoundPage = () => (
  <div className="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

// Main App with Providers
const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <Router>
            <AppContent />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;