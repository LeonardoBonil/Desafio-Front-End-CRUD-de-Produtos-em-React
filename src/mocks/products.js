const generateRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200/200?random=${imageNumber}`;
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
    description: `Descrição detalhada do produto ${index + 1}`,
    price: Number((Math.random() * 1000).toFixed(2)),
    stock: Math.floor(Math.random() * 100),
    category: categories[Math.floor(Math.random() * categories.length)],
    imageUrl: generateRandomImage()
}));