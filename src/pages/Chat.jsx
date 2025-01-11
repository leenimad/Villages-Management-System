
// // import React, { useState } from "react";
// // import Sidebar from "../components/Sidebar";

// // const Chat = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [admins] = useState(["Admin1", "Admin2", "leen"]);
// //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");

// //   const handleSendMessage = () => {
// //     if (newMessage.trim()) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { sender: "You", text: newMessage },
// //       ]);
// //       setNewMessage("");
// //     }
// //   };

// //   return (
// //     <div className="flex bg-[#1a202c] min-h-screen">
// //       {/* Sidebar */}
// //       <Sidebar />

// //       {/* Main Chat Content */}
// //       <div className="flex-1 ml-64 p-6">
// //         <h1 className="text-2xl font-bold text-white mb-6">Chat with Admins</h1>

// //         {/* Search Bar */}
// //         <div className="mb-6">
// //           <input
// //             type="text"
// //             placeholder="Search for an admin..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full px-4 py-2 rounded border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
// //           />
// //         </div>

// //         {/* Available Admins */}
// //         <div className="bg-[#2d3748] p-4 rounded mb-6">
// //           <h2 className="text-xl text-white mb-4">Available Admins</h2>
// //           <div className="flex space-x-4">
// //             {admins
// //               .filter((admin) =>
// //                 admin.toLowerCase().includes(searchTerm.toLowerCase())
// //               )
// //               .map((admin) => (
// //                 <button
// //                   key={admin}
// //                   onClick={() => setSelectedAdmin(admin)}
// //                   className={`flex flex-col items-center cursor-pointer ${
// //                     selectedAdmin === admin ? "text-blue-500" : "text-white"
// //                   }`}
// //                 >
// //                   <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
// //                   <span className="mt-2">{admin}</span>
// //                 </button>
// //               ))}
// //             {admins.filter((admin) =>
// //               admin.toLowerCase().includes(searchTerm.toLowerCase())
// //             ).length === 0 && (
// //               <p className="text-gray-400">No admins found.</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Chat Section */}
// //         {selectedAdmin && (
// //           <div className="bg-[#2d3748] p-4 rounded">
// //             <h2 className="text-xl text-white mb-4">Chat with: {selectedAdmin}</h2>
// //             <div className="bg-[#1a202c] p-4 rounded h-64 overflow-y-auto mb-4">
// //               {messages.map((message, index) => (
// //                 <p
// //                   key={index}
// //                   className={`mb-2 ${
// //                     message.sender === "You"
// //                       ? "text-green-400"
// //                       : "text-blue-400"
// //                   }`}
// //                 >
// //                   <strong>{message.sender}:</strong> {message.text}
// //                 </p>
// //               ))}
// //             </div>

// //             {/* Input Box */}
// //             <div className="flex items-center">
// //               <input
// //                 type="text"
// //                 placeholder="Type your message..."
// //                 value={newMessage}
// //                 onChange={(e) => setNewMessage(e.target.value)}
// //                 className="flex-1 px-4 py-2 rounded-l border-t border-b border-l border-gray-600 bg-[#2d3748] text-white focus:outline-none"
// //               />
// //               <button
// //                 onClick={handleSendMessage}
// //                 className="bg-blue-500 px-4 py-2 text-white rounded-r hover:bg-blue-600"
// //               >
// //                 Send
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chat;
// // Chat.jsx

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const Chat = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [admins, setAdmins] = useState([]);
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const ws = useRef(null); // WebSocket reference
//   const username = localStorage.getItem("username"); // Current user's username
//   const role = localStorage.getItem("role"); // Current user's role

//   // Fetch active admins from the backend
//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/graphql", {
//           query: `
//             query {
//               getActiveAdmins {
//                 username
//                 profilePhoto
//               }
//             }
//           `,
//         });
//         setAdmins(response.data.data.getActiveAdmins);
//       } catch (err) {
//         console.error("Error fetching admins:", err);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   // Establish WebSocket connection
//   useEffect(() => {
//     ws.current = new WebSocket("ws://localhost:5000");
//     ws.current.onopen = () => {
//       ws.current.send(JSON.stringify({ type: "init", username }));
//       console.log("WebSocket connection established for", username);
//     };

//     ws.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.from === selectedAdmin || data.from === username) {
//         setMessages((prev) => [...prev, { sender: data.from, text: data.text }]);
//       }
//     };

