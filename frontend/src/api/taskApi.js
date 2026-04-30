import axios from 'axios';

// Base API URL for backend
const API_URL = 'http://localhost:5000/api/tasks';

const getConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data;
};

// Create new task
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getConfig());
  return response.data;
};

// Update a task (status, title, description)
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, getConfig());
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getConfig());
  return response.data;
};
