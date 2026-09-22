import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await login(data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    // 🔥 PUT REDIRECT LOGIC HERE
  if (res.data.role === "ADMIN") {
    navigate("/dashboard/admin");
  } else {
    navigate("/dashboard/employee");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <Header/>
    <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow w-80">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
      <input
      className="w-full p-2 border rounded mb-3"
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        className="w-full p-2 border rounded mb-4"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button 
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      onClick={handleSubmit}>Login</button>

      {/* Sign Up Redirect */}
      <p className="text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
      </div>
    </main>
    
    </div>
  );
}