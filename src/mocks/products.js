import imagem1 from '../assets/imagem1.png';
import imagem2 from '../assets/imagem2.png';
import imagem3 from '../assets/imagem3.png';
import imagem4 from '../assets/imagem4.png';

const localImages = [imagem1, imagem2, imagem3, imagem4];

// Usa a imagem em sequência para evitar aleatoriedade
const getSequentialImage = (index) => {
    return localImages[index % localImages.length];
};

const categories = [
    'Eletrônicos',
    'Roupas',
    'Acessórios',
    'Livros',
    'Casa e Decoração',
    'Esportes'
];

export const mockProducts = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Produto ${index + 1}`,
    description: `Descrição detalhada do produto ${index + 1} com informações importantes sobre suas características e benefícios únicos.`,
    price: Number((Math.random() * 1000 + 50).toFixed(2)),
    stock: Math.floor(Math.random() * 100) + 1,
    category: categories[Math.floor(Math.random() * categories.length)],
    imageUrl: getSequentialImage(index)
}));