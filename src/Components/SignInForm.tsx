// SignInForm.tsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { collection, addDoc } from "firebase/firestore"; 
import   {db}  from '../firebase/firebaseInit'; // Importieren Sie Ihre Firestore-Instanz

interface Props {
  onGameStart: (name: string) => void; 
}

const SignInForm: React.FC<Props> = ({ onGameStart }) => {
  const [name, setName] = useState('');

  const handleStartGame = async () => {
    const docRef = await addDoc(collection(db, "players"), {
      name,
      score: 0, 
    });
    
    onGameStart(name);
    console.log("Document written with ID: ", docRef.id);
    
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 }, 
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={handleStartGame}>
        Spiel starten
      </Button>
    </Box>
  );
};

export default SignInForm;
