import React from 'react';

const Post = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default Post;
