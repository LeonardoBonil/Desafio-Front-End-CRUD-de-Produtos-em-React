import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Products from './pages/products/Products';

const theme = createTheme();

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Products />
        </div>
      </ThemeProvider>
  );
}

export default App;