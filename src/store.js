import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';
import authReducer from './features/auth/authSlice';


const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  }
});

export default store;
