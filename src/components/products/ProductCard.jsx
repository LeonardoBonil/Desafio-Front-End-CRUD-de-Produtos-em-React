import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';

// Importa os componentes estilizados
import {
    StyledCard,
    StyledCardMedia,
    StockBadge,
    StyledCardContent,
    ProductTitle,
    ProductDescription,
    ProductInfo,
    ProductPrice,
    CategoryBadge,
    StyledCardActions,
    ActionButtons,
    ResponsiveIconButton
} from './ProductCard.styled';

const ProductCard = ({
                         product,
                         onEdit,
                         onDelete,
                         onView,
                         loading = false
                     }) => {
    // Formatação de preço
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    //  Verifica se está em estoque
    const isInStock = product.stock > 0;

    //  Imagem com fallback
    const getImageUrl = () => {
        if (product.imageUrl) {
            return product.imageUrl;
        }
        // Fallback para imagem padrão
        return 'https://via.placeholder.com/300x200?text=Sem+Imagem';
    };

    //  Descrição truncada
    const getTruncatedDescription = () => {
        if (!product.description) return 'Sem descrição disponível';
        return product.description.length > 100
            ? product.description.substring(0, 100) + '...'
            : product.description;
    };

    //  Handlers dos botões
    const handleEdit = () => {
        if (onEdit && !loading) {
            onEdit(product);
        }
    };

    const handleDelete = () => {
        if (onDelete && !loading) {
            if (window.confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
                onDelete(product.id);
            }
        }
    };

    const handleView = () => {
        if (onView && !loading) {
            onView(product);
        }
    };

    return (
        <StyledCard elevation={2}>
            {/* IMAGEM COM BADGE DE ESTOQUE */}
            <StyledCardMedia
                image={getImageUrl()}
                title={product.name}
            >
                <StockBadge inStock={isInStock}>
                    {isInStock ? `${product.stock} em estoque` : 'Sem estoque'}
                </StockBadge>
            </StyledCardMedia>

            {/* CONTEÚDO */}
            <StyledCardContent>
                <ProductTitle variant="h6" component="h3">
                    {product.name}
                </ProductTitle>

                <ProductDescription variant="body2">
                    {getTruncatedDescription()}
                </ProductDescription>

                <ProductInfo>
                    <ProductPrice variant="h6" component="span">
                        {formatPrice(product.price)}
                    </ProductPrice>

                    <CategoryBadge>
                        {product.category || 'Sem categoria'}
                    </CategoryBadge>
                </ProductInfo>
            </StyledCardContent>

            {/*  AÇÕES */}
            <StyledCardActions>
                <Typography variant="caption" color="textSecondary">
                    ID: #{product.id}
                </Typography>

                <ActionButtons>
                    {/* VISUALIZAR */}
                    {onView && (
                        <Tooltip title="Visualizar detalhes" arrow>
                            <ResponsiveIconButton
                                onClick={handleView}
                                disabled={loading}
                                color="info"
                                size="small"
                            >
                                <ViewIcon />
                            </ResponsiveIconButton>
                        </Tooltip>
                    )}

                    {/* EDITAR */}
                    {onEdit && (
                        <Tooltip title="Editar produto" arrow>
                            <ResponsiveIconButton
                                onClick={handleEdit}
                                disabled={loading}
                                color="primary"
                                size="small"
                            >
                                <EditIcon />
                            </ResponsiveIconButton>
                        </Tooltip>
                    )}

                    {/*  EXCLUIR */}
                    {onDelete && (
                        <Tooltip title="Excluir produto" arrow>
                            <ResponsiveIconButton
                                onClick={handleDelete}
                                disabled={loading}
                                color="error"
                                size="small"
                            >
                                <DeleteIcon />
                            </ResponsiveIconButton>
                        </Tooltip>
                    )}
                </ActionButtons>
            </StyledCardActions>
        </StyledCard>
    );
};

//  PROPS PADRÃO
ProductCard.defaultProps = {
    loading: false,
    product: {
        id: 0,
        name: 'Produto sem nome',
        description: '',
        price: 0,
        stock: 0,
        category: 'Outros',
        imageUrl: ''
    }
};

export default ProductCard;