import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Products from './pages/products/Products';
import { ProductProvider } from './contexts/ProductContext';

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ProductProvider>
                <div className="App">
                    <Products />
                </div>
            </ProductProvider>
        </ThemeProvider>
    );
}

export default App;