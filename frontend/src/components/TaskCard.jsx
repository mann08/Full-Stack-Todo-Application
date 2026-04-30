import React from 'react';
import { FaEdit, FaTrash, FaCalendarAlt, FaCheck } from 'react-icons/fa';

const TaskCard = ({ task, onUpdateStatus, onDelete, onEdit }) => {
  const isCompleted = task.status === 'completed';
  const isOverdue = !isCompleted && task.dueDate && new Date(task.dueDate) < new Date();

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      case 'Critical': return 'priority-high';
      default: return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className={`premium-card mb-3 ${isCompleted ? 'opacity-75' : ''}`}>
      <div className="d-flex align-items-start gap-3">
        <div 
          className={`checkbox-premium flex-shrink-0 mt-1 ${isCompleted ? 'checked' : ''}`}
          onClick={() => onUpdateStatus(task._id, isCompleted ? 'pending' : 'completed')}
          style={{ cursor: 'pointer' }}
        >
          {isCompleted && <FaCheck color="white" size={10} />}
        </div>

        <div className="flex-grow-1 min-w-0">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <h6 className={`mb-0 fw-bold text-truncate ${isCompleted ? 'text-decoration-line-through text-muted' : ''}`} style={{ fontSize: '1.1rem' }}>
              {task.title}
            </h6>
            <div className="d-flex gap-1 flex-shrink-0">
              <button 
                className="btn btn-link p-1 text-muted"
                onClick={() => onEdit(task)}
                style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <FaEdit />
              </button>
              <button 
                className="btn btn-link p-1 text-muted"
                onClick={() => onDelete(task._id)}
                style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = 'var(--danger)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <p className="text-muted small mb-3">
            {task.description || "No description provided."}
          </p>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className={`badge-premium ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
            <span className="badge-premium" style={{ background: 'var(--bg-base)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>
              {task.category || 'General'}
            </span>
            <div className={`ms-auto d-flex align-items-center gap-1 small ${isOverdue ? 'text-danger fw-bold' : 'text-muted'}`}>
              <FaCalendarAlt size={12} />
              {formatDate(task.dueDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
