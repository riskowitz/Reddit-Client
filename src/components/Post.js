import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageSquare } from 'lucide-react';

const Post = ({ post }) => {
  const initialVoteCount = post.ups;  // Original score from Reddit API
  const [voteScore, setVoteScore] = useState(initialVoteCount);
  const [voteStatus, setVoteStatus] = useState(null); // 'upvoted', 'downvoted', or null

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const imageUrl = post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' ? post.thumbnail : null;

  const handleUpvote = () => {
    if (voteStatus === 'upvoted') {
      setVoteScore(initialVoteCount);
      setVoteStatus(null);
    } else {
      setVoteScore(initialVoteCount + 1);
      setVoteStatus('upvoted');
    }
  };

  const handleDownvote = () => {
    if (voteStatus === 'downvoted') {
      setVoteScore(initialVoteCount);
      setVoteStatus(null);
    } else {
      setVoteScore(initialVoteCount - 1);
      setVoteStatus('downvoted');
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const commentObject = { text: newComment, id: Date.now() };
      setComments([...comments, commentObject]);
      setNewComment("");
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
      borderRadius: '8px',
      flexDirection: 'column'
    }}>
      
      {/* Voting and Post Info */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {/* Voting Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ArrowUp 
            onClick={handleUpvote} 
            style={{ cursor: 'pointer', color: voteStatus === 'upvoted' ? 'green' : 'black' }} 
          />
          <span>{voteScore}</span>
          <ArrowDown 
            onClick={handleDownvote} 
            style={{ cursor: 'pointer', color: voteStatus === 'downvoted' ? 'red' : 'black' }} 
          />
        </div>

        {/* Image Display */}
        {imageUrl && (
          <div>
            <img 
              src={imageUrl} 
              alt="Post Thumbnail" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginLeft: '10px' }} 
            />
          </div>
        )}

        {/* Post Details */}
        <div style={{ marginLeft: '10px', flex: 1 }}>
          <h2>{post.title}</h2>
          <p>Author: {post.author}</p>
          <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>

        {/* Comment Button */}
        <div onClick={handleToggleComments} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <MessageSquare />
          <span>{comments.length + post.num_comments} Comments</span>
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div style={{ marginTop: '10px', width: '100%' }}>
          <div>
            {comments.map(comment => (
              <div key={comment.id} style={{ marginBottom: '5px', padding: '5px', background: '#f0f0f0', borderRadius: '5px' }}>
                {comment.text}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px' }}>
            <textarea 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '5px' }}
            />
            <button onClick={handleAddComment} style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
