import React, { useState } from 'react';
import './App.css';
import Post from './Post';

const App = () => {
  const [posts, setPosts] = useState([
    {
      username: 'Andriy Engineer',
      caption: "Now that's awesome",
      imageUrl:
        'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/95925379_3079025065509593_657428513694941184_o.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=2gwkU1HSLcEAX8ZYyJJ&_nc_ht=scontent-waw1-1.xx&oh=071def8d6d1b5d5b3b6df94ebd4d1ce8&oe=5F4EDCD3',
    },
    {
      username: 'Anastasia Stylist',
      caption: 'Styling your life',
      imageUrl:
        'https://img5.model-kartei.de/354bd57c93eee8f3f59b7f954640451d/5f28fa91/n/v/b/597782/76bdfc143308efbaf4c62da6ea2b860a159058731957691624.jpg',
    },
    {
      username: 'Alexandra Taro',
      caption: "I'll tell you your future",
      imageUrl:
        'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/64985479_2239865799429823_4742781915088551936_o.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=QnF5IArMaW4AX-nvGAj&_nc_ht=scontent-waw1-1.xx&oh=92c48b26302f26a337ae28a40e621e5a&oe=5F5023CA',
    },
  ]);

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
