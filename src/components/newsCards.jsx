import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCardComponent from "./NewsCardComponent";

const NewsCards = ({ filter }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://moodlens-1.onrender.com/news"
        );

        // Add validation and logging
        console.log("API Response:", response.data);

        if (!response.data || !response.data.articles) {
          throw new Error("Invalid data structure received from API");
        }

        setNews(response.data.articles);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array for initial load only

  useEffect(() => {
    try {
      // Add logging for debugging
      console.log("Current filter:", filter);
      console.log("Current news:", news);

      let filtered = news;

      if (filter && filter !== "all") {
        filtered = news.filter((article) => {
          // Validate article data
          if (!article || !article.sentiment || !article.source) {
            console.warn("Invalid article data:", article);
            return false;
          }

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

      console.log("Filtered news:", filtered);
      setFilteredNews(filtered);
    } catch (err) {
      console.error("Error filtering news:", err);
      setError("Error filtering news");
    }
  }, [filter, news]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {filteredNews && filteredNews.length > 0 ? (
        filteredNews.map((article, index) => (
          <NewsCardComponent
            key={`${article.title}-${index}`} // Better unique key
            image={article.urlToImage || "/placeholder-image.jpg"} // Fallback image
            title={article.title || "Untitled"}
            description={article.description || "No description available"}
            publishedDate={article.publishedAt}
            url={article.url}
            sentiment={article.sentiment || "Neutral"}
            summary={article.summary || "No summary available"}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-8">
          No articles found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default NewsCards;
