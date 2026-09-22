import { useEffect, useState } from "react";
import { getMemberDashboard } from "../services/dashboardService";
import Layout from "../components/Layout";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState(null);

  const loadDashboard = async () => {
    try {
      const res = await getMemberDashboard();
      setStats(res.data);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <Layout>
        <div>Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="p-4 border rounded shadow">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-600">
            {stats.completed}
          </p>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-gray-500">In Progress</h2>
          <p className="text-2xl font-bold text-blue-600">
            {stats.inProgress}
          </p>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-2xl font-bold text-red-500">
            {stats.pending}
          </p>
        </div>

      </div>
    </Layout>
  );
}