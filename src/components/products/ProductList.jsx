import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    TablePagination,
    CircularProgress,
    Box,
    Avatar,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Fab
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ViewModule as GridViewIcon,
    ViewList as TableViewIcon,
    Add as AddIcon
} from '@mui/icons-material';

import { useProducts } from '../../contexts/ProductContext';
import ProductForm from '../ProductForm/ProductForm';
import ProductCard from './ProductCard';

// Importa os componentes estilizados
import {
    ResponsiveContainer,
    ResponsiveHeader,
    ResponsiveTitle,
    StatsContainer,
    StatItem,
    ResponsiveGrid,
    ResponsiveFab,
    LoadingContainer,
    EmptyStateContainer,
    SkeletonCard
} from './ProductList.styled';

// Componente de imagem simples para tabela
const ProductImage = React.memo(({ src, alt }) => {
    return (
        <Box
            sx={{
                width: '50px',
                height: '50px',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
            }}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const avatar = document.createElement('div');
                        avatar.innerHTML = 'IMG';
                        avatar.style.cssText = `
                            width: 50px; 
                            height: 50px; 
                            background-color: #e0e0e0; 
                            border-radius: 50%; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            color: #9e9e9e;
                            font-size: 12px;
                        `;
                        e.target.parentNode.appendChild(avatar);
                    }}
                />
            ) : (
                <Avatar
                    sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#e0e0e0',
                        color: '#9e9e9e'
                    }}
                >
                    <ImageIcon />
                </Avatar>
            )}
        </Box>
    );
});

// Componente Skeleton para loading dos cards
const ProductCardSkeleton = () => (
    <SkeletonCard>
        <div className="skeleton-image" />
        <div className="skeleton-content">
            <div className="skeleton-line" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
        </div>
    </SkeletonCard>
);

// Componente customizado para os botões de navegação da paginação
const TablePaginationActions = (props) => {
    const { count, page, rowsPerPage, onPageChange } = props;
    const totalPages = Math.ceil(count / rowsPerPage);

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, totalPages - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="primeira página"
                size="small"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="página anterior"
                size="small"
            >
                <ChevronLeftIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mx: 1, minWidth: 100, textAlign: 'center' }}>
                {totalPages > 0 ? `Página ${page + 1} de ${totalPages}` : 'Nenhuma página'}
            </Typography>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= totalPages - 1}
                aria-label="próxima página"
                size="small"
            >
                <ChevronRightIcon />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= totalPages - 1}
                aria-label="última página"
                size="small"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    );
};

