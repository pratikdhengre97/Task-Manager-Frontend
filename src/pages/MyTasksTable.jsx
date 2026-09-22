// import { useEffect, useState } from "react";
// import API from "../api/axios";


// const MyTasksTable = ({ employeeId }) => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     API.get(`/api/employees/${employeeId}/tasks`, {
//       headers: { Authorization : `Bearer ${token}`}
//     })
//         .then(res=> setTasks(res.data))
//         .catch(err => console.error(err));
//   }, [employeeId]);

//   const handleStatusChange = (id, newStatus) => {
//     const token = localStorage.getItem("token");

//     API.put(`/api/employees/${id}/status`,
//       {status : newStatus},
//       { headers: {Authorization: `Bearer ${token}`}}
//     )
//     .then(res => {
//       console.log("Response: ", res.data)
//       const updatedTask = res.data;
//         setTasks(prev => 
//           prev.map(t => t.id === id ? { ...t, status: updatedTask.status } : t)
//         );
//     })
//     .catch(err => console.error(err));
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2 text-center">Sr. No.</th>
//             <th className="border p-2 text-left">Task Title</th>
//             <th className="border p-2 text-left">Due Date</th>
//             <th className="border p-2 text-left">Status</th>
//             <th className="border p-2 text-left">Assigned By</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((t, index) => (
//             <tr key={t.id}>
//               <td className="border p-2 text-center">{index+1}.</td>
//               <td className="border p-2">{t.title}</td>
//               <td
//                 className={`border p-2 ${
//                   new Date(t.dueDate) < new Date() && t.status !== "COMPLETED"
//                     ? "text-red-600 font-bold"
//                     : ""
//                 }`}
//               >
//                 {t.dueDate}
//               </td>
//               <td className="border p-2">
//                 <select
//                   value={t.status}
//                   onChange={(e) => handleStatusChange(t.id, e.target.value)}
//                   className="border p-1 rounded"
//                 >
//                   <option value="TODO">TODO</option>
//                   <option value="IN_PROGRESS">IN_PROGRESS</option>
//                   <option value="PENDING">PENDING</option>
//                   <option value="COMPLETED">COMPLETED</option>
//                 </select>
//               </td>
//               <td className="border p-2">{t.assignedBy}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyTasksTable;

import { useEffect, useState } from "react";
import API from "../api/axios";

const MyTasksTable = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get(`/api/employees/${employeeId}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, [employeeId]);

  const handleStatusChange = (id, newStatus) => {
    const token = localStorage.getItem("token");
    API.put(`/api/employees/${id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => {
        const updatedTask = res.data;
        setTasks(prev =>
          prev.map(t => t.id === id ? { ...t, status: updatedTask.status } : t)
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Sr. No.</th>
            <th className="border p-2 text-left">Task Title</th>
            <th className="border p-2 text-left">Project</th>
            <th className="border p-2 text-left">Due Date</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Assigned By</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, index) => (
            <tr key={t.id}>
              <td className="border p-2 text-center">{index + 1}.</td>
              <td className="border p-2">{t.title}</td>
              <td className="border p-2">{t.projectName}</td> {/* NEW */}
              <td
                className={`border p-2 ${
                  new Date(t.dueDate) < new Date() && t.status !== "COMPLETED"
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
              <td className="border p-2">{t.assignedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTasksTable;

