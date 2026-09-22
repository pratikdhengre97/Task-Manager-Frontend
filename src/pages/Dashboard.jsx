import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/tasks")}>
        Go to Tasks
      </button>
    </div>
  );
}