//     return () => {
//       ws.current.close();
//     };
//   }, [selectedAdmin]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() && selectedAdmin) {
//       const messageData = {
//         type: "message",
//         from: username,
//         to: selectedAdmin,
//         text: newMessage,
//       };
//       ws.current.send(JSON.stringify(messageData));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "You", text: newMessage },
//       ]);
//       setNewMessage("");
//     }
//   };

//   // For admins: Fetch all users to chat with
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (role === "Admin") {
//       const fetchUsers = async () => {
//         try {
//           const response = await axios.post("http://localhost:5000/graphql", {
//             query: `
//               query {
//                 getAllUsers {
//                   username
//                   profilePhoto
//                 }
//               }
//             `,
//           });
//           setUsers(response.data.data.getAllUsers);
//         } catch (err) {
//           console.error("Error fetching users:", err);
//         }
//       };

//       fetchUsers();
//     }
//   }, [role]);

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Chat Content */}
//       <div className="flex-1 ml-64 p-6">
//         <h1 className="text-2xl font-bold text-white mb-6">Chat</h1>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder={`Search for a ${role === "Admin" ? "user" : "admin"}...`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 rounded border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
//           />
//         </div>

//         {/* Available Users/Admins */}
//         <div className="bg-[#2d3748] p-4 rounded mb-6">
//           <h2 className="text-xl text-white mb-4">
//             {role === "Admin" ? "Available Users" : "Available Admins"}
//           </h2>
//           <div className="flex space-x-4">
//             {(role === "Admin" ? users : admins)
//               .filter((person) =>
//                 person.username.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((person) => (
//                 <button
//                   key={person.username}
//                   onClick={() => setSelectedAdmin(person.username)}
//                   className={`flex flex-col items-center cursor-pointer ${
//                     selectedAdmin === person.username
//                       ? "text-blue-500"
//                       : "text-white"
//                   }`}
//                 >
//                   <img
//                     src={person.profilePhoto || "/default-avatar.png"}
//                     alt="Profile"
//                     className="w-10 h-10 bg-gray-600 rounded-full"
//                   />
//                   <span className="mt-2">{person.username}</span>
//                 </button>
//               ))}
//             {(role === "Admin" ? users : admins).filter((person) =>
//               person.username.toLowerCase().includes(searchTerm.toLowerCase())
//             ).length === 0 && <p className="text-gray-400">No one found.</p>}
//           </div>
//         </div>

//         {/* Chat Section */}
//         {selectedAdmin && (
//           <div className="bg-[#2d3748] p-4 rounded">
//             <h2 className="text-xl text-white mb-4">
//               Chat with: {selectedAdmin}
//             </h2>
//             <div className="bg-[#1a202c] p-4 rounded h-64 overflow-y-auto mb-4">
//               {messages.map((message, index) => (
//                 <p
//                   key={index}
//                   className={`mb-2 ${
//                     message.sender === "You"
//                       ? "text-green-400 text-right"
//                       : "text-blue-400 text-left"
//                   }`}
//                 >
//                   <strong>{message.sender}:</strong> {message.text}
//                 </p>
//               ))}
//             </div>

//             {/* Input Box */}
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 px-4 py-2 rounded-l border-t border-b border-l border-gray-600 bg-[#2d3748] text-white focus:outline-none"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 px-4 py-2 text-white rounded-r hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const Chat = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [admins, setAdmins] = useState([]);
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const ws = useRef(null); // WebSocket reference
//   const username = localStorage.getItem("username"); // Current user's username
//   const role = localStorage.getItem("role"); // Current user's role

//   // Fetch active admins or all users
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const query =
//           role === "Admin"
//             ? `
//               query {
//                 getAllUsers {
//                   username
//                   profilePhoto
//                 }
//               }
//             `
//             : `
//               query {
//                 getActiveAdmins {
//                   username
//                   profilePhoto
//                 }
//               }
//             `;

//         const response = await axios.post("http://localhost:5000/graphql", {
//           query,
//         });

//         const contacts =
//           role === "Admin" ? response.data.data.getAllUsers : response.data.data.getActiveAdmins;
//         setAdmins(contacts);
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };

//     fetchContacts();
//   }, [role]);

//   // Establish WebSocket connection
//   useEffect(() => {
//     ws.current = new WebSocket("ws://localhost:5000");
//     ws.current.onopen = () => {
//       ws.current.send(JSON.stringify({ type: "init", username }));
//       console.log("WebSocket connection established for", username);
//     };

