const express = require("express");
const axios = require("axios");
const cors = require("cors");
const vader = require("vader-sentiment"); // Sentiment analysis library

const app = express();
const PORT = 3000;

// Replace with your valid NewsAPI key
const NEWS_API_KEY = "c2eaa0b029d343dbadb43c707f5747f5";
const SOURCES = [
  "cnn",
  "reuters",
  "bbc-news",
  "the-wall-street-journal",
  "associated-press",
  "bloomberg",
  "fox-news",
  "the-times-of-india"
];

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch news and perform sentiment analysis
app.get("/news", async (req, res) => {
  try {
    // Make requests to fetch news from each source
    const requests = SOURCES.map((source) =>
      axios.get(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${NEWS_API_KEY}`)
    );

    // Wait for all requests to complete
    const responses = await Promise.all(requests);

    // Combine all articles into a single array
    const articles = responses.flatMap((response) => response.data.articles || []);

    // Add sentiment analysis
    const analyzedArticles = articles.map((article) => {
      const description = article.description || ""; // Use empty string if description is missing
      const sentimentResult = vader.SentimentIntensityAnalyzer.polarity_scores(description);

      const sentiment =
        sentimentResult.compound >= 0.05
          ? "Positive"
          : sentimentResult.compound <= -0.05
          ? "Negative"
          : "Neutral";

      return { ...article, sentiment };
    });

    // Send analyzed articles as the response
    res.status(200).json({ articles: analyzedArticles });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Unable to fetch news" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
