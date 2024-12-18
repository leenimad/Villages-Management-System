import React from "react";
import VillageCard from "../components/VillageCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const villages = [
  { id: 1, name: "Jabalia", region: "Gaza Strip" },
  { id: 2, name: "Beit Lahia", region: "Gaza Strip" },
  { id: 3, name: "Quds", region: "West Bank" },
  { id: 4, name: "Shejaiya", region: "Gaza Strip" },
  { id: 5, name: "Hebron", region: "West Bank" },
];

const VillageManagement = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900 min-h-screen text-white">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">View Village List</h2>
          <SearchBar />
          <div>
            {villages.map((village) => (
              <VillageCard key={village.id} villageName={village.name} region={village.region} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default VillageManagement;
