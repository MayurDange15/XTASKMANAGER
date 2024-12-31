import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8082/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (formData) => {
  await axios.post(API_URL, formData);
};

export const updateTask = async (taskId, taskData) => {
  await axios.patch(`${API_URL}/${taskId}`, taskData);
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};

export const markTaskAsDone = async (taskId) => {
  await axios.patch(`${API_URL}/${taskId}`, { status: "DONE" });
};
