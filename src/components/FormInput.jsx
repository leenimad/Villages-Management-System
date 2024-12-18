import React from "react";

const FormInput = ({ id, type = "text", placeholder }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default FormInput;
