import { Bar } from "react-chartjs-2";

const ProjectsBarChart = ({ projects }) => {
  const labels = projects.map(p => p.name);
  const data = projects.map(p => p.taskCount); // or p.taskCount from backend

  const barData = {
    labels,
    datasets: [
      {
        label: "Tasks per Project",
        data,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Tasks per Project" },
    },
  };

  return <Bar data={barData} options={options} />;
};

export default ProjectsBarChart;
