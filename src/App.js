
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes

import SignupPage from "./pages/SignupPage";
//import './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"; // Import the HomePage component
import VillageManagement from "./pages/VillageManagement";
import Overview from "./pages/Overview";
import Chat from "./pages/Chat";
 import Gallery from "./pages/Gallery";
 import "leaflet/dist/leaflet.css";
import "./leafletConfig";
import EditUser from "./pages/EditUser";
 
 
function App() {
  return (
    <Router>
    <Routes>
      {/* Default route */}
      <Route path="/" element={<HomePage />} />
      
      {/* Other routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      <Route path="/Overview" element={<Overview />} />
      console.log("Rendering Overview Component");

      <Route path="/village-management" element={<VillageManagement />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/edit-profile" element={
    <EditUser
      userId={localStorage.getItem("userId")}
      initialUsername={localStorage.getItem("username")}
      initialProfilePhoto={localStorage.getItem("profilePhoto")}
      onClose={() => {/* optional navigation code */}}
    />
  } />
    </Routes>
  </Router>
);
}
 
export default App;

