// BackgroundImage.tsx
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { storage } from '../firebase/firebaseInit'; 
import { ref, getDownloadURL } from "firebase/storage";

const BackgroundImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');


  
  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(storage, 'comicwimmel.png'); 
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  return (
    <Box
      sx={{
        width: '80%',
        height: '100vh', 
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default BackgroundImage;
