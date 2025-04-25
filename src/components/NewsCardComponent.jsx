import React, { useState, useEffect } from 'react';
import { ExternalLink, FileText, ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react';

const toTitleCase = (str) => {
  return str.replace(/\b\w+/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const SentimentTag = ({ sentiment }) => {
  const getStyles = () => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return { backgroundColor: '#DFF2BF', color: '#4F8A10', border: '1px solid #D6E9C6' };
      case 'negative':
        return { backgroundColor: '#FFBABA', color: '#D8000C', border: '1px solid #F5C6CB' };
      default:
        return { backgroundColor: '#F0F0F0', color: '#555', border: '1px solid #E0E0E0' };
    }
  };

  const getIcon = () => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <ThumbsUp size={16} />;
      case 'negative':
        return <ThumbsDown size={16} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      ...getStyles(), 
      display: 'flex', 
      alignItems: 'center', 
      padding: '4px 8px', 
      borderRadius: '12px', 
      fontSize: '12px', 
      fontWeight: 500 
    }}>
      {getIcon()}
      <span style={{ marginLeft: '4px' }}>{toTitleCase(sentiment)}</span>
    </div>
  );
};

const NewsCardComponent = ({ 
  image, 
  title, 
  description, 
  publishedDate, 
  url, 
  sentiment = 'neutral', 
  summary = 'No summary available' 
}) => {
  const [viewSummary, setViewSummary] = useState(false);
  const [screenSize, setScreenSize] = useState('mobile');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Update screen size state when window resizes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setScreenSize('mobile');
      } else if (width <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive styles based on screen size
  const getCardStyles = () => {
    const baseStyles = {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      fontFamily: 'Roboto, sans-serif',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      height: '100%'
    };

    switch (screenSize) {
      case 'mobile':
        return {
          ...baseStyles,
          width: '100%',
          maxWidth: '100%',
          margin: '8px 0'
        };
      case 'tablet':
        return {
          ...baseStyles,
          width: '100%',
          margin: '10px'
        };
      case 'desktop':
        return {
          ...baseStyles,
          width: '100%',
          margin: '12px'
        };
    }
  };

  const getMediaStyles = () => {
    const baseStyles = {
      objectFit: 'cover',
      width: '100%'
    };

    switch (screenSize) {
      case 'mobile':
        return {
          ...baseStyles,
          height: '120px'
        };
      case 'tablet':
        return {
          ...baseStyles,
          height: '160px'
        };
      case 'desktop':
        return {
          ...baseStyles,
          height: '180px'
        };
    }
  };

  // Should we show description based on screen size
  const showDescription = screenSize !== 'mobile';

  return (
    <div style={getCardStyles()}>
      {!viewSummary && (
        <>
          {image && (
            <img
              src={image}
              alt={title}
              style={getMediaStyles()}
            />
          )}
          <div style={{ 
            padding: screenSize === 'mobile' ? '12px' : '16px', 
            flex: '1',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '12px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <SentimentTag sentiment={sentiment} />
              {summary && summary !== 'No summary available' && (
                <div 
                  style={{ 
                    backgroundColor: '#E6F2FF', 
                    color: '#0A67A3', 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: 500 
                  }}
                >
                  <BookOpen size={16} />
                  <span style={{ marginLeft: '4px' }}>Summary</span>
                </div>
              )}
            </div>
            <h2 style={{ 
              fontWeight: 'bold', 
              marginBottom: '8px', 
              fontFamily: 'Roboto, sans-serif',
              fontSize: screenSize === 'mobile' ? '1rem' : '1.25rem',
              lineHeight: '1.4'
            }}>
              {truncateText(title, screenSize === 'mobile' ? 60 : 100)}
            </h2>
            <div style={{ 
              color: '#888', 
              marginBottom: showDescription ? '12px' : '8px', 
              display: 'block', 
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.75rem'
            }}>
              {formatDate(publishedDate)}
            </div>
            {showDescription && (
              <div style={{ 
                fontFamily: 'Roboto, sans-serif',
                color: '#666',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                marginBottom: '8px',
                flex: '1'
              }}>
                {truncateText(description, screenSize === 'tablet' ? 100 : 150)}
              </div>
            )}
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'auto',
              flexDirection: screenSize === 'mobile' ? 'column' : 'row',
              gap: screenSize === 'mobile' ? '8px' : '12px'
            }}>
              <button
  onClick={() => setViewSummary(true)}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    color: '#007BFF',
    backgroundColor: '#D0EFFF',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: summary && summary !== 'No summary available' ? 'pointer' : 'not-allowed',
    opacity: summary && summary !== 'No summary available' ? 1 : 0.6,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.875rem',
    flex: screenSize === 'mobile' ? '1' : 'initial',
    whiteSpace: 'nowrap'
  }}
  disabled={!summary || summary === 'No summary available'}
>
  <FileText size={16} />
  <span style={{ marginLeft: '4px' }}>Summary</span>
</button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  color: '#555', 
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.875rem',
                  flex: screenSize === 'mobile' ? '1' : 'initial',
                  whiteSpace: 'nowrap'
                }}
              >Read More
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </>
      )}

      {viewSummary && (
        <div style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column' }}>
          <h2 
            style={{ 
              marginBottom: '16px', 
              color: '#333', 
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              fontSize: screenSize === 'mobile' ? '1rem' : '1.25rem',
              textAlign: 'center'
            }}
          >
            {truncateText(title, 40)}
          </h2>
          <div 
            style={{ 
              textAlign: 'left', 
              padding: '0 12px',
              color: '#666',
              fontFamily: 'Roboto, sans-serif',
              fontSize: screenSize === 'mobile' ? '0.875rem' : '1rem',
              lineHeight: '1.6',
              flex: '1',
              marginBottom: '16px'
            }}
          >
            {summary}
          </div>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => setViewSummary(false)}
              style={{
                color: '#007BFF',
                borderColor: '#007BFF',
                border: '1px solid #007BFF',
                backgroundColor: 'transparent',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '0.875rem',
                width: screenSize === 'mobile' ? '100%' : 'auto'
              }}
            >
              Back to Article
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Create a wrapper component for grid layout
const NewsCardGrid = ({ articles }) => {
  const [screenSize, setScreenSize] = useState('mobile');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setScreenSize('mobile');
      } else if (width <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine grid columns and styles based on screen size
  const getGridStyle = () => {
    const baseStyles = {
      display: 'grid',
      justifyContent: 'center', // Center the grid
      alignItems: 'start',
      gap: '16px', // Default gap between items
      padding: '16px', // Default padding around the grid
    };

    switch (screenSize) {
      case 'mobile':
        return {
          ...baseStyles,
          gridTemplateColumns: 'repeat(1, 1fr)', // Single column for mobile
          gap: '12px',
          padding: '12px',
        };
      case 'tablet':
        return {
          ...baseStyles,
          gridTemplateColumns: 'repeat(2, 1fr)', // Two columns for tablets
          gap: '16px',
          padding: '16px',
        };
      case 'desktop':
        return {
          ...baseStyles,
          gridTemplateColumns: 'repeat(3, 1fr)', // Three columns for desktops
          gap: '20px',
          padding: '20px',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div style={getGridStyle()}>
      {articles.map((article, index) => (
        <div
          key={index}
          style={{
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <NewsCardComponent {...article} />
        </div>
      ))}
    </div>
  );
};

// Keep the original default export for backward compatibility
const NewsCardComponentWithGrid = NewsCardComponent;
NewsCardComponentWithGrid.Grid = NewsCardGrid;

export default NewsCardComponentWithGrid;

// Also provide named exports for those who prefer them
export { NewsCardComponent, NewsCardGrid };
