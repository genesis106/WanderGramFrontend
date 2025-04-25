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
<div className="flex flex-col lg:flex-row h-screen bg-white" style={{ padding: 0, margin: 0 }}>      <div className="w-full lg:w-1/4 bg-gray-100 p-4 lg:h-screen lg:overflow-y-auto">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 flex flex-col h-screen" style={{ padding: 0 }}>
        {/* Title */}
        <div className="bg-[#dcd8f3] sticky top-0 z-10" style={{ padding: 0 }}>
          <Title />
        </div>

        {/* NewsBox */}
        <div className="flex-grow overflow-y-auto" style={{ padding: 0, margin: 0 }}>
          <NewsBox filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Home;
