import { useEffect, useState } from "react";
import API from "../api/axios";

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    assigneeId: "",
    assigneeName: "",
    projectId:"",
    projectName: "",
    dueDate: "",
    status: "TODO",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/api/admin/tasks", {
      headers : { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || [])
  })
    .catch(err => console.error(err));

    API.get("/api/admin/projects", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      setProjects(Array.isArray(res.data) ? res.data : res.data.projects || []);
    })
    .catch(err => console.error(err));

    API.get("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(Array.isArray(res.data) ? res.data : res.data.users || []))
      .catch(err => console.error(err));
  }, [token]);

  // CREATE
  const handleAdd = () => {
    if (!newTask.title || !newTask.assigneeId || !newTask.projectId || !newTask.dueDate) {
      alert("Please fill in all fields");
      return;
    }
    API.post("/api/admin/tasks", {
      title: newTask.title,
      assigneeId: newTask.assigneeId,
      projectId: newTask.projectId,
      dueDate: newTask.dueDate,
      status: newTask.status
    }, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      setTasks([...tasks, res.data]);
      setNewTask({
        title: "",
        assigneeId: "",
        assigneeName: "",
        projectId: "",
        projectName: "",
        dueDate: "",
        status: "TODO"
      });
    })
    .catch(err => console.error(err));
  };

  // UPDATE STATUS
  const handleStatusChange = (id, status) => {
    API.put(`api/admin/tasks/${id}/status`, { status }, {
      headers : { Authorization : `Bearer ${token}`}
    })
    .then(() => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
        alert(`Task ${id} status updated to ${status}`);
    })
    .catch(err => console.error(err));
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      API.delete(`api/admin/tasks/${id}`, {
        headers : { Authorization: `Bearer ${token}`}
      })
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch(err => console.error(err));
      alert(`Task ${id} deleted`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>

      {/* Add Task Form */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={newTask.assigneeId}
          onChange={(e) => {
            const selectedUser = users.find(u => u.id === e.target.value);
            setNewTask({
              ...newTask,
              assigneeId: selectedUser.id,
              assigneeName: selectedUser.name
            });
          }}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Assignee</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <select
            value={newTask.projectId}
            onChange={(e) => {
              const selectedProject = projects.find(p => p.id === e.target.value);
              setNewTask({
                ...newTask,
                projectId: selectedProject.id,
                projectName: selectedProject.name
                });
              }}
            className="border p-2 rounded w-1/4"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}

        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="border p-2 rounded w-1/3"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {/* Tasks Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Sr. No.</th>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Assignee</th>
            <th className="border p-2 text-left">Project</th>
            <th className="border p-2 text-left">Due Date</th> 
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, index) => (
            <tr key={t.id}>
              <td className="border p-2 text-center">{index+1}</td>
              <td className="border p-2">{t.title}</td>
              <td className="border p-2">{t.assigneeName}</td>
              <td className="border p-2">{t.projectName}</td>
              <td
  className={`border p-2 ${
    new Date(t.dueDate) < new Date() && t.status !== "DONE"
      ? "text-red-600 font-bold"
      : ""
  }`}
>
  {t.dueDate}
</td>


              <td className="border p-2">
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