//     // ws.current.onmessage = (event) => {
//     //   const data = JSON.parse(event.data);

//     //   if (data.sender === selectedAdmin || data.sender === username) {
//     //     setMessages((prev) => [...prev, { sender: data.sender, text: data.text, timestamp: data.timestamp }]);
//     //   }
//     // };
//     ws.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
    
//       // Append message if it belongs to the selected conversation
//       if (data.sender === selectedAdmin || data.recipient === username) {
//         setMessages((prev) => [
//           ...prev,
//           { sender: data.sender, text: data.text, timestamp: data.timestamp },
//         ]);
//       }
//     };
    
//     return () => {
//       ws.current.close();
//     };
//   }, [selectedAdmin]);

//   // Fetch chat history when a conversation is selected
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (selectedAdmin) {
//         try {
//           const response = await axios.post("http://localhost:5000/graphql", {
//             query: `
//               query {
//                 getMessages(sender: "${username}", recipient: "${selectedAdmin}") {
//                   sender
//                   text
//                   timestamp
//                 }
//               }
//             `,
//           });
//           setMessages(response.data.data.getMessages);
//         } catch (err) {
//           console.error("Error fetching messages:", err);
//         }
//       }
//     };

//     fetchMessages();
//   }, [selectedAdmin]);

//   // const handleSendMessage = () => {
//   //   if (newMessage.trim() && selectedAdmin) {
//   //     const messageData = {
//   //       type: "message",
//   //       from: username,
//   //       to: selectedAdmin,
//   //       text: newMessage,
//   //     };
//   //     ws.current.send(JSON.stringify(messageData));
//   //     setMessages((prevMessages) => [
//   //       ...prevMessages,
//   //       { sender: "You", text: newMessage, timestamp: new Date().toISOString() },
//   //     ]);
//   //     setNewMessage("");
//   //   }
//   // };
//   const handleSendMessage = () => {
//     if (newMessage.trim() && selectedAdmin) {
//       const messageData = {
//         type: "message",
//         from: username,
//         to: selectedAdmin,
//         text: newMessage,
//       };
//       ws.current.send(JSON.stringify(messageData));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "You", text: newMessage, timestamp: new Date().toISOString() },
//       ]);
//       setNewMessage("");
//     }
//   };
//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       <Sidebar />

//       <div className="flex-1 ml-64 p-6">
//         <h1 className="text-2xl font-bold text-white mb-6">Chat</h1>

//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder={`Search for a ${role === "Admin" ? "user" : "admin"}...`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 rounded border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
//           />
//         </div>

//         <div className="bg-[#2d3748] p-4 rounded mb-6">
//           <h2 className="text-xl text-white mb-4">
//             {role === "Admin" ? "Available Users" : "Available Admins"}
//           </h2>
//           <div className="flex space-x-4">
//             {admins
//               .filter((person) =>
//                 person.username.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((person) => (
//                 <button
//                   key={person.username}
//                   onClick={() => setSelectedAdmin(person.username)}
//                   className={`flex flex-col items-center cursor-pointer ${
//                     selectedAdmin === person.username ? "text-blue-500" : "text-white"
//                   }`}
//                 >
//                   <img
//                     src={person.profilePhoto || "/default-avatar.png"}
//                     alt="Profile"
//                     className="w-10 h-10 bg-gray-600 rounded-full"
//                   />
//                   <span className="mt-2">{person.username}</span>
//                 </button>
//               ))}
//           </div>
//         </div>

//         {selectedAdmin && (
//           <div className="bg-[#2d3748] p-4 rounded">
//             <h2 className="text-xl text-white mb-4">Chat with: {selectedAdmin}</h2>
//             <div className="bg-[#1a202c] p-4 rounded h-64 overflow-y-auto mb-4">
//               {messages.map((message, index) => (
//                 <div key={index} className="mb-2">
//                   <p
//                     className={`${
//                       message.sender === "You"
//                         ? "text-green-400 text-right"
//                         : "text-blue-400 text-left"
//                     }`}
//                   >
//                     <strong>{message.sender}:</strong> {message.text}
//                   </p>
//                   <p className="text-gray-500 text-xs text-right">
//                     {new Date(message.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 px-4 py-2 rounded-l border-t border-b border-l border-gray-600 bg-[#2d3748] text-white focus:outline-none"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 px-4 py-2 text-white rounded-r hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default Chat;
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const Chat = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const ws = useRef(null); // WebSocket reference
//   const username = localStorage.getItem("username"); // Current user's username
//   const role = localStorage.getItem("role"); // Current user's role

//   // Fetch contacts (Admins or Users)
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const query =
//           role === "Admin"
//             ? `
//               query {
//                 getAllUsers {
//                   username
//                   profilePhoto
//                 }
//               }
//             `
//             : `
//               query {
//                 getActiveAdmins {
//                   username
//                   profilePhoto
//                 }
//               }
//             `;

//         const response = await axios.post("http://localhost:5000/graphql", {
//           query,
//         });

//         const data =
//           role === "Admin" ? response.data.data.getAllUsers : response.data.data.getActiveAdmins;
//         setContacts(data);
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };

