import StatsCard from "./StatsCard";
import ProjectsTable from "./ProjectsTable";
import UsersTable from "./UsersTable";
// import ContactMessages from "./ContactMessages";
import ChartSection from "./ChartSection";
import TasksTable from "./TasksTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import UserInquiries from "./UserInquiries";
// import ProjectsBarChart from './ProjectsBarChart';

const AdminDashboard2 = () => {
  const [stats, setStats] = useState({});
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   API.get("/api/admin/projects", {
  //     headers: { Authorization: `Bearer ${token}`},
  //   })
  //   .then(res => setProjects(res.data))
  //   .catch(err => console.error(err));
  // }, [])

  useEffect(() => {
    API.get("/api/admin/stats")
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear auth token if stored
    localStorage.removeItem("token");

    // Redirect to home page
    navigate("/home");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Projects" value={stats.totalProjects} color="bg-blue-600" />
        <StatsCard title="Total Tasks" value={stats.totalTasks} color="bg-green-600" />
        <StatsCard title="Completed Projects" value={stats.completedProjects} color="bg-purple-600" />
        <StatsCard title="Pending Projects" value={stats.pendingProjects} color="bg-red-600" />
      </div>

      {/* Charts */}
      <ChartSection />
      {/* <div className="mt-8">
        <ProjectsBarChart projects={projects} />
      </div> */}

      {/* Management Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ProjectsTable />
        
        <UsersTable />
      </div>

      {/* Tasks Management */}
      <TasksTable/>

      {/* Contact Messages */}
      {/* <div className="mt-8">
        <ContactMessages />
      </div> */}

      {/* {User Inquiries} */}
      <div className="mt-8">
        <UserInquiries/>
      </div>
    </div>
  );
};

export default AdminDashboard2;
