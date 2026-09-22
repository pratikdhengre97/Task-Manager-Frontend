// import { useState } from "react";
// import { signup } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     await signup(data);
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })}/>
//       <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })}/>
//       <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })}/>
//       <button onClick={handleSubmit}>Signup</button>
//     </div>
//   );
// }

import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signup(data);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header/>

    <main className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
      </main>
    </div>
  );
}