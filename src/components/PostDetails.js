import React from 'react';

const PostDetails = ({ post }) => {
  const imageUrl = post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' ? post.thumbnail : null;

  return (
    <div style={{ marginLeft: '10px', flex: 1 }}>
      {imageUrl && (
        <div>
          <img 
            src={imageUrl} 
            alt="Post Thumbnail" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
          />
        </div>
      )}
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default PostDetails;
