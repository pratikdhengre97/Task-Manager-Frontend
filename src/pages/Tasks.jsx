import { useEffect, useState } from "react";
import {
  createTask,
  getTasksByProject,
  updateTaskStatus,
} from "../services/taskServices";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const loadTasks = async () => {
    if (!projectId) return;
    try {
      const res = await getTasksByProject(projectId);
      setTasks(res.data);
    } catch (err) {
      console.log("Error loading tasks", err);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) return;

      try {
        await loadTasks();
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleCreate = async () => {
    await createTask({
      ...form,
      project: { id: projectId },
      assignedTo: { id: form.assignedTo },
    });
    setForm({ title: "", description: "", assignedTo: "" });
    loadTasks();
  };

  const handleStatusChange = async (taskId, status) => {
    await updateTaskStatus(taskId, status);
    loadTasks();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* Select Project */}
      <input
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter Project ID"
        onChange={(e) => setProjectId(e.target.value)}
      />

      {/* Create Task */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Assign User ID"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={handleCreate}
        >
          Create Task
        </button>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="p-4 border rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{t.title}</h4>
              <p>{t.description}</p>
            </div>

            <select
              className="border p-1 rounded"
              value={t.status}
              onChange={(e) => handleStatusChange(t.id, e.target.value)}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        ))}
      </div>
    </Layout>
  );
}
