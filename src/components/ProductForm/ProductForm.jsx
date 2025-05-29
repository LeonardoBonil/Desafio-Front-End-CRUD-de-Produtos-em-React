import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CircularProgress,
    FormHelperText
} from '@mui/material';
import { productService } from '../../services/productService';

const categories = ['Eletrônicos', 'Roupas', 'Acessórios', 'Livros', 'Casa', 'Jardim'];

const initialFormState = {
    name: '',
    price: '',
    imageUrl: '',
    category: ''
};

const ProductForm = ({ open, onClose, product, onSave }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price.toString(),
                imageUrl: product.imageUrl,
                category: product.category
            });
        } else {
            setFormData(initialFormState);
        }
        setErrors({});
    }, [product, open]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            newErrors.price = 'Preço deve ser um número maior que zero';
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'URL da imagem é obrigatória';
        } else {
            try {
                new URL(formData.imageUrl);
            } catch {
                newErrors.imageUrl = 'URL da imagem inválida';
            }
        }

        if (!formData.category) {
            newErrors.category = 'Categoria é obrigatória';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                id: product?.id
            };

            if (product) {
                await productService.updateProduct(productData);
            } else {
                await productService.addProduct(productData);
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpa o erro do campo quando o usuário começa a digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
            setFormData(initialFormState);
            setErrors({});
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {product ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            name="name"
                            label="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            required
                            autoFocus
                            disabled={loading}
                        />

                        <TextField
                            name="price"
                            label="Preço"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            error={!!errors.price}
                            helperText={errors.price}
                            fullWidth
                            required
                            disabled={loading}
                            inputProps={{
                                step: "0.01",
                                min: "0",
                                inputMode: "decimal"
                            }}
                        />

                        <TextField
                            name="imageUrl"
                            label="URL da Imagem"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            error={!!errors.imageUrl}
                            helperText={errors.imageUrl}
                            fullWidth
                            required
                            disabled={loading}
                        />

                        <FormControl
                            fullWidth
                            required
                            error={!!errors.category}
                            disabled={loading}
                        >
                            <InputLabel id="category-label">Categoria</InputLabel>
                            <Select
                                labelId="category-label"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                label="Categoria"
                            >
                                {categories.map(category => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && (
                                <FormHelperText>{errors.category}</FormHelperText>
                            )}
                        </FormControl>

                        {formData.imageUrl && (
                            <Box textAlign="center">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview do produto"
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '200px',
                                        objectFit: 'contain'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        setErrors(prev => ({
                                            ...prev,
                                            imageUrl: 'Não foi possível carregar a imagem'
                                        }));
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            product ? 'Salvar' : 'Criar'
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductForm;