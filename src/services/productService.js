
import { mockProducts } from '../mocks/products';

const STORAGE_KEY = 'products';

// Inicializa o localStorage com os produtos mock se ainda não existirem
const initializeProducts = () => {
    const existingProducts = localStorage.getItem(STORAGE_KEY);
    if (!existingProducts) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
    }
};

// Chama a inicialização
initializeProducts();

export const productService = {
    getProducts: async (page = 1, perPage = 10) => {
        // Simula delay de 500ms
        await new Promise(resolve => setTimeout(resolve, 500));

        const products = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const start = (page - 1) * perPage;
        const paginatedProducts = products.slice(start, start + perPage);

        return {
            products: paginatedProducts,
            total: products.length,
            totalPages: Math.ceil(products.length / perPage),
            currentPage: page
        };
    },

    addProduct: async (product) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const newProduct = {
            ...product,
            id: Math.max(...products.map(p => p.id)) + 1
        };
        products.push(newProduct);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return newProduct;
    },

    updateProduct: async (product) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products[index] = product;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        }
        return product;
    },

    deleteProduct: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const filteredProducts = products.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
    }
};