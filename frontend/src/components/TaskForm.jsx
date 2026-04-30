import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const TaskForm = ({ onAdd, onUpdate, editingTask, setEditingTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Work',
    dueDate: ''
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'Medium',
        category: editingTask.category || 'Work',
        dueDate: editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'Work',
        dueDate: ''
      });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onUpdate(editingTask._id, formData);
    } else {
      onAdd(formData);
      setFormData({ title: '', description: '', priority: 'Medium', category: 'Work', dueDate: '' });
    }
  };

  return (
    <div className="premium-card mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h4>
        {editingTask && (
          <button 
            className="btn btn-link p-0 text-muted" 
            onClick={() => setEditingTask(null)}
          >
            <FaTimes />
          </button>
        )}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-uppercase text-muted">Title</Form.Label>
          <Form.Control
            type="text"
            className="input-premium"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-uppercase text-muted">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="input-premium"
            placeholder="Add some details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>

        <div className="row g-3 mb-4">
          <div className="col-6">
            <Form.Label className="small fw-bold text-uppercase text-muted">Priority</Form.Label>
            <Form.Select
              className="input-premium"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Label className="small fw-bold text-uppercase text-muted">Category</Form.Label>
            <Form.Select
              className="input-premium"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="General">General</option>
            </Form.Select>
          </div>
        </div>

        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-uppercase text-muted">Due Date</Form.Label>
          <Form.Control
            type="date"
            className="input-premium"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </Form.Group>

        <Button 
          type="submit" 
          className="btn-premium btn-primary-premium w-100"
        >
          {editingTask ? <><FaSave /> Update Task</> : <><FaPlus /> Create Task</>}
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
