// SignInForm.tsx
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseInit'; // Importieren Sie Ihre Firestore-Instanz

interface Props {
  onGameStart: (name: string) => void;
  
}

const SignInForm = ({ onGameStart }: Props) => {
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
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}
    >
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ width: '200px', backgroundColor: 'white', mb:2 }}
      />
      <Button variant="outlined" onClick={handleStartGame} sx={{ width: '100%', mt:2 }}>
        Spiel starten
      </Button>

    </Box>
  );
};

export default SignInForm;
