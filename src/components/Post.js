import React, { useState } from 'react';
import VotingSection from './VotingSection';
import PostDetails from './PostDetails';
import CommentSection from './CommentSection';

const Post = ({ post }) => {
  const initialVoteCount = post.ups;
  const [voteScore, setVoteScore] = useState(initialVoteCount);
  const [voteStatus, setVoteStatus] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      margin: '10px', 
      padding: '10px', 
      borderRadius: '8px',
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <VotingSection 
          voteScore={voteScore} 
          setVoteScore={setVoteScore} 
          voteStatus={voteStatus} 
          setVoteStatus={setVoteStatus}
          initialVoteCount={initialVoteCount}
        />
        
        <PostDetails post={post} />
      </div>

      <CommentSection 
        comments={comments} 
        setComments={setComments} 
        showComments={showComments} 
        setShowComments={setShowComments}
        numComments={post.num_comments}
      />
    </div>
  );
};

export default Post;
