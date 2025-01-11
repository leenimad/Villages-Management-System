
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef(null); // WebSocket reference
  const username = localStorage.getItem("username"); // Current user's username
  const role = localStorage.getItem("role"); // Current user's role
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
  }, [username,selectedContact]);

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
    <div className="flex bg-[#1a202c] min-h-screen overflow-hidden lg:overflow-visible">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    
          {/* Main Chat Content */}
    <div
      className={`flex-1 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
       } p-4 sm:p-6 w-full text-white `}
       >
   <h1 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 mt-7">Chat</h1>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={`Search for a ${role === "Admin" ? "user" : "admin"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 bg-[#ffff] text-black focus:outline-none"
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
                  className={`flex flex-col cursor-pointer ${
                    selectedContact === person.username ? "text-blue-500" : "text-white"
                  }`}
                >
                  <img
                    src={person.profilePhoto || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 bg-gray-600 rounded-full"
                  />
                  <span className="mt-2 text-l">{person.username}</span>
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
