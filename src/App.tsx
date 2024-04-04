import GameContainer from './Components/GameContainer';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';


function App() {



  return (
    <ThemeProvider theme={theme}>
      <GameContainer />
    </ThemeProvider>
  );
}

export default App;
