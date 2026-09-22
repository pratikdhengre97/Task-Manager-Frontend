import Header from "./Header"
import taskImg3 from "../assets/images/task-img-3.jpg";


const Features = () => {
  return (
    <div>
      <Header/>

      <section className="px-6 py-16 bg-gray-50">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
    Powerful Features
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Project Management</h3>
      <p className="text-gray-600">Create and organize projects with ease.</p>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
      <p className="text-gray-600">Add members and assign roles seamlessly.</p>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
      <p className="text-gray-600">Monitor progress with real-time updates.</p>
    </div>
  </div>
</section>

<section className="flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
  {/* Centered Wide Image */}
  <img
  src={taskImg3}
  alt="Task Manager Illustration"
  className="w-4/5 max-w-5xl h-auto rounded-lg shadow-lg object-cover"
/>
</section>


    </div>
  )
}

export default Features
