import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-200 shadow-md">
  {/* Logo */}
  <div className="text-xl font-bold text-blue-600">
    TaskFlow
  </div>

  {/* Navigation (hidden on mobile, visible on md+) */}
  <nav className="hidden md:flex space-x-6 gap-15">
    <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
    <Link to="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
    <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
    <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
  </nav>

  {/* Auth Buttons */}
  <div className="flex space-x-4">
    <Link
    to="/login"
     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
    <Link 
    to="/signup" 
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Sign Up
    </Link>
  </div>

  {/* Mobile Menu Button */}
  <button className="md:hidden text-gray-700 focus:outline-none">
    ☰
  </button>
</header>
    </div>
  )
}

export default Header
