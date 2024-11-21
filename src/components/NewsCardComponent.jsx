import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card style={{ 
      maxWidth: '400px', 
      margin: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      transition: 'box-shadow 0.3s', 
      fontFamily: 'Roboto, sans-serif',
      minHeight: '400px' // Set a fixed height for the card
    }}>
      {!viewSummary && (
        <>
          {image && (
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={title}
              style={{ objectFit: 'cover', height: '180px' }}
            />
          )}
          <CardContent>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '16px' 
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
            <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', marginBottom: '8px', fontFamily: 'Roboto, sans-serif' }}>
              {title}
            </Typography>
            <Typography variant="caption" style={{ color: '#888', marginBottom: '16px', display: 'block', fontFamily: 'Roboto, sans-serif' }}>
              {formatDate(publishedDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {truncateText(description, 150)}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'space-between', padding: '16px' }}>
            <Button
              size="small"
              startIcon={<FileText size={16} />}
              onClick={() => setViewSummary(true)}
              style={{
                color: '#007BFF',
                backgroundColor: '#D0EFFF',
                textTransform: 'none',
                fontFamily: 'Roboto, sans-serif',
              }}
              disabled={!summary || summary === 'No summary available'}
            >
              Summary
            </Button>
            <Button
              size="small"
              endIcon={<ExternalLink size={16} />}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#555', textTransform: 'none', fontFamily: 'Roboto, sans-serif' }}
            >
              Read More
            </Button>
          </CardActions>
        </>
      )}

      {viewSummary && (
        <CardContent>
          <Typography 
            variant="h6" 
            align="center" 
            style={{ 
              marginBottom: '20px', 
              color: '#333', 
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Summary
          </Typography>
          <Typography 
            variant="body1" 
            style={{ 
              textAlign: 'left', 
              padding: '0 16px',
              color: '#666',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            {summary}
          </Typography>
          <CardActions style={{ justifyContent: 'center', marginTop: '20px' }}>
            <Button 
              variant="outlined" 
              onClick={() => setViewSummary(false)}
              style={{
                color: '#007BFF',
                borderColor: '#007BFF',
                textTransform: 'none',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Back to Article
            </Button>
          </CardActions>
        </CardContent>
      )}
    </Card>
  );
};

export default NewsCardComponent;