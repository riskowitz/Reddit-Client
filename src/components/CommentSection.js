import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const CommentSection = ({ 
  comments, 
  setComments, 
  showComments, 
  setShowComments, 
  numComments, 
  isAuthenticated,
  onRestrictedAction 
}) => {

  const [newComment, setNewComment] = useState("");

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (!isAuthenticated) return onRestrictedAction();

    if (newComment.trim() !== "") {
      const commentObject = { text: newComment, id: Date.now() };
      setComments([...comments, commentObject]);
      setNewComment("");
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '10px' }}>
      <div onClick={handleToggleComments} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <MessageSquare />
        <span>{comments.length + numComments} Comments</span>
      </div>

      {showComments && (
        <div style={{ marginTop: '10px' }}>
          {comments.map(comment => (
            <div key={comment.id} style={{ padding: '5px', background: '#f0f0f0', marginBottom: '5px', borderRadius: '5px' }}>
              {comment.text}
            </div>
          ))}
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
      )}
    </div>
  );
};

export default CommentSection;
