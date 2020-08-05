import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import { storage, db } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './imageUpload.css';

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // * Make a reference to the image
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    // * visual for the progress bar
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // * progress @fn
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // * Error @fn
        console.log(error);
        alert(error.message);
      },
      () => {
        // * complete @fn
        // * Get a download link
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // * post the image inside db
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption('');
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <Input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <Input type="file" onChange={handleChange} />
      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
