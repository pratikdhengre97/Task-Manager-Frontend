// const ContactMessages = () => {
//   const messages = [
//     { id: 1, name: "Amit", email: "amit@example.com", message: "Need help with login" },
//     { id: 2, name: "Sneha", email: "sneha@example.com", message: "Feature request: dark mode" },
//   ];

//   const handleResolve = (id) => {
//     alert(`Mark message ${id} as resolved`);
//     // TODO: call backend PUT /contact/{id}/resolve
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">User Inquiries</h2>
//       <ul>
//         {messages.map((m) => (
//           <li key={m.id} className="border-b py-2 flex justify-between items-center">
//             <div>
//               <p className="font-semibold">{m.name} ({m.email})</p>
//               <p className="text-gray-600">{m.message}</p>
//             </div>
//             <button
//               onClick={() => handleResolve(m.id)}
//               className="px-3 py-1 bg-green-500 text-white rounded"
//             >
//               Resolve
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ContactMessages;
