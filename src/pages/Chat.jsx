
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admins] = useState(["Admin1", "Admin2", "leen"]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex bg-[#1a202c] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Chat with Admins</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for an admin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 bg-[#2d3748] text-white focus:outline-none"
          />
        </div>

        {/* Available Admins */}
        <div className="bg-[#2d3748] p-4 rounded mb-6">
          <h2 className="text-xl text-white mb-4">Available Admins</h2>
          <div className="flex space-x-4">
            {admins
              .filter((admin) =>
                admin.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((admin) => (
                <button
                  key={admin}
                  onClick={() => setSelectedAdmin(admin)}
                  className={`flex flex-col items-center cursor-pointer ${
                    selectedAdmin === admin ? "text-blue-500" : "text-white"
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                  <span className="mt-2">{admin}</span>
                </button>
              ))}
            {admins.filter((admin) =>
              admin.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && (
              <p className="text-gray-400">No admins found.</p>
            )}
          </div>
        </div>

        {/* Chat Section */}
        {selectedAdmin && (
          <div className="bg-[#2d3748] p-4 rounded">
            <h2 className="text-xl text-white mb-4">Chat with: {selectedAdmin}</h2>
            <div className="bg-[#1a202c] p-4 rounded h-64 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <p
                  key={index}
                  className={`mb-2 ${
                    message.sender === "You"
                      ? "text-green-400"
                      : "text-blue-400"
                  }`}
                >
                  <strong>{message.sender}:</strong> {message.text}
                </p>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l border-t border-b border-l border-gray-600 bg-[#2d3748] text-white focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 px-4 py-2 text-white rounded-r hover:bg-blue-600"
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
