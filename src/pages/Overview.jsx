// import React, { useState } from "react";

// import Sidebar from "../components/Sidebar";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Pie, Bar } from "react-chartjs-2";
// import "leaflet/dist/leaflet.css";


// const Overview = () => {
//   const [villageData, setVillageData] = useState([
//     {
//       name: "Jabalia",
//       region: "Gaza Strip",
//       population: 50000,
//       area: 3.5,
//       coordinates: [31.5272, 34.4834],
//       urban: true,
//       demographics: { "0-18": 30, "19-35": 35, "36-50": 20, "51-65": 10, "65+": 5 },
//       genderRatio: { Male: 55, Female: 45 },
//     },
//     {
//       name: "Hebron",
//       region: "West Bank",
//       population: 150000,
//       area: 8.5,
//       coordinates: [31.5334, 35.0998],
//       urban: false,
//       demographics: { "0-18": 25, "19-35": 40, "36-50": 20, "51-65": 10, "65+": 5 },
//       genderRatio: { Male: 50, Female: 50 },
//     },
//     // Add more villages here
//   ]);

//   const totalVillages = villageData.length;
//   const totalUrbanAreas = villageData.filter((village) => village.urban).length;
//   const totalPopulation = villageData.reduce((sum, village) => sum + village.population, 0);
//   const averageLandArea = (
//     villageData.reduce((sum, village) => sum + village.area, 0) / totalVillages
//   ).toFixed(2);

//   const ageDistribution = villageData.reduce((acc, village) => {
//     Object.keys(village.demographics).forEach((key) => {
//       acc[key] = (acc[key] || 0) + village.demographics[key];
//     });
//     return acc;
//   }, {});

//   const genderRatio = villageData.reduce(
//     (acc, village) => {
//       acc.Male += village.genderRatio.Male;
//       acc.Female += village.genderRatio.Female;
//       return acc;
//     },
//     { Male: 0, Female: 0 }
//   );

//   const populationByVillage = {
//     labels: villageData.map((village) => village.name),
//     datasets: [
//       {
//         label: "Population",
//         data: villageData.map((village) => village.population),
//         backgroundColor: "rgba(52, 152, 219, 0.7)",
//         borderColor: "rgba(52, 152, 219, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       <Sidebar />

//       <div className="flex-1 p-6 text-white">
//         <h1 className="text-3xl font-bold mb-6">Overview</h1>

//         {/* Map Section */}
//         <div className="mb-6">
//           <MapContainer center={[31.5, 34.5]} zoom={7} style={{ height: "400px", borderRadius: "8px" }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
//             />
//             {villageData.map((village, index) => (
//               <Marker key={index} position={village.coordinates}>
//                 <Popup>
//                   {village.name} - {village.region}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
//           <div className="bg-[#2d3748] p-4 rounded-lg text-center shadow">
//             <h2 className="text-lg font-bold">Total Number of Villages</h2>
//             <p className="text-2xl mt-2">{totalVillages}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg text-center shadow">
//             <h2 className="text-lg font-bold">Total Number of Urban Areas</h2>
//             <p className="text-2xl mt-2">{totalUrbanAreas}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg text-center shadow">
//             <h2 className="text-lg font-bold">Total Population Size</h2>
//             <p className="text-2xl mt-2">{totalPopulation.toLocaleString()}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg text-center shadow">
//             <h2 className="text-lg font-bold">Average Land Area</h2>
//             <p className="text-2xl mt-2">{averageLandArea} sq km</p>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow">
//             <h2 className="text-lg font-bold text-center mb-4">Age Distribution</h2>
//             <Pie
//               data={{
//                 labels: Object.keys(ageDistribution),
//                 datasets: [
//                   {
//                     data: Object.values(ageDistribution),
//                     backgroundColor: ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"],
//                   },
//                 ],
//               }}
//               options={{ plugins: { legend: { labels: { color: "#fff" } } } }}
//             />
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow">
//             <h2 className="text-lg font-bold text-center mb-4">Gender Ratios</h2>
//             <Pie
//               data={{
//                 labels: ["Male", "Female"],
//                 datasets: [
//                   {
//                     data: [genderRatio.Male, genderRatio.Female],
//                     backgroundColor: ["#3498db", "#e74c3c"],
//                   },
//                 ],
//               }}
//               options={{ plugins: { legend: { labels: { color: "#fff" } } } }}
//             />
//           </div>
//         </div>

//         {/* Population Bar Chart */}
//         <div className="bg-[#2d3748] p-4 rounded-lg shadow">
//           <h2 className="text-lg font-bold text-center mb-4">Population Distribution by Village</h2>
//           <Bar
//             data={populationByVillage}
//             options={{
//               plugins: { legend: { display: false } },
//               scales: {
//                 x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
//                 y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
// import React from "react";
// import Sidebar from "../components/Sidebar";
// import { Pie, Bar } from "react-chartjs-2";

// const Overview = () => {
//   const villages = [
//     { name: "Jabalia", isUrban: false, population: 50000, landArea: 20 },
//     { name: "Beit Lahia", isUrban: false, population: 30000, landArea: 25 },
//     { name: "Quds", isUrban: true, population: 200000, landArea: 15 },
//     { name: "Hebron", isUrban: true, population: 150000, landArea: 30 },
//   ];

