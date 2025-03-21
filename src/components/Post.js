import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import VotingSection from './VotingSection';
import PostDetails from './PostDetails';
import CommentSection from './CommentSection';

const Post = ({ post }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const initialVoteCount = post.ups;
  const [voteScore, setVoteScore] = useState(initialVoteCount);
  const [voteStatus, setVoteStatus] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleRestrictedAction = () => {
    alert("You must be logged in to vote or comment.");
  };

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
          isAuthenticated={isAuthenticated}
          onRestrictedAction={handleRestrictedAction}
        />

        <PostDetails post={post} />
      </div>

      <CommentSection 
        comments={comments} 
        setComments={setComments} 
        showComments={showComments} 
        setShowComments={setShowComments}
        numComments={post.num_comments}
        isAuthenticated={isAuthenticated}
        onRestrictedAction={handleRestrictedAction}
      />
    </div>
  );
};

export default Post;
