import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard2 from "./pages/AdminDashboard2";
import EmployeeDashboard2 from "./pages/EmployeeDashboard2";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard2/>
        </ProtectedRoute>
      }
      />
      <Route path="/dashboard/employee" element={
        <ProtectedRoute allowedRoles={["MEMBER"]}>
          <EmployeeDashboard2/>
        </ProtectedRoute>
      }
      />
      <Route path="/home" element={<Hero/>} />
      <Route path="/" element={<Hero/>} />
      <Route path="/features" element={<Features/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      {/* <Route path="/dashboard" element={
        <ProtectedRoute>
            <Dashboard/>
        </ProtectedRoute>
        } /> */}
      <Route path="/projects" element={
        <ProtectedRoute>
          <Projects/>
        </ProtectedRoute>
      } />
      <Route path="/tasks" element={
        <ProtectedRoute>
          <Tasks/>
        </ProtectedRoute>
      } />
      {/* <Route path="/employee/dashboard"
      element={
        <ProtectedRoute>
          <EmployeeDashboard/>
        </ProtectedRoute>
      } /> */}
    </Routes>
  );
}

export default App;