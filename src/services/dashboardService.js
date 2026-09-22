import API from "../api/axios";

export const getMemberDashboard = () => {
  return API.get("/dashboard/member");
};