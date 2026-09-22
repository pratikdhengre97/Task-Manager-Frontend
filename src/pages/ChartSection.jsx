import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
import { useEffect, useState } from "react";
import API from "../api/axios";




// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);

const statusColors = {
  TODO: "#f87171",        // red
  IN_PROGRESS: "#facc15", // yellow
  PENDING: "#3b82f6",     // blue
  COMPLETED: "#22c55e",   // green
};

const ChartSection = () => {
  const [statusCounts, setStatusCounts] = useState({});
  const [projectCounts, setProjectsCounts] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/api/admin/tasks/status-counts", {
      headers: { Authorization : `Bearer ${token}`},
    })
    .then((res) => setStatusCounts(res.data))
    .catch((err) => console.error(err));

    API.get("/api/admin/tasks/overview/projects", {
      headers : {Authorization : `Bearer ${token}`},
    })

    .then((res) => setProjectsCounts(res.data))
    .catch((err) => console.error(err));
  }, []);


  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Tasks",
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          (status) => statusColors[status] || "#9ca3af"
        ),
        borderColor: ["#fff", "#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: Object.keys(projectCounts),
    datasets: [
      {
        label: "Tasks per Project",
        // data: projects.map(p=> p.tasks),
        data: Object.values(projectCounts),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // blue
          // "rgba(16, 185, 129, 0.8)", // green
          // "rgba(244, 114, 182, 0.8)", // pink
        ],
        borderRadius: 6, // 👈 rounded bars
        barThickness: 40, // 👈 custom thickness
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position : "bottom"},
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#d1d5db",
      },
      datalabels: {
        color : "#fff",
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a,b) => a + b, 0);
          const percentage = ((value/ total) * 100).toFixed(1);
          return `${percentage}%`;
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position : "bottom"},
      // legend: { display: false},
      tooltip : {
      titleColor: "#fff",
      bodyColor: "#d1d5db",
    },
  },
  scales : {
    x : {
      grid: {display: false},
      ticks: {color: "#374151", font: {weight: "bold"} },
    },
    y: {
      grid: {color: "#e5e7eb"},
      ticks: {color: "#374151"},
    },
  },
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="w-64 h-64 mx-auto">
          <Pie key="pie" data={pieData} options={pieOptions}/>
        </div>

        {/* Stylish Bar Chart */}
        <div className="w-full h-64">
          <Bar key="bar" data={barData} options={barOptions}/>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