//     fetchContacts();
//   }, [role]);

//   // Establish WebSocket connection
//   useEffect(() => {
//     ws.current = new WebSocket("ws://localhost:5000");

//     ws.current.onopen = () => {
//       console.log("WebSocket connection established for", username);
//       ws.current.send(JSON.stringify({ type: "init", username }));
//     };

//     ws.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Message received:", data);

//       // Append message if it belongs to the selected conversation
//       if (
//         (data.sender === selectedContact && data.recipient === username) ||
//         (data.sender === username && data.recipient === selectedContact)
//       ) {
//         setMessages((prev) => [
//           ...prev,
//           { sender: data.sender, text: data.text, timestamp: data.timestamp },
//         ]);
//       }
//     };

//     ws.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     ws.current.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     return () => {
//       if (ws.current) ws.current.close();
//     };
//   }, [username, selectedContact]);

//   // Fetch chat history when a conversation is selected
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (selectedContact) {
//         try {
//           const response = await axios.post("http://localhost:5000/graphql", {
//             query: `
//               query {
//                 getMessages(sender: "${username}", recipient: "${selectedContact}") {
//                   sender
//                   text
//                   timestamp
//                 }
//               }
//             `,
//           });
//           setMessages(response.data.data.getMessages);
//         } catch (err) {
//           console.error("Error fetching messages:", err);
//         }
//       }
//     };

//     fetchMessages();
//   }, [selectedContact]);

//   // Send message
//   const handleSendMessage = () => {
//     if (newMessage.trim() && selectedContact) {
//       const messageData = {
//         type: "message",
//         from: username,
//         to: selectedContact,
//         text: newMessage,
//       };

//       console.log("Sending message:", messageData);
//       ws.current.send(JSON.stringify(messageData));

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "You", text: newMessage, timestamp: new Date().toISOString() },
//       ]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       <Sidebar />

//       <div className="flex-1 ml-64 p-6">
//         <h1 className="text-2xl font-bold text-white mb-6">Chat</h1>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder={`Search for a ${role === "Admin" ? "user" : "admin"}...`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 rounded border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
//           />
//         </div>

//         {/* Contacts List */}
//         <div className="bg-[#2d3748] p-4 rounded mb-6">
//           <h2 className="text-xl text-white mb-4">
//             {role === "Admin" ? "Available Users" : "Available Admins"}
//           </h2>
//           <div className="flex space-x-4">
//             {contacts
//               .filter((person) =>
//                 person.username.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((person) => (
//                 <button
//                   key={person.username}
//                   onClick={() => setSelectedContact(person.username)}
//                   className={`flex flex-col items-center cursor-pointer ${
//                     selectedContact === person.username ? "text-blue-500" : "text-white"
//                   }`}
//                 >
//                   <img
//                     src={person.profilePhoto || "/default-avatar.png"}
//                     alt="Profile"
//                     className="w-10 h-10 bg-gray-600 rounded-full"
//                   />
//                   <span className="mt-2">{person.username}</span>
//                 </button>
//               ))}
//           </div>
//         </div>

