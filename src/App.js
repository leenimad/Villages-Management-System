
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes

import SignupPage from "./pages/SignupPage";
import './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"; // Import the HomePage component
import DashboardPage from "./pages/DashboardPage";
import VillageManagement from "./pages/VillageManagement";
import Overview from "./pages/Overview";
function App() {
  return (
    // <div>
    //   <SignupPage />
    //   <LoginPage/>
    // </div>
    <Router>
    <Routes>
      {/* Default route */}
      <Route path="/" element={<HomePage />} />
      
      {/* Other routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/village-management" element={<VillageManagement />} />
    </Routes>
  </Router>
);
}
 
export default App;

