import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Title from '../components/title';
import NewsBox from '../components/newsBox';

const Home = () => {
  const [filter, setFilter] = useState('all'); // Default filter

  // Handle the filter change from Sidebar
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-gray-100 p-4">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 flex flex-col">
        {/* Title */}
        <div className="bg-[#dcd8f3]">
          <Title />
        </div>

        {/* NewsBox */}
        <div className="flex-grow p-4 overflow-y-auto">
          <NewsBox filter={filter} /> {/* Passing filter prop */}
        </div>
      </div>
    </div>
  );
};

export default Home;
