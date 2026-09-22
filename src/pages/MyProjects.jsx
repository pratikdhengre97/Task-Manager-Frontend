// // import { useEffect, useState } from "react";
// // import API from "../api/axios";


// // const MyProjects = ({employeeId}) => {
// //   const [projects, setProjects] = useState([]);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     API.get(`/api/employees/${employeeId}/projects`, {
// //       headers: { Authorization : `Bearer ${token}`}
// //     })
// //         .then(res=> setProjects(res.data))
// //         .catch(err => console.error(err));
// //   }, [employeeId]);

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md">
// //       <h2 className="text-xl font-semibold mb-4">My Projects</h2>
// //       <ul className="space-y-4">
// //         {projects.map((p) => (
// //           <li key={p.id} className="border p-4 rounded-lg">
// //             <h3 className="text-lg font-bold">{p.name}</h3>
// //             <p className="text-gray-600">{p.description}</p>
// //             <p className="text-sm text-gray-500">Deadline: {p.deadline}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default MyProjects;



// // // import { useEffect, useState } from "react";
// // // import API from "../api/axios";

// // // const MyProjects = ({ employeeId }) => {
// // //   const [projects, setProjects] = useState([]);
// // //   const [expanded, setExpanded] = useState(null);

// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     API.get(`/api/employees/${employeeId}/projects`, {
// // //       headers: { Authorization: `Bearer ${token}` }
// // //     })
// // //       .then(res => setProjects(res.data))
// // //       .catch(err => console.error(err));
// // //   }, [employeeId]);

// // //   return (
// // //     <div className="bg-white p-6 rounded-lg shadow-md">
// // //       <h2 className="text-xl font-semibold mb-4">My Projects</h2>
// // //       {projects.length === 0 ? (
// // //         <p className="text-gray-500">No projects assigned yet.</p>
// // //       ) : (
// // //         <ul className="space-y-4">
// // //           {projects.map((p) => (
// // //             <li key={p.id} className="border p-4 rounded-lg">
// // //               {/* Overview */}
// // //               <h3 className="text-lg font-bold">{p.name}</h3>
// // //               <p className={`text-sm ${new Date(p.deadline) < new Date() ? "text-red-600 font-bold" : "text-gray-500"}`}>
// // //                 Deadline: {p.deadline}
// // //               </p>
// // //               <p className="text-sm font-semibold">Status: {p.status}</p>
// // //               {p.progress !== undefined && (
// // //                 <div className="mt-2 bg-gray-200 rounded-full h-2">
// // //                   <div
// // //                     className="bg-green-500 h-2 rounded-full"
// // //                     style={{ width: `${p.progress}%` }}
// // //                   ></div>
// // //                 </div>
// // //               )}

// // //               {/* Expand button */}
// // //               <button
// // //                 onClick={() => setExpanded(expanded === p.id ? null : p.id)}
// // //                 className="mt-2 text-blue-600 text-sm"
// // //               >
// // //                 {expanded === p.id ? "Hide Details" : "View Details"}
// // //               </button>

// // //               {/* Details */}
// // //               {expanded === p.id && (
// // //                 <div className="mt-3 text-sm text-gray-600 space-y-1">
// // //                   <p>{p.description}</p>
// // //                   <p>Tasks: {p.taskCount}</p>
// // //                   <p>Assigned By: {p.assignedBy}</p>
// // //                   {/* Optionally: list employee’s tasks here */}
// // //                 </div>
// // //               )}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MyProjects;


// import { useEffect, useState } from "react";
// import API from "../api/axios";

// const MyProjects = ({ employeeId }) => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     API.get(`/api/employees/${employeeId}/projects`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => setProjects(res.data))
//       .catch(err => console.error(err));
//   }, [employeeId]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">My Projects</h2>
//       {projects.length === 0 ? (
//         <p className="text-gray-500">No projects assigned yet.</p>
//       ) : (
//         <ul className="space-y-6">
//           {projects.map((p) => (
//             <li key={p.id} className="border p-4 rounded-lg">
//               {/* Project name */}
//               <h3 className="text-lg font-bold">{p.name}</h3>

//               {/* Deadline */}
//               <p
//                 className={`text-sm ${
//                   new Date(p.deadline) < new Date()
//                     ? "text-red-600 font-bold"
//                     : "text-gray-600"
//                 }`}
//               >
//                 Deadline: {p.deadline}
//               </p>

//               {/* Status */}
//               <p className="text-sm font-semibold">Status: {p.status}</p>

//               {/* Progress bar */}
//               {p.progress !== undefined && (
//                 <div className="mt-2 bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-green-500 h-2 rounded-full"
//                     style={{ width: `${p.progress}%` }}
//                   ></div>
//                 </div>
//               )}

//               {/* Assigned tasks count */}
//               <p className="text-sm text-gray-700 mt-2">
//                 My Tasks in this project: {p.assignedTaskCount}
//               </p>

//               {/* Optional: link to MyTasks */}
//               <button
//                 onClick={() => window.location.href = "/my-tasks"}
//                 className="mt-2 text-blue-600 text-sm"
//               >
//                 View My Tasks
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyProjects;

import { useEffect, useState } from "react";
import API from "../api/axios";

const MyProjects = ({ employeeId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get(`/api/employees/${employeeId}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, [employeeId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects assigned yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">Sr. No.</th>
              <th className="border p-2 text-left">Project Name</th>
              <th className="border p-2 text-left">Deadline</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Assigned By</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, index) => (
              <tr key={p.id}>
                <td className="border p-2 text-center">{index + 1}.</td>
                <td className="border p-2">{p.name}</td>
                <td
                  className={`border p-2 ${
                    new Date(p.deadline) < new Date()
                      ? "text-red-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  {p.deadline}
                </td>
                <td className="border p-2">{p.status}</td>
                <td className="border p-2">{p.assignedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyProjects;

