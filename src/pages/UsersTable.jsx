import { useEffect, useState } from "react";
import API from "../api/axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "MEMBER", project: "" });
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  API.get("/api/admin/projects", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      setProjects(Array.isArray(res.data) ? res.data : res.data.projects || []);
    })
    .catch(err => console.error(err));
  }, [token]);

  useEffect(() => {
    API.get("/api/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // ADD MEMBER
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.project) {
      alert("Please fill in all fields");
      return;
    }
    API.post("/api/admin/users", newUser, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(res => {
        setUsers([...users, res.data]);
        setNewUser({name: "", role: "MEMBER", project : "" })
        setShowForm(false);
      })
      .catch(err => console.error(err))
  //   const newId = users.length ? users[users.length - 1].id + 1 : 1;
  //   setUsers([...users, { id: newId, ...newUser }]);
  //   setNewUser({ name: "", role: "MEMBER", project: "" });
  //   alert("Member added!");
  //   // TODO: POST /users
  };

  // PROMOTE/DEMOTE
  const handleRoleChange = (id, newRole) => {

    API.put(`/api/admin/users/${id}/role`, {role : newRole}, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      setUsers(users.map(u => (u.id === id ? {...u, role : newRole} : u)));
    })
    .catch(err => console.error(err));
    // setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    // alert(`User ${id} role updated to ${newRole}`);
    // TODO: PUT /users/{id}/role
  };

  // ASSIGN PROJECT
  const handleProjectChange = (id, project) => {
    API.put(`/api/admin/users/${id}/project`, {project}, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(() => {
        setUsers(users.map(u => (u.id === id ? {...u, project} : u)));
      })
      .catch(err => console.error(err));
    // setUsers(users.map((u) => (u.id === id ? { ...u, project } : u)));
    // alert(`User ${id} assigned to ${project}`);
    // TODO: PUT /users/{id}/project
  };

  // REMOVE MEMBER
  const handleRemove = (id) => {
    if (window.confirm("Remove this member?")) {
      API.delete(`api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
        .then(() => setUsers(users.filter(u => u.id !== id)))
        .catch(err => console.error(err));
      // setUsers(users.filter((u) => u.id !== id));
      // alert(`User ${id} removed`);
      // TODO: DELETE /users/{id}
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold mb-4">Team Management</h2>

      {/* Add Member Button */}
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
      >
        + Add Member
      </button>
    </div>
      {/* Add Member Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="space-y-4 mb-6 bg-gray-50 p-4 rounded">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          {/* <input
            type="text"
            placeholder="Project Name"
            value={newUser.project}
            onChange={(e) => setNewUser({ ...newUser, project: e.target.value })}
            className="border p-2 rounded w-full"
          /> */}
          <select
          value={newUser.project}
          onChange={(e) => setNewUser({...newUser, project: e.target.value})}
          className="border p-2 rounded w-full"
          >
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {/* <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded w-full"
          /> */}
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="MEMBER">MEMBER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Sr. No.</th>
            <th className="border p-2 text-left">Name</th>
            {/* <th className="border p-2 text-left">Email</th> */}
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Project</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td className="border p-2 text-center">{index+1}</td>
              <td className="border p-2">{u.name}</td>
              {/* <td className="border p-2">{u.email}</td> */}
              <td className="border p-2">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="MEMBER">MEMBER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              {/* 👇 Replace the project <select> with this */}
              {/* <td 
              className="border p-2"
              >
              {projects.find(p => p.id === u.project)?.name || "No Project"}
              </td> */}
              <td className="border p-2">
                <select
                  value={u.project}
                  onChange={(e) => handleProjectChange(u.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Select Project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                  </select>
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleRemove(u.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;