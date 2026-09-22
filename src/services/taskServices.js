import API from "../api/axios";

export const createTask = (data) => API.post("/tasks", data);

export const getTasksByProject = (projectId) =>
  API.get(`/tasks?projectId=${projectId}`);

export const updateTaskStatus = (taskId, status) =>
  API.patch(`/tasks/${taskId}`, { status });