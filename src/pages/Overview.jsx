// import React from "react";
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is in the same folder
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
// import { Pie, Bar } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const Overview = ({ villages }) => {
//   // Statistics Calculations
//   const totalVillages = villages.length;
//   const totalUrbanAreas = villages.filter((v) => v.isUrban).length;
//   const totalPopulation = villages.reduce((sum, v) => sum + v.population, 0);
//   const averageLandArea = (villages.reduce((sum, v) => sum + v.landArea, 0) / totalVillages).toFixed(2);

//   // Age Distribution Data
//   const ageDistribution = { "0-18": 35, "19-35": 30, "36-50": 20, "51-65": 10, "65+": 5 };
//   const ageChartData = {
//     labels: Object.keys(ageDistribution),
//     datasets: [
//       {
//         data: Object.values(ageDistribution),
//         backgroundColor: ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"],
//       },
//     ],
//   };

//   // Gender Ratio Data
//   const genderRatio = { Male: 55, Female: 45 };
//   const genderChartData = {
//     labels: Object.keys(genderRatio),
//     datasets: [
//       {
//         data: Object.values(genderRatio),
//         backgroundColor: ["#3498db", "#e74c3c"],
//       },
//     ],
//   };

//   // Population Bar Chart Data
//   const populationChartData = {
//     labels: villages.map((v) => v.name),
//     datasets: [
//       {
//         label: "Population",
//         data: villages.map((v) => v.population),
//         backgroundColor: "rgba(52, 152, 219, 0.7)",
//         borderColor: "rgba(52, 152, 219, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="ml-64 p-6 flex-1">
//         <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>

//         {/* Map Section */}
//         <div className="mb-6">
//           <iframe
//             src="https://www.openstreetmap.org/export/embed.html?bbox=34.5%2C31.5%2C35.5%2C32.5&layer=mapnik"
//             frameBorder="0"
//             className="w-full h-96 rounded-md shadow-md"
//             title="Village Locations"
//           ></iframe>
//         </div>

//         {/* Statistics Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold text-white">Total Number of Villages</h3>
//             <p className="text-2xl font-bold text-[#4FD1C5]">{totalVillages}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold text-white">Total Number of Urban Areas</h3>
//             <p className="text-2xl font-bold text-[#4FD1C5]">{totalUrbanAreas}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold text-white">Total Population Size</h3>
//             <p className="text-2xl font-bold text-[#4FD1C5]">{totalPopulation.toLocaleString()}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold text-white">Average Land Area</h3>
//             <p className="text-2xl font-bold text-[#4FD1C5]">{averageLandArea} sq km</p>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Age Distribution Pie Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold text-white mb-4">Age Distribution</h3>
//             <Pie data={ageChartData} options={{ plugins: { legend: { labels: { color: "#fff" } } } }} />
//           </div>

//           {/* Gender Ratios Pie Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold text-white mb-4">Gender Ratios</h3>
//             <Pie data={genderChartData} options={{ plugins: { legend: { labels: { color: "#fff" } } } }} />
//           </div>
//         </div>

//         {/* Population Bar Chart */}
//         <div className="bg-[#2d3748] p-4 rounded-md shadow-md">
//           <h3 className="text-lg font-semibold text-white mb-4">Population Distribution by Village</h3>
//           <div className="h-96">
//             <Bar
//               data={populationChartData}
//               options={{
//                 plugins: { tooltip: { callbacks: { label: (ctx) => `Population: ${ctx.raw.toLocaleString()}` } } },
//                 scales: {
//                   x: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
//                   y: { ticks: { color: "#fff", callback: (v) => v.toLocaleString() }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
