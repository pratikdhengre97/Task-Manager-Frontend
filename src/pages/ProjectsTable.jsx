import { useEffect, useState } from "react";
import API from "../api/axios";



const ProjectsTable = () => {
  // Dummy data for now — replace with API call later
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    taskCount: 0,
    status: "PENDING"
  });

  

  useEffect(() => {
    if(showForm) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
    }
  }, [showForm]);

  useEffect(() => {
    API.get("/api/admin/projects")
    .then(res => setProjects(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleAddClick = () => {
      setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData ({...formData, [name] : value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/projects", formData)
    .then(res => {
      setProjects([...projects, res.data]);
      setShowForm(false);
      setFormData({name: "", taskCount: 0, status: "PENDING"});
    })
    .catch(err => console.error(err));
  };

  const handleAdd = () => {
    const newProject = { name: "New Project", tasks: 0, status: "PENDING"};
    API.post("/projects", newProject)
    .then(res => setProjects([...projects, res.data]))
    .catch(err => console.error(err));
    // alert("Open Add Project modal");
    // TODO: open modal with form → POST /projects
  };

  const handleEdit = (project) => {
    setEditProject(project);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      API.delete(`/projects/${id}`)
      .then(() => setProjects(projects.filter(p => p.id !== id )))
      .catch(err => console.error(err));
      // alert(`Delete project ${id}`);
      // TODO: call backend DELETE /projects/{id}
      // setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setProjects(projects.map((proj) =>
      proj.id === id ? {...proj, status : newStatus } : proj
    ));
    API.put(`/projects/${id}/status`, {status : newStatus})
    .then(res => {
      console.log(`Project ${id} updated to ${newStatus}`);
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Sr. No.</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Tasks</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Deadline</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, index) => (
            <tr key={p.id}>
              <td className="border p-2 text-center">{index+1}.</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2 text-center">{p.taskCount}</td>
              <td className="border p-2">
                {/* <select
                value={p.status}
                onChange={(e) => handleStatusChange(p.id, e.target.value)}
                className="border p-1 rounded"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>

                </select> */}
                <span>{p.status}</span>
              </td>
              <td
              className={`border p-2 ${
                new Date(p.deadline) < new Date() ? "text-red-600 font-bold" : "text-gray-600"
              }`}
              >{p.deadline}

              </td>


              <td className="border p-2 space-x-2">
                <button
                  // onClick={() => handleEdit(p)}
                  onClick={() => setEditProject(p)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>

              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
          {showForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/80">
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-semibold mb-4">Add Project</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Project Name : </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full border p-2 rounded"
          required
        />
        </div>
        <div>
        <label className="block mb-1 font-medium">Number of Tasks : </label>
        <input
          type="number"
          name="taskCount"
          value={formData.taskCount}
          onChange={handleChange}
          placeholder="Number of Tasks"
          className="w-full border p-2 rounded"
        />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status : </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        </div>

        <div>
  <label className="block mb-1 font-medium">Deadline:</label>
  <input
    type="date"
    name="deadline"
    value={formData.deadline || ""}
    onChange={handleChange}
    className="w-full border p-2 rounded"
    required
  />
</div>


        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{editProject && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/80">
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        API.put(`/projects/${editProject.id}`, editProject)
          .then(res => {
            setProjects(projects.map(p => p.id === editProject.id ? res.data : p));
            setEditProject(null); // close modal
          })
          .catch(err => console.error(err));
      }} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Project Name:</label>
          <input
            type="text"
            name="name"
            value={editProject.name}
            onChange={(e) => setEditProject({...editProject, name: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Number of Tasks:</label>
          <input
            type="number"
            name="taskCount"
            value={editProject.taskCount}
            onChange={(e) => setEditProject({...editProject, taskCount: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status:</label>
          <select
            name="status"
            value={editProject.status}
            onChange={(e) => setEditProject({...editProject, status: e.target.value})}
            className="w-full border p-2 rounded"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div>
  <label className="block mb-1 font-medium">Deadline:</label>
  <input
    type="date"
    name="deadline"
    value={editProject.deadline || ""}
    onChange={(e) => setEditProject({...editProject, deadline: e.target.value})}
    className="w-full border p-2 rounded"
  />
</div>


        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setEditProject(null)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}



    </div>
  );
};

export default ProjectsTable;

