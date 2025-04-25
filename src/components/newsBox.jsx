import React from 'react';
import NewsCards from './newsCards';

const NewsBox = ({ filter }) => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8" style={{ margin: 0 }}>
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <NewsCards filter={filter} />
    </div>
  );
};

export default NewsBox;
