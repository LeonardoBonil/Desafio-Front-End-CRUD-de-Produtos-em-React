import React, { useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import imagem1 from '../../assets/imagem1.png';
import imagem2 from '../../assets/imagem2.png';
import imagem3 from '../../assets/imagem3.png';
import imagem4 from '../../assets/imagem4.png';

const predefinedImages = [
    { id: 1, url: imagem1, name: 'Imagem 1' },
    { id: 2, url: imagem2, name: 'Imagem 2' },
    { id: 3, url: imagem3, name: 'Imagem 3' },
    { id: 4, url: imagem4, name: 'Imagem 4' }
];

const ImageSelector = ({ value, onChange, error }) => {
    const [inputMethod, setInputMethod] = useState('predefined');
    const [customUrl, setCustomUrl] = useState('');

    const handleImageSelect = useCallback((imageUrl) => {
        onChange(imageUrl);
    }, [onChange]);

    const handleInputMethodChange = useCallback((event) => {
        const method = event.target.value;
        setInputMethod(method);

        if (method === 'predefined' && value && !predefinedImages.some(img => img.url === value)) {
            onChange(predefinedImages[0].url);
        } else if (method === 'url' && predefinedImages.some(img => img.url === value)) {
            onChange('');
            setCustomUrl('');
        }
    }, [value, onChange]);

    const handleCustomUrlChange = useCallback((event) => {
        const url = event.target.value;
        setCustomUrl(url);
        onChange(url);
    }, [onChange]);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Imagem do Produto
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Método de seleção</FormLabel>
                <RadioGroup
                    row
                    value={inputMethod}
                    onChange={handleInputMethodChange}
                >
                    <FormControlLabel
                        value="predefined"
                        control={<Radio />}
                        label="Imagens predefinidas"
                    />
                    <FormControlLabel
                        value="url"
                        control={<Radio />}
                        label="URL personalizada"
                    />
                </RadioGroup>
            </FormControl>

            {inputMethod === 'predefined' ? (
                <Grid container spacing={2}>
                    {predefinedImages.map((image) => (
                        <Grid item xs={6} sm={3} key={image.id}>
                            <Card
                                sx={{
                                    cursor: 'pointer',
                                    border: value === image.url ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    '&:hover': {
                                        boxShadow: 3
                                    }
                                }}
                                onClick={() => handleImageSelect(image.url)}
                            >
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={image.url}
                                    alt={image.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box p={1}>
                                    <Typography variant="caption" align="center" display="block">
                                        {image.name}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <TextField
                    fullWidth
                    label="URL da imagem"
                    value={customUrl}
                    onChange={handleCustomUrlChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        startAdornment: <CloudUploadIcon sx={{ mr: 1, color: 'action.active' }} />
                    }}
                />
            )}

            {value && (
                <Box mt={2}>
                    <Typography variant="subtitle2" gutterBottom>
                        Preview:
                    </Typography>
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 1,
                            overflow: 'hidden',
                            border: '1px solid #e0e0e0'
                        }}
                    >
                        <img
                            src={value}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100?text=Erro';
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ImageSelector;