const ProductList = () => {
    const { products, getAllProducts, deleteProduct, total, loading, error } = useProducts();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    // Formatação de preço
    const formatPrice = useCallback((price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }, []);

    //  Cálculos de estatísticas
    const stats = {
        total: total || 0,
        inStock: products.filter(p => p.stock > 0).length,
        lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
        outOfStock: products.filter(p => p.stock === 0).length
    };

    //  CARREGAMENTO OTIMIZADO - SEM DUPLICAÇÃO
    useEffect(() => {
        console.log(' ProductList montado - O contexto já carregou automaticamente!');
        // NÃO carrega aqui pois o contexto já carrega no useEffect dele
    }, []);

    // Effect para mudanças de página/itens (mantém a funcionalidade)
    useEffect(() => {
        if (getAllProducts) {
            console.log(` Mudança detectada - Página: ${page + 1}, Itens: ${rowsPerPage}`);
            getAllProducts(page + 1, rowsPerPage);
        }
    }, [page, rowsPerPage, getAllProducts]);

    //  HANDLERS
    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    }, []);

    const handleViewModeChange = useCallback((event, newViewMode) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);

            // Ajusta itens por página baseado na visualização
            const newRowsPerPage = newViewMode === 'grid' ? 12 : 10;
            setRowsPerPage(newRowsPerPage);
            setPage(0);
        }
    }, []);

    const handleOpenDialog = useCallback((product = null) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    }, []);

    const handleCloseDialog = useCallback(async (wasUpdated = false) => {
        setOpenDialog(false);
        setSelectedProduct(null);
        if (wasUpdated) {
            console.log(' Produto foi atualizado - Recarregando lista...');
            getAllProducts(page + 1, rowsPerPage);
        }
    }, [getAllProducts, page, rowsPerPage]);

    const handleEdit = useCallback((product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    }, []);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            const result = await deleteProduct(id);
            if (result.success) {
                console.log(' Produto excluído com sucesso');
                // Ajusta página se necessário
                if (page > 0 && products.length === 1) {
                    setPage(page - 1);
                } else {
                    getAllProducts(page + 1, rowsPerPage);
                }
            } else {
                alert('Erro ao excluir o produto');
            }
        }
    }, [deleteProduct, page, products.length, getAllProducts, rowsPerPage]);

    //  ESTADO DE ERRO
    if (error) {
        return (
            <ResponsiveContainer>
                <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                    <Typography color="error">Erro ao carregar produtos: {error}</Typography>
                </Box>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer>
            {/* HEADER COM ESTATÍSTICAS */}
            <ResponsiveHeader>
                <div>
                    <ResponsiveTitle>Gestão de Produtos</ResponsiveTitle>
                    <StatsContainer>
                        <StatItem>
                            <p className="stat-number">{stats.total}</p>
                            <p className="stat-label">Total</p>
                        </StatItem>
                        <StatItem>
                            <p className="stat-number">{stats.inStock}</p>
                            <p className="stat-label">Em Estoque</p>
                        </StatItem>
                        <StatItem>
                            <p className="stat-number">{stats.lowStock}</p>
                            <p className="stat-label">Estoque Baixo</p>
                        </StatItem>
                        <StatItem>
                            <p className="stat-number">{stats.outOfStock}</p>
                            <p className="stat-label">Sem Estoque</p>
                        </StatItem>
                    </StatsContainer>
                </div>

                {/* CONTROLES */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewModeChange}
                        aria-label="modo de visualização"
                    >
                        <ToggleButton value="grid" aria-label="visualização em grid">
                            <GridViewIcon />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="visualização em tabela">
                            <TableViewIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog()}
                        disabled={loading}
                        startIcon={<AddIcon />}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        Novo Produto
                    </Button>
                </Box>
            </ResponsiveHeader>

            {/*  FAB PARA MOBILE */}
            <ResponsiveFab
                color="primary"
                aria-label="adicionar produto"
                onClick={() => handleOpenDialog()}
                sx={{ display: { xs: 'flex', md: 'none' } }}
            >
                <AddIcon />
            </ResponsiveFab>

            {/*  LOADING */}
            {loading && products.length === 0 && (
                <LoadingContainer>
                    {viewMode === 'grid' ? (
                        <ResponsiveGrid>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </ResponsiveGrid>
                    ) : (
                        <CircularProgress size={40} />
                    )}
                </LoadingContainer>
            )}

            {/*  ESTADO VAZIO */}
            {!loading && products.length === 0 && (
                <EmptyStateContainer>
                    <ImageIcon className="empty-icon" />
                    <Typography className="empty-title">Nenhum produto encontrado</Typography>
                    <Typography className="empty-subtitle">
                        Comece adicionando seu primeiro produto
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => handleOpenDialog()}
                        startIcon={<AddIcon />}
                    >
                        Adicionar Produto
                    </Button>
                </EmptyStateContainer>
            )}

            {/*  VISUALIZAÇÃO EM GRID */}
            {!loading && products.length > 0 && viewMode === 'grid' && (
                <>
                    <ResponsiveGrid>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                loading={loading}
                            />
                        ))}
                    </ResponsiveGrid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <TablePagination
                            component="div"
                            count={total}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="Itens por página"
                            rowsPerPageOptions={[8, 12, 24, 48]}
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                            }
                        />
                    </Box>
                </>
            )}

            {/*  VISUALIZAÇÃO EM TABELA */}
            {!loading && products.length > 0 && viewMode === 'table' && (
                <TableContainer component={Paper} sx={{ minHeight: '400px' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width="80px">Imagem</TableCell>
                                <TableCell width="200px">Nome</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell width="120px">Preço</TableCell>
                                <TableCell width="100px">Estoque</TableCell>
                                <TableCell width="150px">Categoria</TableCell>
                                <TableCell width="120px">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <ProductImage src={product.imageUrl} alt={product.name} />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: '300px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {product.description}
                                    </TableCell>
                                    <TableCell>{formatPrice(product.price)}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEdit(product)}
                                            color="primary"
                                            disabled={loading}
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(product.id)}
                                            color="error"
                                            disabled={loading}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        labelRowsPerPage="Itens por página"
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                        }
                    />
                </TableContainer>
            )}

            <ProductForm
                open={openDialog}
                onClose={handleCloseDialog}
                product={selectedProduct}
            />
        </ResponsiveContainer>
    );
};

export default ProductList;