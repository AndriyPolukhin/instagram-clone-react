import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './post.css';
import { db } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Post = ({ user, postId, imageUrl, username, caption }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => unsubscribe();
  }, [postId]);

  // * Add the commenting options
  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="Andriy Polukhin" src={imageUrl} />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt={caption} />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p key={comment.text}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
