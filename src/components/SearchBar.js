import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === '') {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${searchTerm}`);
        const subreddits = response.data.data.children.map(child => child.data.display_name);
        setSuggestions(subreddits);
      } catch (error) {
        console.error('Error fetching subreddits:', error);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (subreddit) => {
    setSearchTerm(subreddit);
    setSuggestions([]);
    dispatch(fetchPosts(subreddit)); // Fetch posts from the selected subreddit
  };

  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      <input 
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for subreddits..."
        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      {suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '5px',
          zIndex: 10,
          listStyle: 'none',
          padding: '5px',
          margin: 0
        }}>
          {suggestions.map(subreddit => (
            <li 
              key={subreddit}
              onClick={() => handleSuggestionClick(subreddit)}
              style={{
                padding: '5px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              {subreddit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;