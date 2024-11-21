import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCardComponent from "./NewsCardComponent";

const NewsCards = ({ filter }) => {
  // Accept filter prop from NewsBox
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/news`);
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        console.error("Full error details:", err);
        setError(err.response?.data?.error || "Failed to fetch news");
        setLoading(false);
      }
    };
    fetchNews();
  }, []); // Refetch news whenever the filter changes
  useEffect(() => {
    // Filter news based on the selected filter
    let filtered = news;

    if (filter !== "all") {
      filtered = news.filter((article) => {
        // Check for sentiment filter
        if (
          ["positive", "neutral", "negative"].includes(filter.toLowerCase())
        ) {
          return article.sentiment.toLowerCase() === filter.toLowerCase();
        }

        // Check for source filter
        return (
          article.source.name.toLowerCase().replace(/\s+/g, "-") ===
          filter.toLowerCase()
        );
      });
    }

    setFilteredNews(filtered);
  }, [filter, news]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {filteredNews.length > 0 ? (
        filteredNews.map((article, index) => (
          <NewsCardComponent
            key={index}
            image={article.urlToImage}
            title={article.title}
            description={article.description}
            publishedDate={article.publishedAt}
            url={article.url}
            sentiment={article.sentiment}
            summary={article.summary}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No articles found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default NewsCards;
