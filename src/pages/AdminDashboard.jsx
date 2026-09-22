import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completed: 0,
    pending: 0,
  });

  const loadStats = async () => {
    try {
      const res = await API.get("/dashboard/admin"); 
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h3>Total Projects</h3>
          <p className="text-2xl font-bold">{stats.totalProjects}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h3>Total Tasks</h3>
          <p className="text-2xl font-bold">{stats.totalTasks}</p>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
          <h3>Completed</h3>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded-xl shadow">
          <h3>Pending</h3>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = "/projects"}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Create Project
        </button>

        <button
          onClick={() => window.location.href = "/tasks"}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Manage Tasks
        </button>
      </div>
    </Layout>
  );
}