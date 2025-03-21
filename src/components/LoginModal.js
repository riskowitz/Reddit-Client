import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username && password) {
      dispatch(login({ username, avatar: `https://robohash.org/${username}.png` }));
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', 
      top: '0', 
      left: '0', 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        width: '300px',
        textAlign: 'center'
      }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 15px', cursor: 'pointer' }}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;
