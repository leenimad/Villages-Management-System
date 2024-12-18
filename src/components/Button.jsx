import React from "react";

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {text}
    </button>
  );
};

export default Button;
