import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

const App = () => {
  const [posts, setPosts] = useState([]);

  // * useEffect => Runs a piece of code based on a specific codition

  useEffect(() => {
    // * Run the code here
    db.collection('posts').onSnapshot((snapshot) => {
      // * every time a new post is added ,this code fires...
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="app">
      <div className="app_header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
          className="app__headerImage"
        />
      </div>
      {posts.map((post) => (
        <Post
          key={post.username}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default App;
