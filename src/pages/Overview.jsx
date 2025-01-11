// import React from "react";
// import Sidebar from "../components/Sidebar";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
// import { Pie, Bar } from "react-chartjs-2";
// import { gql, useQuery } from "@apollo/client"; // <-- import useQuery, gql
// import "leaflet/dist/leaflet.css";

// import MapView from "../components/MapView"; // or wherever you placed it

// // Register chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const GET_VILLAGES = gql`
//   query {
//     getVillages {
//       id
//       name
//       region
//       landArea
//       latitude
//       longitude
//       tags
//       image
//       populationSize
//       ageDistribution
//       genderRatios
//       growthRate
//     }
//   }
// `;


// const Overview = () => {
//   const { loading, error, data } = useQuery(GET_VILLAGES);

//   if (loading) return <p className="text-white">Loading villages...</p>;
//   if (error) return <p className="text-white">Error loading villages.</p>;

//   // 2) data.getVillages is the array from villages.json
//   const villages = data.getVillages || [];

//   const totalVillages = villages.length;
//   // Assuming villages is an array from your GraphQL data, e.g. data.getVillages
// const totalUrbanAreas = villages.filter(
//   (v) => v.tags && v.tags.includes("urban")
// ).length;

//   //const totalPopulationSize = villages.reduce((sum, v) => sum + v.population, 0);
//   const totalPopulationSize = villages.reduce(
//     (sum, village) => sum + (village.populationSize || 0),
//     0
//   );
  
//   const averageLandArea = (
//     villages.reduce((sum, v) => sum + v.landArea, 0) / villages.length
//   ).toFixed(2);

//   //const ageDistribution = { "0-18": 30, "19-35": 40, "36-50": 20, "51-65": 7, "65+": 3 };
//   const genderRatios = { Male: 50, Female: 50 };

//   const parseAgeDistribution = (str) => {
//     const result = { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 };
//     if (!str) return result;

//     str.split(",").forEach((part) => {
//       const [range, percent] = part.trim().split(":");
//       if (range && percent) {
//         result[range.trim()] = parseFloat(percent.replace("%", "").trim()) || 0;
//       }
//     });

//     return result;
//   };

//   const parseGenderRatios = (str) => {
//     const result = { Male: 0, Female: 0 };
//     if (!str) return result;

//     str.split(",").forEach((part) => {
//       const [gender, percent] = part.trim().split(":");
//       if (gender && percent) {
//         result[gender.trim()] = parseFloat(percent.replace("%", "").trim()) || 0;
//       }
//     });

//     return result;
//   };

//   const sumGenderRatios = { Male: 0, Female: 0 };
//   let villageCountGender = 0;

//   // Compute average age distribution
//   const sumAgeDistribution = { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 };
//   let villageCount = 0;

//   villages.forEach((village) => {
//     if (village.ageDistribution) {
//       const parsed = parseAgeDistribution(village.ageDistribution);
//       Object.keys(sumAgeDistribution).forEach((key) => {
//         sumAgeDistribution[key] += parsed[key];
//       });
//       villageCount++;
//     }

//     if (village.genderRatios) {
//       const parsedGender = parseGenderRatios(village.genderRatios);
//       Object.keys(sumGenderRatios).forEach((key) => {
//         sumGenderRatios[key] += parsedGender[key];
//       });
//       villageCountGender++;
//     }
//   });

//   // Calculate average for each bracket
//   const avgAgeDistribution = villageCount
//     ? Object.fromEntries(
//         Object.entries(sumAgeDistribution).map(([key, value]) => [key, value / villageCount])
//       )
//     : { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 };

//     const avgGenderRatios = villageCountGender
//     ? Object.fromEntries(
//         Object.entries(sumGenderRatios).map(([key, value]) => [key, value / villageCountGender])
//       )
//     : { Male: 0, Female: 0 };

//   const ageChartData = {
//     labels: Object.keys(avgAgeDistribution),
//     datasets: [
//       {
//         data: Object.values(avgAgeDistribution),
//         backgroundColor: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"],
//       },
//     ],
//   };

//   const populationChartData = {
//     labels: villages.map((v) => v.name),
//     datasets: [
//       {
//         label: "Population Size",
//         data: villages.map((v) => v.populationSize || 0),
//         backgroundColor: "#2f71a3",
//       },
//     ],
//   }; 

