import { useEffect, useState } from "react";
import API from "../api/axios";

const UserInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  // Fetch inquiries from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/api/admin/inquiries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setInquiries(res.data))
      .catch((err) => console.error("Error fetching inquiries:", err));
  }, []);

  // Resolve inquiry
  const handleResolve = (id) => {
    const token = localStorage.getItem("token");

    API.put(`/api/admin/inquiries/${id}/resolve`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setInquiries((prev) =>
          prev.map((inq) =>
            inq.id === id ? { ...inq, resolved: true } : inq
          )
        );
      })
      .catch((err) => console.error("Error resolving inquiry:", err));
  };

   const handleUnresolved = (id) => {
    const token = localStorage.getItem("token");

    API.put(`api/admin/inquiries/${id}/unresolve`, {}, {
        headers: { Authorization: `Bearer ${token}`},
    })
    .then(() => {
        setInquiries((prev) =>
            prev.map((inq) =>
                inq.id === id ? { ...inq, resolved: false} : inq
            )
        );
    })
    .catch((err) => console.error("Error marking inquiry unresolved:", err));
   }

  // Reply to inquiry
  const handleReply = (id) => {
    const token = localStorage.getItem("token");

    API.post(`/api/admin/inquiries/${id}/reply`, { reply: replyText }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setInquiries((prev) => 
        prev.map((inq) =>
            inq.id === id ? {...inq, reply: res.data.reply} : inq
        )
    );
        alert("Reply sent!");
        setReplyText("");
        setActiveReplyId(null);
      })
      .catch((err) => console.error("Error sending reply:", err));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Inquiries</h2>
      <ul>
        {inquiries.map((inq) => (
          <li key={inq.id} className="border-b py-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{inq.name} ({inq.email})</p>
                <p className="text-gray-600">{inq.message}</p>
                {inq.reply && (
                    <p className="text-gray-600 text-sm mt-1">Reply: {inq.reply}</p>
                )}
                {inq.resolved && (
                  <span className="text-green-600 text-sm">Resolved</span>
                )}
              </div>
              <div className="flex gap-2">
                {!inq.resolved ? (
                    <>
                  <button
                    onClick={() => handleResolve(inq.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Resolve
                  </button>
                
                <button
                  onClick={() => setActiveReplyId(inq.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Reply
                </button>
                </>
                ) : (
                    <button
                    onClick={() => handleUnresolved(inq.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Undo Resolve
                    </button>
                )}
              </div>
            </div>

            {activeReplyId === inq.id && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleReply(inq.id)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Send
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserInquiries;
