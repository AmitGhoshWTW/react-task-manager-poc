import React, { useMemo } from 'react';
import { Card } from '../../lib';
import { useTasks } from '../../hooks';
import { getTaskStats } from '../../utils';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { tasks } = useTasks();

  const analytics = useMemo(() => {
    const stats = getTaskStats(tasks);
    const now = new Date();
    
    // Tasks by priority
    const priorityBreakdown = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    };

    // Tasks by day of week
    const dayBreakdown = tasks.reduce((acc, task) => {
      const day = new Date(task.createdAt).toLocaleDateString('en-US', { weekday: 'long' });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    // Recent activity (last 7 days)
    const recentTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return taskDate >= weekAgo;
    });

    return {
      ...stats,
      priorityBreakdown,
      dayBreakdown,
      recentTasks: recentTasks.length,
      averageTasksPerDay: tasks.length > 0 ? (tasks.length / 7).toFixed(1) : 0
    };
  }, [tasks]);

  return (
    <div className="analytics-page">
      <div className="container">
        <div className="analytics-header">
          <h1>Task Analytics</h1>
          <p>Insights and statistics about your task management</p>
        </div>

        {/* Overview Stats */}
        <section className="analytics-overview">
          <div className="stats-grid">
            <Card title="Total Tasks" variant="elevated">
              <div className="stat-number">{analytics.total}</div>
              <div className="stat-label">All time</div>
            </Card>

            <Card title="Completion Rate" variant="elevated">
              <div className="stat-number">{analytics.completionRate}%</div>
              <div className="stat-label">Tasks completed</div>
            </Card>

            <Card title="Recent Activity" variant="elevated">
              <div className="stat-number">{analytics.recentTasks}</div>
              <div className="stat-label">Last 7 days</div>
            </Card>

            <Card title="Daily Average" variant="elevated">
              <div className="stat-number">{analytics.averageTasksPerDay}</div>
              <div className="stat-label">Tasks per day</div>
            </Card>
          </div>
        </section>

        {/* Priority Breakdown */}
        <section className="analytics-section">
          <Card title="Tasks by Priority" variant="outlined">
            <div className="priority-breakdown">
              <div className="priority-item">
                <div className="priority-bar">
                  <div 
                    className="priority-fill priority-high"
                    style={{ width: `${analytics.total > 0 ? (analytics.priorityBreakdown.high / analytics.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="priority-info">
                  <span className="priority-label">High Priority</span>
                  <span className="priority-count">{analytics.priorityBreakdown.high}</span>
                </div>
              </div>

              <div className="priority-item">
                <div className="priority-bar">
                  <div 
                    className="priority-fill priority-medium"
                    style={{ width: `${analytics.total > 0 ? (analytics.priorityBreakdown.medium / analytics.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="priority-info">
                  <span className="priority-label">Medium Priority</span>
                  <span className="priority-count">{analytics.priorityBreakdown.medium}</span>
                </div>
              </div>

              <div className="priority-item">
                <div className="priority-bar">
                  <div 
                    className="priority-fill priority-low"
                    style={{ width: `${analytics.total > 0 ? (analytics.priorityBreakdown.low / analytics.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="priority-info">
                  <span className="priority-label">Low Priority</span>
                  <span className="priority-count">{analytics.priorityBreakdown.low}</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Day Breakdown */}
        <section className="analytics-section">
          <Card title="Tasks Created by Day" variant="outlined">
            <div className="day-breakdown">
              {Object.entries(analytics.dayBreakdown).map(([day, count]) => (
                <div key={day} className="day-item">
                  <span className="day-name">{day}</span>
                  <div className="day-bar">
                    <div 
                      className="day-fill"
                      style={{ 
                        width: `${Math.max((count / Math.max(...Object.values(analytics.dayBreakdown))) * 100, 5)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="day-count">{count}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsPage;