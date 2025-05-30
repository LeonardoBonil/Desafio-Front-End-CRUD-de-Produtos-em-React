import { mockProducts } from '../mocks/products';
import imagem1 from '../assets/imagem1.png';
import imagem2 from '../assets/imagem2.png';
import imagem3 from '../assets/imagem3.png';
import imagem4 from '../assets/imagem4.png';

const STORAGE_KEY = 'products';
const defaultImages = [imagem1, imagem2, imagem3, imagem4];

// Inicializa o localStorage com os produtos mock se ainda não existirem
const initializeProducts = () => {
    const existingProducts = localStorage.getItem(STORAGE_KEY);
    if (!existingProducts) {
        // Modifica os produtos mock para usar imagens fixas
        const productsWithFixedImages = mockProducts.map((product, index) => ({
            ...product,
            imageUrl: defaultImages[index % defaultImages.length]
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(productsWithFixedImages));
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