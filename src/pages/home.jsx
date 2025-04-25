import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Title from '../components/title';
import NewsBox from '../components/newsBox';

const Home = () => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar - Only visible on desktop */}
      <div className="hidden lg:block lg:w-1/4 bg-white lg:h-screen lg:overflow-y-auto">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      {/* Mobile Sidebar is rendered inside the Sidebar component */}
      <div className="lg:hidden">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 flex flex-col h-screen p-0">
        {/* Title */}
        <div className="bg-[#dcd8f3] sticky top-0 z-10 p-0">
          <Title />
        </div>

        {/* NewsBox */}
        <div className="flex-grow overflow-y-auto p-0">
          <NewsBox filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Home;
