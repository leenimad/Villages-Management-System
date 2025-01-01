// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignupPage = () => {
//   const [fullname, setFullname] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/graphql", {
//         query: `
//           mutation {
//             signup(userInput: {
//               username: "${username}",
//               password: "${password}",
//               role: "user"
//             }) {
//               id
//               username
//             }
//           }
//         `,
//       });

//       if (response.data.errors) {
//         alert("Signup failed due to server error.");
//       } else {
//         setShowSuccessModal(true); // Show the success modal
//       }
//     } catch (err) {
//       console.error("Signup failed:", err.message);
//       alert("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="w-full max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-white mb-4">Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label className="block text-white mb-2" htmlFor="fullname">
//               Full Name
//             </label>
//             <input
//               id="fullname"
//               type="text"
//               placeholder="Enter your full name"
//               className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={fullname}
//               onChange={(e) => setFullname(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Enter your username"
//               className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-white mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>

//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h2 className="text-white text-xl mb-4">Signup Successful!</h2>
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUserExistsModal, setShowUserExistsModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/graphql", {
        query: `
          mutation {
            signup(userInput: {
              username: "${username}",
              password: "${password}",
              role: "user"
            }) {
              id
              username
            }
          }
        `,
      });
  
      // if (response.data.errors) {
      //   const errorMessage = response.data.errors[0]?.message;
  
      //   if (errorMessage === "User already exists.") {
      //     setShowUserExistsModal(true); // Show "User already exists" modal
      //   } else {
      //     alert("Signup failed due to an unexpected error.");
      //   }
      // } else {
      //   setShowSuccessModal(true); // Show success modal
      // }
  //    } catch (err) {
  //     console.error("Signup failed:", err.message);
  //     if (err.response?.status === 500) {
  //      alert("Server error. Please try again later.");
  //     } else {
  //       setShowUserExistsModal(true);
  //       alert("Signup failed. Please try again."); 
  //     }
  //   }
  // };
  setShowSuccessModal(true);
} catch (err) {
  if (err.response && err.response.data && err.response.data.errors) {
    const errorMessage = err.response.data.errors[0]?.message;

    if (errorMessage === "User already exists.") {
      setShowUserExistsModal(true); // Show "User already exists" modal
    } else {
      alert("Signup failed due to an unexpected error.");
    }
  } else {
    // Network/Server errors
    alert("Signup failed due to a server or network error. Please try again.");
  }
}
};
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="fullname">
              Full Name
            </label> 
            <input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 w-96 h-54 p-6 rounded-lg text-center">
            <h2 className="text-white text-xl mb-4">Signup Successful!</h2>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* User Exists Modal */}
      {showUserExistsModal && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-gray-800  w-96 h-54 p-6 rounded-lg text-center">
      <h2 className="text-white text-xl mb-4">
        User already exists. Please log in instead.
      </h2>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SignupPage;
