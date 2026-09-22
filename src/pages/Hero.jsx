import { Link } from "react-router-dom"
import Header from "./Header"

import taskImg2 from "../assets/images/task-img2.jpg";
import taskImg1 from "../assets/images/task-img-1.avif";

const Hero = () => {
  return (
    <div>
      <Header/>

        <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gray-50">
  {/* Title */}
  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
    Manage your tasks.
  </h1>

  {/* Paragraph */}
  <p className="text-gray-600 max-w-xl mb-8">
    Stay organized and boost productivity with our task manager. 
    Create projects, assign tasks, and collaborate seamlessly with your team.
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4">
    <Link
    to="/signup"
     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
      Get Started
    </Link>
    {/* <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300">
      Discover in Video
    </button> */}
  </div>
</section>

    <section className="flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
  {/* Image Container */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
    {/* First Image */}
    <img
  src={taskImg1}
  alt="Task Manager Illustration 1"
  className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-lg shadow-lg"
/>

    {/* Second Image */}
    <img
  src={taskImg2}
  alt="Task Manager Illustration 2"
  className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-lg shadow-lg"
/>
  </div>
</section>

<section className="px-6 py-16 bg-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Projects</h3>
      <p className="text-gray-600">Organize your work into projects with ease.</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Assign Tasks</h3>
      <p className="text-gray-600">Delegate tasks to team members quickly.</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Progress</h3>
      <p className="text-gray-600">Stay updated with real-time task tracking.</p>
    </div>
  </div>
</section>




</div>

  )
}

export default Hero