//   const genderChartData = {
//     labels: Object.keys(avgGenderRatios),
//     datasets: [
//       {
//         data: Object.values(avgGenderRatios),
//         backgroundColor: ["#2f71a3", "#a74c65"],
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-6 text-white mt-0">
//         <h1 className="text-2xl font-bold mb-2">Overview</h1>

//         {/* Map Section */}
//     {/* Map Section */}
// {/* Map Section */}
// <div className="mb-6">
//   <div className="w-full w-full  h-[300px] rounded-lg border border-gray-600 overflow-hidden">
//     <MapView villages={villages} />
//   </div>
// </div>



//         {/* Statistics Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
//           <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold">Total Number of Villages</h3>
//             <p className="text-xl text-white-400">{totalVillages}</p>
//           </div>
//           <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold">Total Number of Urban Areas</h3>
//             <p className="text-xl text-white-400">{totalUrbanAreas}</p>
//           </div>
//           <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold">Total Population size</h3>
//             <p className="text-xl text-white-400">{totalPopulationSize}</p>
//           </div>
//           <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold">Average Land Area</h3>
//             <p className="text-xl text-white text-left">{averageLandArea} </p>
//             <p className=" text-gray-400 text-left">sq km</p>
//           </div>
//         </div> 

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Age Distribution Pie Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white mb-4 text-center">Age Distribution</h3>
//             <Pie data={ageChartData} />
//           </div>

//           {/* Gender Ratios Pie Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white mb-4 text-center">Gender Ratios</h3>
//             <Pie data={genderChartData} />
//           </div>
//         </div>

//         {/* Population Bar Chart */}
//         <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//           <Bar data={populationChartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
//////////////////////////////////////////
// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
// import { Pie, Bar } from "react-chartjs-2";
// import { gql, useQuery } from "@apollo/client";
// import "leaflet/dist/leaflet.css";
// import MapView from "../components/MapView"; // Map component

// // Register chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// // GraphQL query
// const GET_VILLAGES = gql`
//   query {
//     getVillages {
//       id
//       name
//       region
//       landArea
//       latitude
//       longitude
//       tags
//       image
//       populationSize
//       ageDistribution
//       genderRatios
//       growthRate
//     }
//   }
// `;

// const Overview = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
//   const { loading, error, data } = useQuery(GET_VILLAGES);

//   if (loading) return <p className="text-white">Loading villages...</p>;
//   if (error) return <p className="text-white">Error loading villages.</p>;

//   // Villages data
//   const villages = data?.getVillages || [];
//   const totalVillages = villages.length;
//   const totalUrbanAreas = villages.filter((v) => v.tags?.includes("urban")).length;
//   const totalPopulationSize = villages.reduce((sum, v) => sum + (v.populationSize || 0), 0);
//   const averageLandArea = (villages.reduce((sum, v) => sum + v.landArea, 0) / villages.length).toFixed(2);

//   // Helper functions to parse data
//   const parseAgeDistribution = (str) => {
//     const result = { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 };
//     if (!str) return result;
//     str.split(",").forEach((part) => {
//       const [range, percent] = part.split(":");
//       result[range.trim()] = parseFloat(percent.replace("%", "").trim()) || 0;
//     });
//     return result;
//   };

//   const sumAgeDistribution = villages.reduce((acc, v) => {
//     const parsed = parseAgeDistribution(v.ageDistribution || "");
//     Object.keys(acc).forEach((key) => {
//       acc[key] += parsed[key];
//     });
//     return acc;
//   }, { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 });

//   const ageChartData = {
//     labels: Object.keys(sumAgeDistribution),
//     datasets: [
//       {
//         data: Object.values(sumAgeDistribution),
//         backgroundColor: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"],
//       },
//     ],
//   };

//   const genderChartData = {
//     labels: ["Male", "Female"],
//     datasets: [
//       {
//         data: [50, 50], // Example data
//         backgroundColor: ["#2f71a3", "#a74c65"],
//       },
//     ],
//   };

