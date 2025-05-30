
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { mockProducts } from '../mocks/products';

const ProductContext = createContext();

// ACTIONS DIRETO NO ARQUIVO (sem import externo)
const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_TOTAL: 'SET_TOTAL',
    ADD_PRODUCT: 'ADD_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT'
};

// ESTADO INICIAL SIMPLES
const initialState = {
    products: [],
    loading: false,
    error: null,
    total: 0
};

// REDUCER SIMPLES (sem imports externos)
const productReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };

        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, loading: false };

        case ACTIONS.SET_PRODUCTS:
            return { ...state, products: action.payload, loading: false, error: null };

        case ACTIONS.SET_TOTAL:
            return { ...state, total: action.payload };

        case ACTIONS.ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products],
                total: state.total + 1,
                loading: false
            };

        case ACTIONS.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === action.payload.id ? action.payload : p
                ),
                loading: false
            };

        case ACTIONS.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.payload),
                total: Math.max(0, state.total - 1),
                loading: false
            };

        default:
            return state;
    }
};

// Chave para localStorage
const STORAGE_KEY = 'products_data';

// Funções para localStorage (suas originais)
const saveToStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
};

const loadFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return null;
    }
};

// Inicializa dados (sua lógica original)
const initializeData = () => {
    const stored = loadFromStorage();
    if (stored && stored.length > 0) {
        console.log(` ${stored.length} produtos carregados do localStorage`);
        return stored;
    } else {
        console.log(` ${mockProducts.length} produtos carregados do mock (primeira vez)`);
        saveToStorage(mockProducts);
        return [...mockProducts];
    }
};

export const ProductProvider = ({ children }) => {
    //  useReducer substituindo useState múltiplos
    const [state, dispatch] = useReducer(productReducer, initialState);

    //  HELPER - Dados sempre disponíveis (sua função original)
    const getProductsData = useCallback(() => {
        return loadFromStorage() || [...mockProducts];
    }, []);

    //  CARREGAMENTO INICIAL (corrigido)
    useEffect(() => {
        const initializeProducts = async () => {
            console.log(' Inicializando ProductContext com useReducer...');
            const data = initializeData();
            dispatch({ type: ACTIONS.SET_TOTAL, payload: data.length });

            // Carrega primeira página
            getAllProducts(1, 12);
        };

        initializeProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Ignora warning do getAllProducts

    //  SUAS FUNÇÕES ORIGINAIS (adaptadas para useReducer)
    const getAllProducts = useCallback(async (page = 1, limit = 12) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.SET_ERROR, payload: null });

            console.log(` Carregando página ${page} com ${limit} itens...`);

            const productsData = getProductsData();
            await new Promise(resolve => setTimeout(resolve, 300));

            const pageIndex = page - 1;
            const start = pageIndex * limit;
            const end = start + limit;
            const paginatedProducts = productsData.slice(start, end);

            dispatch({ type: ACTIONS.SET_PRODUCTS, payload: paginatedProducts });
            dispatch({ type: ACTIONS.SET_TOTAL, payload: productsData.length });

            console.log(` Página ${page}: ${paginatedProducts.length} produtos carregados de ${productsData.length} total`);
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Erro ao carregar produtos' });
            console.error(' Erro:', err);
        }
    }, [getProductsData]);

    const addProduct = useCallback(async (productData) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.SET_ERROR, payload: null });

            const productsData = getProductsData();

            const newProduct = {
                ...productData,
                id: Math.max(...productsData.map(p => p.id), 0) + 1,
                imageUrl: productData.imageUrl || '/placeholder-image.png',
                createdAt: new Date().toISOString()
            };

            productsData.push(newProduct);
            saveToStorage(productsData);

            dispatch({ type: ACTIONS.ADD_PRODUCT, payload: newProduct });

            console.log(' Produto adicionado e salvo no localStorage');
            return { success: true, data: newProduct };
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Erro ao adicionar produto' });
            return { success: false, error: err.message };
        }
    }, [getProductsData]);

    const updateProduct = useCallback(async (productData) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.SET_ERROR, payload: null });

            const productsData = getProductsData();
            const index = productsData.findIndex(p => p.id === productData.id);

            if (index !== -1) {
                const updatedProduct = {
                    ...productsData[index],
                    ...productData,
                    updatedAt: new Date().toISOString()
                };

                productsData[index] = updatedProduct;
                saveToStorage(productsData);

                dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: updatedProduct });

                console.log(' Produto atualizado e salvo no localStorage');
                return { success: true, data: updatedProduct };
            }
            throw new Error('Produto não encontrado');
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Erro ao atualizar produto' });
            return { success: false, error: err.message };
        }
    }, [getProductsData]);

    const deleteProduct = useCallback(async (id) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.SET_ERROR, payload: null });

            const productsData = getProductsData();
            const index = productsData.findIndex(p => p.id === id);

            if (index !== -1) {
                productsData.splice(index, 1);
                saveToStorage(productsData);

                dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: id });

                console.log(' Produto excluído e salvo no localStorage');
                return { success: true };
            }
            throw new Error('Produto não encontrado');
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Erro ao deletar produto' });
            return { success: false, error: err.message };
        }
    }, [getProductsData]);

    return (
        <ProductContext.Provider
            value={{
                // Estado do reducer
                products: state.products,
                loading: state.loading,
                error: state.error,
                total: state.total,

                // Suas funções originais
                getAllProducts,
                addProduct,
                updateProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts deve ser usado dentro de um ProductProvider');
    }
    return context;
};