import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const VotingSection = ({ voteScore, setVoteScore, voteStatus, setVoteStatus, initialVoteCount }) => {

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ArrowUp onClick={handleUpvote} style={{ cursor: 'pointer', color: voteStatus === 'upvoted' ? 'green' : 'black' }} />
      <span>{voteScore}</span>
      <ArrowDown onClick={handleDownvote} style={{ cursor: 'pointer', color: voteStatus === 'downvoted' ? 'red' : 'black' }} />
    </div>
  );
};

export default VotingSection;