//   const populationChartData = {
//     labels: villages.map((v) => v.name),
//     datasets: [
//       {
//         label: "Population Size",
//         data: villages.map((v) => v.populationSize || 0),
//         backgroundColor: "#2f71a3",
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 p-6 ${
//           isSidebarOpen ? "ml-64" : "ml-16"
//         }`}
//       >
//         <h1 className="text-2xl font-bold mb-4 text-white">Overview</h1>

//         {/* Map Section */}
//         <div className="mb-6">
//           <div className="h-64 w-full rounded-lg border border-gray-600 overflow-hidden">
//             <MapView villages={villages} />
//           </div>
//         </div>

//         {/* Statistics Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Total Number of Villages</h3>
//             <p className="text-xl text-gray-300">{totalVillages}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Total Urban Areas</h3>
//             <p className="text-xl text-gray-300">{totalUrbanAreas}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Total Population</h3>
//             <p className="text-xl text-gray-300">{totalPopulationSize}</p>
//           </div>
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white">Average Land Area</h3>
//             <p className="text-xl text-gray-300">{averageLandArea} sq km</p>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Age Distribution Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white text-center">Age Distribution</h3>
//             <Pie data={ageChartData} />
//           </div>

//           {/* Gender Ratios Chart */}
//           <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-white text-center">Gender Ratios</h3>
//             <Pie data={genderChartData} />
//           </div>
//         </div>

//         {/* Population Chart */}
//         <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-bold text-white text-center mb-4">Population by Village</h3>
//           <Bar data={populationChartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { gql, useQuery } from "@apollo/client";
import "leaflet/dist/leaflet.css";
import MapView from "../components/MapView";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// GraphQL query
const GET_VILLAGES = gql`
  query {
    getVillages {
      id
      name
      region
      landArea
      latitude
      longitude
      tags
      image
      populationSize
      ageDistribution
      genderRatios
      growthRate
    }
  }
`;

const Overview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { loading, error, data } = useQuery(GET_VILLAGES);

  if (loading) return <p className="text-white">Loading villages...</p>;
  if (error) return <p className="text-white">Error loading villages.</p>;

  // Villages data
  const villages = data?.getVillages || [];
  const totalVillages = villages.length;
  const totalUrbanAreas = villages.filter((v) => v.tags?.includes("urban")).length;
  const totalPopulationSize = villages.reduce((sum, v) => sum + (v.populationSize || 0), 0);
  const averageLandArea = (villages.reduce((sum, v) => sum + v.landArea, 0) / villages.length).toFixed(2);

  // Parsing data
  const parseAgeDistribution = (str) => {
    const result = { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 };
    if (!str) return result;
    str.split(",").forEach((part) => {
      const [range, percent] = part.split(":");
      result[range.trim()] = parseFloat(percent.replace("%", "").trim()) || 0;
    });
    return result;
  };

  const sumAgeDistribution = villages.reduce((acc, v) => {
    const parsed = parseAgeDistribution(v.ageDistribution || "");
    Object.keys(acc).forEach((key) => {
      acc[key] += parsed[key];
    });
    return acc;
  }, { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "65+": 0 });

  const ageChartData = {
    labels: Object.keys(sumAgeDistribution),
    datasets: [
      {
        data: Object.values(sumAgeDistribution),
        backgroundColor: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"],
      },
    ],
  };

  const genderChartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [50, 50], // Example data
        backgroundColor: ["#2f71a3", "#a74c65"],
      },
    ],
  };

  const populationChartData = {
    labels: villages.map((v) => v.name),
    datasets: [
      {
        label: "Population Size",
        data: villages.map((v) => v.populationSize || 0),
        backgroundColor: "#2f71a3",
      },
    ],
  };

  return (
    <div className="flex bg-[#1a202c] min-h-screen overflow-hidden lg:overflow-visible">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
  className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full max-h-screen transition-all duration-300 ${
    isSidebarOpen ? "ml-64" : "ml-0"
   } p-4 sm:p-6 w-full text-white`}
   >
        <h1 className="text-3xl font-bold mb-4 mt-4">Overview</h1>

        {/* Map Section */}
        <div className="mb-6">
          <div className="h-[300px] w-full rounded-lg border border-gray-600 overflow-hidden">
            <MapView villages={villages} />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Number of Villages</h3>
            <p className="text-xl text-gray-300">{totalVillages}</p>
          </div>
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Urban Areas</h3>
            <p className="text-xl text-gray-300">{totalUrbanAreas}</p>
          </div>
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Population</h3>
            <p className="text-xl text-gray-300">{totalPopulationSize}</p>
          </div>
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Average Land Area</h3>
            <p className="text-xl text-gray-300">{averageLandArea} sq km</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Age Distribution Chart */}
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center">Age Distribution</h3>
            <Pie data={ageChartData} />
          </div>

          {/* Gender Ratios Chart */}
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center">Gender Ratios</h3>
            <Pie data={genderChartData} />
          </div>
        </div>

        {/* Population Chart */}
        <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-center mb-4">Population by Village</h3>
          <Bar data={populationChartData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
