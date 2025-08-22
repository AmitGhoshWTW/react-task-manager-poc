import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../lib';
import { useTasks } from '../../hooks';
import { TaskCounter } from '../../components';
import './Dashboard.css';

const Dashboard = () => {
  const { tasks } = useTasks();

  const quickStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    highPriorityTasks: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    todayTasks: tasks.filter(t => {
      const today = new Date().toDateString();
      return new Date(t.createdAt).toDateString() === today;
    }).length
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>
        <p>Welcome to your React Task Manager POC dashboard!</p>

        {/* Quick Stats */}
        <section className="stats-grid">
          <Card title="Total Tasks" variant="elevated">
            <div className="stat-number">{quickStats.totalTasks}</div>
            <Link to="/tasks">
              <Button size="small">View All</Button>
            </Link>
          </Card>

          <Card title="Completed" variant="elevated">
            <div className="stat-number">{quickStats.completedTasks}</div>
            <div className="stat-percentage">
              {quickStats.totalTasks > 0 
                ? Math.round((quickStats.completedTasks / quickStats.totalTasks) * 100)
                : 0}%
            </div>
          </Card>

          <Card title="High Priority" variant="elevated">
            <div className="stat-number urgent">{quickStats.highPriorityTasks}</div>
            <span className="stat-label">Need attention</span>
          </Card>

          <Card title="Today's Tasks" variant="elevated">
            <div className="stat-number">{quickStats.todayTasks}</div>
            <span className="stat-label">Created today</span>
          </Card>
        </section>

        {/* Main Stats */}
        <section className="main-stats">
          <TaskCounter tasks={tasks} />
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <Card title="Quick Actions" variant="outlined">
            <div className="actions-grid">
              <Link to="/tasks">
                <Button variant="primary">Manage Tasks</Button>
              </Link>
              <Link to="/analytics">
                <Button variant="secondary">View Analytics</Button>
              </Link>
              <Link to="/api-demo">
                <Button variant="outline">API Demo</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">Profile Settings</Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;