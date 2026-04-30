import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Calculate overdue tasks
  const now = new Date();
  const overdueTasks = tasks.filter(task => 
    task.status !== 'completed' && 
    task.dueDate && 
    new Date(task.dueDate) < now
  ).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <FaTasks />,
      color: 'var(--primary)',
      className: ''
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: <FaCheckCircle />,
      color: 'var(--success)',
      className: 'completed'
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: <FaClock />,
      color: 'var(--warning)',
      className: 'pending'
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      icon: <FaExclamationTriangle />,
      color: 'var(--danger)',
      className: 'overdue'
    }
  ];

  return (
    <div className="mb-4">
      <h2 className="mb-4 d-flex align-items-center gap-2">
        <span className="text-gradient">Task Overview</span>
      </h2>
      
      <Row className="g-3 mb-4">
        {stats.map((stat, idx) => (
          <Col key={idx} xs={6} md={3}>
            <div className={`premium-card stat-card ${stat.className} h-100 p-3`}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div style={{ color: stat.color, fontSize: '1.2rem' }}>
                  {stat.icon}
                </div>
                <span className="h4 mb-0 fw-bold">{stat.value}</span>
              </div>
              <div className="text-muted small fw-600 text-uppercase tracking-wider">
                {stat.title}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className="premium-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold">Overall Progress</h5>
          <span className="badge-premium" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
            {completionPercentage}% Done
          </span>
        </div>
        <div className="progress" style={{ height: '12px', borderRadius: '10px', background: 'var(--bg-base)' }}>
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ 
              width: `${completionPercentage}%`, 
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              borderRadius: '10px',
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            aria-valuenow={completionPercentage} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>
        <p className="text-muted small mt-3 mb-0">
          {completedTasks} of {totalTasks} tasks completed. {pendingTasks > 0 ? `Keep going, you have ${pendingTasks} tasks left!` : 'Excellent! All tasks are completed.'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