//         {/* Chat Section */}
//         {selectedContact && (
//           <div className="bg-[#2d3748] p-4 rounded">
//             <h2 className="text-xl text-white mb-4">Chat with: {selectedContact}</h2>
//             <div className="bg-[#1a202c] p-4 rounded h-64 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-4">
//               {messages.map((message, index) => (
//                 <div key={index} className="mb-2">
//                   <p
//                     className={`${
//                       message.sender === "You"
//                         ? "text-green-400 text-right"
//                         : "text-blue-400 text-left"
//                     }`}
//                   >
//                     <strong>{message.sender}:</strong> {message.text}
//                   </p>
//                   <p className="text-gray-500 text-xs text-right">
//                     {new Date(message.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Message Input */}
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 px-4 py-2 rounded-l border-t border-b border-l border-gray-600 bg-[#2d3748] text-white focus:outline-none"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 px-4 py-2 text-white rounded-r hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
////////////////// في شوية تعديلات : 
// 1- في المكان الذي يظهر فيه الاسم في الشات : بدي يبقى الاسم عاليسار ولونه سكني وهيك حتى لما يسوي رفرش
//// بدي اسوي انه لما يعمل اليوزر لوج اوت يبطل مبين فالاكتف 
//// بدي فصفحة الادمن انه يقدر يشوف تو لستس وحد للافيلابل ادمنز ووحدة لليوزر
/////////// انه اللوج ان والساين اب نفس الديزاين االمطلوب 
///////////////// انه اسوي شغلة الداشبورد
///////////////ميبقى رييسبونسف كله
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef(null); // WebSocket reference
  const username = localStorage.getItem("username"); // Current user's username
  const role = localStorage.getItem("role"); // Current user's role

  // Fetch contacts (Admins or Users)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const query =
          role === "Admin"
            ? `
              query {
                getAllUsers {
                  username
                  profilePhoto
                }
              }
            `
            : `
              query {
                getActiveAdmins {
                  username
                  profilePhoto
                }
              }
            `;

        const response = await axios.post("http://localhost:5000/graphql", {
          query,
        });

        const data =
          role === "Admin" ? response.data.data.getAllUsers : response.data.data.getActiveAdmins;
        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, [role]);

  // Establish WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("WebSocket connection established for", username);
      ws.current.send(JSON.stringify({ type: "init", username }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);

      // Append message if it belongs to the selected conversation
      if (
        (data.sender === selectedContact && data.recipient === username) ||
        (data.sender === username && data.recipient === selectedContact)
      ) {
        setMessages((prev) => [
          ...prev,
          { sender: data.sender, text: data.text, timestamp: data.timestamp },
        ]);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [username, selectedContact]);

  // Fetch chat history when a conversation is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedContact) {
        try {
          const response = await axios.post("http://localhost:5000/graphql", {
            query: `
              query {
                getMessages(sender: "${username}", recipient: "${selectedContact}") {
                  sender
                  text
                  timestamp
                }
              }
            `,
          });
          setMessages(response.data.data.getMessages);
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      }
    };

    fetchMessages();
  }, [selectedContact]);

  // Send message
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const messageData = {
        type: "message",
        from: username,
        to: selectedContact,
        text: newMessage,
      };

      console.log("Sending message:", messageData);
      ws.current.send(JSON.stringify(messageData));

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: newMessage, timestamp: new Date().toISOString() },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex bg-[#1a202c] min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Chat Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 mt-4"
        } p-6 w-full text-white`}
      >
        <h1 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Chat</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={`Search for a ${role === "Admin" ? "user" : "admin"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
          />
        </div>

        {/* Contacts List */}
        <div className="bg-[#2d3748] p-4 rounded mb-6">
          <h2 className="text-lg md:text-xl text-white mb-4">
            {role === "Admin" ? "Available Users" : "Available Admins"}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {contacts
              .filter((person) =>
                person.username.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((person) => (
                <button
                  key={person.username}
                  onClick={() => setSelectedContact(person.username)}
                  className={`flex flex-col items-center cursor-pointer ${
                    selectedContact === person.username ? "text-blue-500" : "text-white"
                  }`}
                >
                  <img
                    src={person.profilePhoto || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 bg-gray-600 rounded-full"
                  />
                  <span className="mt-2 text-sm">{person.username}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Chat Section */}
        {selectedContact && (
          <div className="bg-[#2d3748] p-4 rounded flex flex-col flex-grow">
            <h2 className="text-lg md:text-xl text-white mb-4">Chat with: {selectedContact}</h2>
            <div className="bg-[#1a202c] p-4 rounded overflow-y-auto mb-4 flex-grow scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {messages.map((message, index) => (
                <div key={index} className="mb-2">
                  <p
                    className={`${
                      message.sender === "You"
                        ? "text-green-400 text-right"
                        : "text-blue-400 text-left"
                    }`}
                  >
                    <strong>{message.sender}:</strong> {message.text}
                  </p>
                  <p className="text-gray-500 text-xs text-right">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
