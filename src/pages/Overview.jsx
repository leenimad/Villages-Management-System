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
        backgroundColor: "rgba(54,91,102,255)",
        borderColor: "rgba(64,118,126,255)",
        borderWidth: 1,
      },
    ],
  };

  const ageChartData = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        data: Object.values(ageDistribution),
        backgroundColor: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"],
      },
    ],
  };

  const genderChartData = {
    labels: Object.keys(genderRatios),
    datasets: [
      {
        data: Object.values(genderRatios),
        backgroundColor: ["#2f71a3", "#a74c65"],
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
          <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Number of Villages</h3>
            <p className="text-xl text-white-400">{totalVillages}</p>
          </div>
          <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Number of Urban Areas</h3>
            <p className="text-xl text-white-400">{totalUrbanAreas}</p>
          </div>
          <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Population size</h3>
            <p className="text-xl text-white-400">{totalPopulation.toLocaleString()}</p>
          </div>
          <div className="bg-[#2d3748] text-left p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Average Land Area</h3>
            <p className="text-xl text-white text-left">{averageLandArea} </p>
            <p className=" text-gray-400 text-left">sq km</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Age Distribution Pie Chart */}
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Age Distribution</h3>
            <Pie data={ageChartData} />
          </div>

          {/* Gender Ratios Pie Chart */}
          <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Gender Ratios</h3>
            <Pie data={genderChartData} />
          </div>
        </div>

        {/* Population Bar Chart */}
        <div className="bg-[#2d3748] p-4 rounded-lg shadow-md">
          <Bar data={populationChartData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
