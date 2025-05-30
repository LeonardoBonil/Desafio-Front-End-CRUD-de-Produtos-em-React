
import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    CircularProgress,
    Avatar,
    Typography,
    Paper,
    IconButton,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { PhotoCamera, Delete, Image as ImageIcon } from '@mui/icons-material';
import { useProducts } from '../../contexts/ProductContext';

// Importa as imagens locais diretamente
import imagem1 from '../../assets/imagem1.png';
import imagem2 from '../../assets/imagem2.png';
import imagem3 from '../../assets/imagem3.png';
import imagem4 from '../../assets/imagem4.png';

// Array com as imagens locais
const localImages = [
    { id: 1, url: imagem1, name: 'Imagem 1' },
    { id: 2, url: imagem2, name: 'Imagem 2' },
    { id: 3, url: imagem3, name: 'Imagem 3' },
    { id: 4, url: imagem4, name: 'Imagem 4' }
];

//  CATEGORIAS PREDEFINIDAS - AQUI ESTÁ A CORREÇÃO!
const categories = [
    'Eletrônicos',
    'Informática',
    'Áudio',
    'Casa e Jardim',
    'Roupas',
    'Livros',
    'Esportes',
    'Saúde e Beleza',
    'Automóveis',
    'Brinquedos',
    'Outros'
];

// Função para obter imagem aleatória
const getRandomLocalImage = () => {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    return localImages[randomIndex].url;
};

const ProductForm = ({ open, onClose, product }) => {
    const { addProduct, updateProduct, loading } = useProducts();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageUrl: ''
    });

    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                stock: product.stock || '',
                category: product.category || '',
                imageUrl: product.imageUrl || ''
            });
            setImagePreview(product.imageUrl || '');
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '', // Inicia vazio para forçar seleção
                imageUrl: ''
            });
            setImagePreview('');
        }
        setImageFile(null);
    }, [product, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione apenas arquivos de imagem.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('A imagem deve ter no máximo 5MB.');
                return;
            }

            setImageFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    imageUrl: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectLocalImage = (imageUrl) => {
        setImageFile(null);
        setImagePreview(imageUrl);
        setFormData(prev => ({
            ...prev,
            imageUrl: imageUrl
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRandomImage = () => {
        const randomImage = getRandomLocalImage();
        handleSelectLocalImage(randomImage);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview('');
        setFormData(prev => ({
            ...prev,
            imageUrl: ''
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert('Nome é obrigatório');
            return;
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            alert('Preço deve ser maior que zero');
            return;
        }

        if (!formData.stock || parseInt(formData.stock) < 0) {
            alert('Estoque deve ser um número positivo');
            return;
        }

        //  Validação da categoria
        if (!formData.category.trim()) {
            alert('Categoria é obrigatória');
            return;
        }

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            imageUrl: formData.imageUrl || getRandomLocalImage()
        };

        try {
            let result;
            if (product) {
                result = await updateProduct({ ...productData, id: product.id });
            } else {
                result = await addProduct(productData);
            }

            if (result.success) {
                onClose(true);
            } else {
                alert('Erro ao salvar produto: ' + (result.error || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            alert('Erro ao salvar produto');
        }
    };

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { minHeight: '700px' }
            }}
        >
            <DialogTitle>
                {product ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        {/* Upload de Imagem */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Imagem do Produto
                            </Typography>

                            {/* Preview da imagem atual */}
                            <Paper
                                sx={{
                                    p: 2,
                                    border: '2px dashed #ddd',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    mb: 2
                                }}
                            >
                                {imagePreview ? (
                                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <IconButton
                                            onClick={handleRemoveImage}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                backgroundColor: 'error.main',
                                                color: 'white',
                                                '&:hover': { backgroundColor: 'error.dark' }
                                            }}
                                            size="small"
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box sx={{ py: 2 }}>
                                        <Avatar sx={{ width: 60, height: 60, margin: '0 auto', mb: 1 }}>
                                            <ImageIcon />
                                        </Avatar>
                                        <Typography variant="body2" color="textSecondary">
                                            Nenhuma imagem selecionada
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>

                            {/* Botões de ação */}
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<PhotoCamera />}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Upload
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleRandomImage}
                                >
                                    Aleatória
                                </Button>
                            </Box>

                            {/* Galeria de imagens locais */}
                            <Box>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Ou escolha uma imagem:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {localImages.map((image) => (
                                        <Box
                                            key={image.id}
                                            sx={{
                                                cursor: 'pointer',
                                                border: imagePreview === image.url ? '2px solid #1976d2' : '2px solid transparent',
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                transition: 'all 0.2s'
                                            }}
                                            onClick={() => handleSelectLocalImage(image.url)}
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    display: 'block'
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </Grid>

                        {/* Campos do formulário */}
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Nome"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Descrição"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                name="price"
                                label="Preço"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                disabled={loading}
                                inputProps={{ min: 0, step: 0.01 }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                name="stock"
                                label="Estoque"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                disabled={loading}
                                inputProps={{ min: 0, step: 1 }}
                            />
                        </Grid>

                        {/* DROPDOWN EM VEZ DE TEXTFIELD! */}
                        <Grid item xs={12}>
                            <FormControl fullWidth required disabled={loading}>
                                <InputLabel id="category-label">Categoria</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    label="Categoria"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Salvando...' : (product ? 'Atualizar' : 'Criar')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductForm;