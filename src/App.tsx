// App.tsx
import { theme } from './theme/theme'; 
import {  ThemeProvider } from '@mui/material';
import BackgroundImage from './Components/BackgroundImage';
import SignInForm from './Components/SignInForm';

const handleGameStart = (name: string) => {
  console.log("Spiel gestartet für:", name);
  
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignInForm onGameStart={handleGameStart} />
      <BackgroundImage />
    </ThemeProvider>
  );
}

export default App;
