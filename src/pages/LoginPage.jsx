
// import React, { useState } from "react";
// import axios from "axios";

// const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/graphql', {
//                 query: `
//                     query {
//                         login(username: "${username}", password: "${password}") {
//                             token
//                             role
//                         }
//                     }
//                 `
//             });
//             const { token, role } = response.data.data.login;
//             localStorage.setItem('token', token);
//             localStorage.setItem('role', role);
//             alert("Login Successful");
//         } catch (err) {
//             alert("Login Failed");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-900">
//             <div className="w-full max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-4">
//                         <label className="block text-gray-400 mb-2" htmlFor="username">Username</label>
//                         <input
//                             id="username"
//                             type="text"
//                             placeholder="Enter your username"
//                             className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
//                         <input
//                             id="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/graphql", {
        query: `
          query {
            login(username: "${username}", password: "${password}") {
              token
              role
            }
          }
        `,
      });

      const { token, role } = response.data.data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      alert("Login Successful!");
      navigate("/overview"); // Redirect to the overview page
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="username">
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
            <label className="block text-gray-400 mb-2" htmlFor="password">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
