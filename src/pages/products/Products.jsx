import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import ProductList from '../../components/ProductList/ProductList';

const Products = () => {
    return (
        <Container maxWidth="lg">
            <Box py={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gerenciamento de Produtos
                </Typography>

                <Paper elevation={2}>
                    <Box p={3}>
                        <ProductList />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Products;