//   const totalVillages = villages.length;
//   const totalUrbanAreas = villages.filter((village) => village.isUrban).length;
//   const totalPopulation = villages.reduce((sum, v) => sum + v.population, 0);
//   const averageLandArea = (
//     villages.reduce((sum, v) => sum + v.landArea, 0) / villages.length
//   ).toFixed(2);

//   const ageDistribution = { "0-18": 30, "19-35": 40, "36-50": 20, "51-65": 7, "65+": 3 };
//   const genderRatios = { Male: 50, Female: 50 };

//   const populationChartData = {
//     labels: villages.map((village) => village.name),
//     datasets: [
//       {
//         label: "Population",
//         data: villages.map((village) => village.population),
//         backgroundColor: "rgba(52, 152, 219, 0.7)",
//         borderColor: "rgba(52, 152, 219, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const ageChartData = {
//     labels: Object.keys(ageDistribution),
//     datasets: [
//       {
//         data: Object.values(ageDistribution),
//         backgroundColor: ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"],
//       },
//     ],
//   };

//   const genderChartData = {
//     labels: Object.keys(genderRatios),
//     datasets: [
//       {
//         data: Object.values(genderRatios),
//         backgroundColor: ["#3498db", "#e74c3c"],
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-6">
//         <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>

//         {/* Map Section */}
//         <div className="mb-6">
//           <iframe
//             title="Map"
//             src="https://www.openstreetmap.org/export/embed.html?bbox=34.5%2C31.5%2C35.5%2C32.5&layer=mapnik"
//             className="w-full h-64 rounded-md border border-gray-600"
//           ></iframe>
//         </div>

//         {/* Statistics Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Total Villages</h3>
//             <p className="text-2xl text-blue-400">{totalVillages}</p>
//           </div>
//           <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Urban Areas</h3>
//             <p className="text-2xl text-green-400">{totalUrbanAreas}</p>
//           </div>
//           <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Total Population</h3>
//             <p className="text-2xl text-red-400">{totalPopulation.toLocaleString()}</p>
//           </div>
//           <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Average Land Area</h3>
//             <p className="text-2xl text-yellow-400">{averageLandArea} sq km</p>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Age Distribution Pie Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white mb-4">Age Distribution</h3>
//             <Pie data={ageChartData} />
//           </div>

//           {/* Gender Ratios Pie Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white mb-4">Gender Ratios</h3>
//             <Pie data={genderChartData} />
//           </div>
//         </div>

//         {/* Population Bar Chart */}
//         <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-bold text-white mb-4">Population by Village</h3>
//           <Bar data={populationChartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
import React from "react";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Overview = () => {
  const villages = [
    { name: "Jabalia", isUrban: false, population: 50000, landArea: 20 },
    { name: "Beit Lahia", isUrban: false, population: 30000, landArea: 25 },
    { name: "Quds", isUrban: true, population: 200000, landArea: 15 },
    { name: "Hebron", isUrban: true, population: 150000, landArea: 30 },
  ];

  const totalVillages = villages.length;
  const totalUrbanAreas = villages.filter((v) => v.isUrban).length;
  const totalPopulation = villages.reduce((sum, v) => sum + v.population, 0);
  const averageLandArea = (
    villages.reduce((sum, v) => sum + v.landArea, 0) / villages.length
  ).toFixed(2);

  const ageDistribution = { "0-18": 30, "19-35": 40, "36-50": 20, "51-65": 7, "65+": 3 };
  const genderRatios = { Male: 50, Female: 50 };

  const populationChartData = {
    labels: villages.map((v) => v.name),
    datasets: [
      {
        label: "Population",
        data: villages.map((v) => v.population),
        backgroundColor: "rgba(52, 152, 219, 0.7)",
        borderColor: "rgba(52, 152, 219, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ageChartData = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        data: Object.values(ageDistribution),
        backgroundColor: ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"],
      },
    ],
  };

  const genderChartData = {
    labels: Object.keys(genderRatios),
    datasets: [
      {
        data: Object.values(genderRatios),
        backgroundColor: ["#3498db", "#e74c3c"],
      },
    ],
  };

  return (
    <div className="flex bg-[#1a202c] min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Overview</h1>

        {/* Map Section */}
        <div className="mb-6">
          <iframe
            title="Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=34.5%2C31.5%2C35.5%2C32.5&layer=mapnik"
            className="w-full h-64 rounded-md border border-gray-600"
          ></iframe>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Villages</h3>
            <p className="text-2xl text-blue-400">{totalVillages}</p>
          </div>
          <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Urban Areas</h3>
            <p className="text-2xl text-green-400">{totalUrbanAreas}</p>
          </div>
          <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Population</h3>
            <p className="text-2xl text-red-400">{totalPopulation.toLocaleString()}</p>
          </div>
          <div className="bg-[#2d3748] text-center p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Average Land Area</h3>
            <p className="text-2xl text-yellow-400">{averageLandArea} sq km</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Age Distribution Pie Chart */}
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Age Distribution</h3>
            <Pie data={ageChartData} />
          </div>

          {/* Gender Ratios Pie Chart */}
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Gender Ratios</h3>
            <Pie data={genderChartData} />
          </div>
        </div>

        {/* Population Bar Chart */}
        <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-white mb-4">Population by Village</h3>
          <Bar data={populationChartData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
