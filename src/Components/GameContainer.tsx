import React, { useState } from 'react';
import BackgroundImage from './BackgroundImage';
import SignInForm from './SignInForm';
import { Box } from '@mui/material';
import ObjectContainer from './ObjectContainer';

const GameContainer: React.FC = () => {

    const [gameStarted, setGameStarted] = useState(false);


    const handleGameStart = (name: string) => {
        if (name !== '') {
            console.log('starte spiel');
            setGameStarted(true);
        }

    };
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '150vw',
            height: '150vh',
            overflow: 'auto',
            cursor: 'crosshair',
        }}>
            {!gameStarted && <SignInForm onGameStart={handleGameStart} />}
            {/* {gameStarted && <ObjectArea />} */}
            <BackgroundImage show={gameStarted} />
            <ObjectContainer />

        </Box>
    );
};

export default GameContainer;



