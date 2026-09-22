import { useEffect, useState } from "react";
import API from "../api/axios";


const ActivityFeed = ({employeeId}) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get(`/api/employees/${employeeId}/activities`, {
      headers: { Authorization : `Bearer ${token}`}
    })
        .then(res=> setActivities(res.data))
        .catch(err => console.error(err));
  }, [employeeId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
      <ul className="space-y-3">
        {activities.map((a) => (  
          <li key={a.id} className="border-b pb-2">
            <p className="text-gray-800">{a.message}</p>
            <p className="text-sm text-gray-500">{new Date(a.timestamp).toLocaleString()}</p>
            {a.createdBy && (
        <p className="text-xs text-gray-400">By: {a.createdBy}</p>
      )}
      {a.type && (
        <span className="inline-block mt-1 px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
          {a.type}
        </span>
      )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
