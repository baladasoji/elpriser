import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PublicAppBar from '../components/PublicAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#CC9900',
      lighter:'#ff5131',
      darker:'#9b0000'
    },
    secondary: {
      main: '#424242',
      lighter:'#6d6d6d',
      darker:'#1b1b1b'
    },
  },
});

const PublicLayout = ({children}) => {
    return (
      <ThemeProvider theme={theme}>
      <Container sx={{p:0.0, m:0.0}} maxWidth="md">
        <Box sx={{ bgcolor: 'rgb(30,30,30)', p:0.3, m:0.2, border:'2px dashed gray'}}>
             <PublicAppBar/> 
             {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PublicLayout;

