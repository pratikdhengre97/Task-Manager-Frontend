import { useEffect, useState } from "react";
import { createProject, getProjects } from "../services/projectService";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // Load projects
  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            await loadProjects();
        } catch(err) {
            console.error("Error loading projects", err);
        }
    };
    fetchData();
  }, []);

  // Create project
  const handleCreate = async () => {
    await createProject(form);
    setForm({ name: "", description: "" });
    loadProjects();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {/* Create Project */}
      <div className="flex gap-2 mb-6">
        <input
        className="border p-2 rounded w-full"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
        className="border p-2 rounded w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <button
        className="bg-green-500 text-white px-4 rounded"
         onClick={handleCreate}>Create Project</button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
           key={p.id}
           className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}