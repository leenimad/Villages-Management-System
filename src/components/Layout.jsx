import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {children}
    </div>
  );
};

export default Layout;
