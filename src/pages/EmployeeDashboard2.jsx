import { useNavigate } from "react-router-dom";
import StatsCard from "./StatsCard";
import MyTasksTable from "./MyTasksTable";
import MyProjects from "./MyProjects";
import ActivityFeed from "./ActivityFeed";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const EmployeeDashboard2 = () => {
  const navigate = useNavigate();
  // const employeeId = "22222222-2222-2222-2222-222222222222";
  const [stats, setStats] = useState({
    assignedTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  overdueTasks: 0,
});
  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);
  const employeeId = decoded.sub;


  useEffect(() => {
    API.get(`api/employees/${employeeId}/stats`, {
      headers: { Authorization : `Bearer ${token}`},
    })
    .then((res) => setStats(res.data))
    .catch((err) => console.error("Error fetching employee stats:",err));
  }, [employeeId, token]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/home"); // redirect to home
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Assigned Tasks" value={stats.assignedTasks} color="bg-blue-600" />
        <StatsCard title="Completed Tasks" value={stats.completedTasks} color="bg-green-600" />
        <StatsCard title="Pending Tasks" value={stats.pendingTasks} color="bg-yellow-500" />
        <StatsCard title="Overdue Tasks" value={stats.overdueTasks} color="bg-red-600" />
      </div>

      {/* My Tasks */}
      <div className="mb-8">
        <MyTasksTable employeeId={employeeId}/>
      </div>

      {/* My Projects */}
      <div className="mb-8">
        <MyProjects employeeId={employeeId}/>
      </div>

      {/* Activity Feed */}
      <div className="mb-8">
        <ActivityFeed employeeId={employeeId}/>
      </div>
    </div>
  );
};

export default EmployeeDashboard2;
