import API from "../api/axios";

export const createProject = (data) => API.post("/projects", data);

export const getProjects = () => API.get("/projects");

// optional (if you added backend API)
export const addMember = (projectId, userId) =>
API.post(`/projects/${projectId}/members`, { userId });