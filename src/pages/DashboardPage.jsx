import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import VillageCard from '../components/VillageCard';

const DashboardPage = () => {
  const [villages, setVillages] = useState([
    { id: 1, name: 'Village A', region: 'Region 1', population: 1000 },
    { id: 2, name: 'Village B', region: 'Region 2', population: 1500 },
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {villages.map(village => (
            <VillageCard
              key={village.id}
              name={village.name}
              region={village.region}
              population={village.population}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
