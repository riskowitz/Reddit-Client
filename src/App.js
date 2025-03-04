import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice';
import PostList from './components/PostList';

function App() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts('reactjs')); // Change 'reactjs' to any subreddit you prefer
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Reddit Client</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}
      {posts && <PostList posts={posts} />}
    </div>
  );
}

export default App;
