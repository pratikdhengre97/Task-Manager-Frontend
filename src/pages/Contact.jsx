import { useState } from "react"
import Header from "./Header"

import API from "../api/axios";


const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/api/contact", { name, email, message });
    alert("Message sent!");
    setName("");
    setEmail("");
    setMessage("");
  } catch (err) {
    alert("Failed to send message");
    console.error(err);
  }
};



  return (
    <div>
        <Header/>
      <section className="px-6 py-16 bg-gray-50">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
  <p className="text-center text-gray-600 mb-12">
    Have questions or feedback? We’d love to hear from you.
  </p>

  {/* Contact Form */}
  <form 
  onSubmit={handleSubmit}
  className="max-w-2xl mx-auto space-y-6">
    <input
      type="text"
      placeholder="Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
    <input
      type="email"
      placeholder="Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
    <textarea
      placeholder="Your Message"
      rows="5"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    ></textarea>
    <button
      type="submit"
      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Send Message
    </button>
  </form>

  {/* Contact Info */}
  <div className="text-center mt-12 space-y-2">
    <p className="text-gray-600">📧 support@taskflow.com</p>
    <p className="text-gray-600">📱 +91 7397890369</p>
    <p className="text-gray-600">🌐 Follow us on Twitter & LinkedIn</p>
  </div>
</section>

    </div>
  )
}

export default Contact
