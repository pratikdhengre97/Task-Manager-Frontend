import { Link } from "react-router-dom"
import Header from "./Header"

import aboutImg from "../assets/images/about-img.avif";


const About = () => {
  return (
    <div>

        <Header/>

        
        
      <section className="px-6 py-16 bg-white">
        {/* About Us Section */}
  <div className="text-center max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
    <p className="text-gray-600 mb-8">
      TaskFlow was created to help individuals and teams stay organized,
      collaborate seamlessly, and achieve more. We believe task management
      should be simple, intuitive, and accessible to everyone.
    </p>
    <Link
    to="/signup"
     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
      Get Started
    </Link>
  </div>

</section>

<section className="px-6 py-16 bg-gray-50 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
  <ul className="space-y-6">
    <li>
      <h3 className="text-xl font-semibold text-gray-800">What is TaskFlow?</h3>
      <p className="text-gray-600">TaskFlow is a simple and intuitive task manager designed to help individuals and teams organize projects, assign tasks, and track progress seamlessly.</p>
    </li>
    <li>
      <h3 className="text-xl font-semibold text-gray-800">How does TaskFlow improve productivity?</h3>
      <p className="text-gray-600">By centralizing all tasks in one place, TaskFlow reduces confusion, keeps deadlines visible, and ensures everyone knows their responsibilities.</p>
    </li>
    <li>
      <h3 className="text-xl font-semibold text-gray-800">Can I collaborate with my team?</h3>
      <p className="text-gray-600">Yes! You can invite team members, assign roles, and work together on projects with real‑time updates.</p>
    </li>
    <li>
      <h3 className="text-xl font-semibold text-gray-800">Is my data secure?</h3>
      <p className="text-gray-600">Absolutely. TaskFlow uses role‑based permissions and secure authentication to keep your information safe.</p>
    </li>
    <li>
      <h3 className="text-xl font-semibold text-gray-800">Can I access TaskFlow on mobile devices?</h3>
      <p className="text-gray-600">TaskFlow is fully responsive, so you can manage tasks from your phone, tablet, or desktop without any hassle.</p>
    </li>
    <li>
      <h3 className="text-xl font-semibold text-gray-800">What makes TaskFlow different from other task managers?</h3>
      <p className="text-gray-600">Unlike traditional tools, TaskFlow combines project creation, member management, and task tracking in one streamlined experience.</p>
    </li>
  </ul>
</section>


    </div>
  )
}

export default About
