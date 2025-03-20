import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Post = ({ post }) => {
  const initialVoteCount = post.ups;  // Original score from Reddit API
  const [voteScore, setVoteScore] = useState(initialVoteCount);
  const [voteStatus, setVoteStatus] = useState(null); // 'upvoted', 'downvoted', or null

  const imageUrl = post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' ? post.thumbnail : null;

  const handleUpvote = () => {
    if (voteStatus === 'upvoted') {
      // Undo upvote
      setVoteScore(initialVoteCount);
      setVoteStatus(null);
    } else {
      // Upvote
      const newScore = voteStatus === 'downvoted' ? initialVoteCount + 1 : initialVoteCount + 1;
      setVoteScore(newScore);
      setVoteStatus('upvoted');
    }
  };

  const handleDownvote = () => {
    if (voteStatus === 'downvoted') {
      // Undo downvote
      setVoteScore(initialVoteCount);
      setVoteStatus(null);
    } else {
      // Downvote
      const newScore = voteStatus === 'upvoted' ? initialVoteCount - 1 : initialVoteCount - 1;
      setVoteScore(newScore);
      setVoteStatus('downvoted');
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      margin: '10px', 
      padding: '10px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px', 
      borderRadius: '8px'
    }}>
      
      {/* Voting Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ArrowUp 
          onClick={handleUpvote} 
          style={{ 
            cursor: 'pointer', 
            marginBottom: '5px', 
            color: voteStatus === 'upvoted' ? 'green' : 'black' 
          }} 
        />
        <span>{voteScore}</span>
        <ArrowDown 
          onClick={handleDownvote} 
          style={{ 
            cursor: 'pointer', 
            marginTop: '5px', 
            color: voteStatus === 'downvoted' ? 'red' : 'black' 
          }} 
        />
      </div>

      {/* Image Display */}
      {imageUrl && (
        <div>
          <img 
            src={imageUrl} 
            alt="Post Thumbnail" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
          />
        </div>
      )}

      {/* Post Details */}
      <div>
        <h2>{post.title}</h2>
        <p>Author: {post.author}</p>
        <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default Post;
