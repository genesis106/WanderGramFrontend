import React from 'react';
import NewsCards from './newsCards';

const NewsBox = ({ filter }) => {  // Accept filter prop passed from Home.jsx
  return (
    <div className="container mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <NewsCards filter={filter} /> {/* Pass the filter to NewsCards */}
    </div>
  );
};

export default NewsBox;
