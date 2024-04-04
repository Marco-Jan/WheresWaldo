import React, { useState } from 'react';
import BackgroundImage from './BackgroundImage'; 
import SignInForm from './SignInForm'; 
import { Box } from '@mui/material';
import ObjectArea from './ObjectArea';

const GameContainer: React.FC = () => {

const [gameStarted, setGameStarted] = useState(false);


const handleGameStart = (name: string) => {
    if (name !== '') {
        console.log('starte spiel');
        setGameStarted(true);
    }

};
return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    {!gameStarted && <SignInForm onGameStart={handleGameStart} />}
    <BackgroundImage show={gameStarted} />
    {gameStarted && <ObjectArea />}
    </Box> 
);
};

export default GameContainer;



