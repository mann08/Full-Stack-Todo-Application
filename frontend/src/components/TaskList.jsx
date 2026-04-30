import React, { useState, useMemo } from 'react';
import TaskCard from './TaskCard';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { FaSearch, FaFilter, FaLayerGroup } from 'react-icons/fa';

const TaskList = ({ tasks, onUpdateStatus, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
      const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'All' || 
                            (filterStatus === 'Completed' && task.status === 'completed') ||
                            (filterStatus === 'Pending' && task.status === 'pending');
      
      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [tasks, searchTerm, filterCategory, filterPriority, filterStatus]);

  const categories = ['All', ...new Set(tasks.map(t => t.category).filter(Boolean))];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];

  // Group tasks
  const groupedTasks = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return {
      overdue: filteredTasks.filter(t => t.status !== 'completed' && t.dueDate && new Date(t.dueDate) < today),
      today: filteredTasks.filter(t => {
        if (!t.dueDate) return false;
        const d = new Date(t.dueDate);
        return d.getFullYear() === today.getFullYear() && 
               d.getMonth() === today.getMonth() && 
               d.getDate() === today.getDate();
      }),
      upcoming: filteredTasks.filter(t => t.dueDate && new Date(t.dueDate) > new Date(today.getTime() + 86400000)),
      noDate: filteredTasks.filter(t => !t.dueDate)
    };
  }, [filteredTasks]);

  const TaskSection = ({ title, tasksList, color }) => {
    if (tasksList.length === 0) return null;
    return (
      <div className="mb-4">
        <h6 className="d-flex align-items-center gap-2 mb-3 fw-bold" style={{ color: color }}>
          <FaLayerGroup size={14} />
          {title} ({tasksList.length})
        </h6>
        {tasksList.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onUpdateStatus={onUpdateStatus} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="premium-card p-3 mb-4">
        <Row className="g-3">
          <Col md={12}>
            <InputGroup className="glass-panel" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <InputGroup.Text style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                className="border-0 bg-transparent"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: 'none', color: 'var(--text-main)' }}
              />
            </InputGroup>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select 
              className="input-premium"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select 
              className="input-premium"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              {priorities.filter(p => p !== 'All').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={4}>
            <Form.Select 
              className="input-premium"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-5 premium-card">
          <div className="text-muted mb-3 h1 opacity-25">
            <FaSearch />
          </div>
          <h5 className="text-muted">No tasks found</h5>
          <p className="text-muted small">Try adjusting your filters or add a new task.</p>
        </div>
      ) : (
        <>
          <TaskSection title="Overdue" tasksList={groupedTasks.overdue} color="var(--danger)" />
          <TaskSection title="Today" tasksList={groupedTasks.today} color="var(--primary)" />
          <TaskSection title="Upcoming" tasksList={groupedTasks.upcoming} color="var(--info)" />
          <TaskSection title="No Due Date" tasksList={groupedTasks.noDate} color="var(--text-muted)" />
        </>
      )}
    </div>
  );
};

export default TaskList;
