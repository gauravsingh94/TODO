import axios from "axios";

const API_URL = `https://todo-bay-eight-36.vercel.app`;

// Sign up
export const signUp = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return await axios.post(`${API_URL}/auth/signup`, data);
};

// Login
export const login = async (data: { email: string; password: string }) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

// Get all todos
export const getAllTodos = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get todo by ID
export const getTodoById = async (id: string) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Create todo
export const createTodo = async (data: {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
}) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${API_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete todo
export const deleteTodo = async (id: string) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update todo
export const updateTodo = async (
  id: string,
  data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
  },
) => {
  const token = localStorage.getItem("token");
  console.log(`${API_URL}/tasks/${id}`);
  return await axios.put(`${API_URL}/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
