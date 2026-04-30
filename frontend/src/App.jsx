import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import * as api from './api/taskApi';
import { useAuth } from './hooks/useAuth';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Alert states
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const { user } = useAuth();

  // Fetch tasks on initial load if logged in
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // Sync theme with local storage and document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        showAlert('Failed to fetch tasks', 'danger');
      }
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks([newTask, ...tasks]);
      showAlert('Task added successfully!');
    } catch (error) {
      showAlert('Failed to add task', 'danger');
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const updatedTask = await api.updateTask(id, updatedData);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setEditingTask(null);
      showAlert('Task updated successfully!');
    } catch (error) {
      showAlert('Failed to update task', 'danger');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updatedTask = await api.updateTask(id, { status: newStatus });
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      showAlert('Failed to update status', 'danger');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
        showAlert('Task deleted.', 'warning');
      } catch (error) {
        showAlert('Failed to delete task', 'danger');
      }
    }
  };

  const DashboardPage = () => (
    <Container className="pb-5">
      {alert.show && (
        <Alert 
          variant={alert.variant} 
          className="border-0 premium-card mb-4 shadow-lg text-center" 
          onClose={() => setAlert({ ...alert, show: false })} 
          dismissible
          style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1060, minWidth: '300px' }}
        >
          {alert.message}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={4} className="order-2 order-lg-1">
          <div className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
            <TaskForm 
              onAdd={handleAddTask} 
              onUpdate={handleUpdateTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />
          </div>
        </Col>
        
        <Col lg={8} className="order-1 order-lg-2">
          <Dashboard tasks={tasks} />
          <TaskList 
            tasks={tasks}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      <Navbar theme={theme} setTheme={setTheme} />
      
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
