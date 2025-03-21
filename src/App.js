import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import LoginModal from './components/LoginModal';

function App() {
  const { posts, loading, error } = useSelector(state => state.posts);
  const { isAuthenticated, user } = useSelector(state => state.auth || {}); // Prevents destructuring error

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Reddit Client</h1>
        
        {/* Login Button / Avatar */}
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={user.avatar} 
              alt="User Avatar" 
              style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
            />
            <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <button 
            onClick={() => setShowModal(true)} 
            style={{ padding: '5px 10px', cursor: 'pointer' }}
          >
            Login
          </button>
        )}
      </div>
      
      <SearchBar />

      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}
      {posts && <PostList posts={posts} />}

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
