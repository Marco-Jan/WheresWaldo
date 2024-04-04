import { createTheme } from '@mui/material/styles';

const theme = createTheme({

    palette: {
        primary: {
            main: '#ff0000',
        },
        secondary: {
            main: '#0000ff',
        },
    },
    typography: {
        fontFamily: 'Arial',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
    },
    
});

export { theme };