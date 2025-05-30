// Lista de extensões de imagem suportadas
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

// Cache para armazenar imagens encontradas
let imageCache = null;
let isLoading = false;

/**
 * Tenta importar uma imagem com diferentes extensões
 * @param {string} basePath - Caminho base da imagem (ex: '../assets/imagem1')
 * @param {Array} extensions - Lista de extensões para tentar
 * @returns {Promise<string|null>} - URL da imagem ou null se não encontrada
 */
const tryImportImage = async (basePath, extensions = IMAGE_EXTENSIONS) => {
    for (const ext of extensions) {
        try {
            const imagePath = `${basePath}.${ext}`;
            const imageModule = await import(imagePath);
            return imageModule.default || imageModule;
        } catch (error) {
            // Continua tentando outras extensões
            continue;
        }
    }
    return null;
};

/**
 * Carrega todas as imagens disponíveis na pasta assets
 * @returns {Promise<Array>} - Array com URLs das imagens encontradas
 */
export const loadLocalImages = async () => {
    if (imageCache) {
        return imageCache;
    }

    if (isLoading) {
        // Se já está carregando, aguarda um pouco e tenta novamente
        await new Promise(resolve => setTimeout(resolve, 100));
        return loadLocalImages();
    }

    isLoading = true;
    const images = [];

    try {
        // Tenta carregar imagens de 1 a 10 (você pode ajustar o range)
        const loadPromises = [];
        for (let i = 1; i <= 10; i++) {
            loadPromises.push(tryImportImage(`../assets/imagem${i}`));
        }

        const results = await Promise.all(loadPromises);

        // Filtra apenas as imagens que foram encontradas
        results.forEach((imageUrl, index) => {
            if (imageUrl) {
                images.push({
                    id: index + 1,
                    url: imageUrl,
                    name: `imagem${index + 1}`
                });
            }
        });

        // Se não encontrou nenhuma imagem, gera placeholders
        if (images.length === 0) {
            console.warn('Nenhuma imagem encontrada em src/assets/. Usando placeholders.');
            return getPlaceholderImages();
        }

        imageCache = images;
        console.log(`${images.length} imagens carregadas:`, images.map(img => img.name));

    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        return getPlaceholderImages();
    } finally {
        isLoading = false;
    }

    return images;
};

/**
 * Gera imagens placeholder coloridas
 * @returns {Array} - Array com imagens placeholder
 */
const getPlaceholderImages = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#F7DC6F', '#BB8FCE'];

    return colors.map((color, index) => ({
        id: index + 1,
        url: `data:image/svg+xml;base64,${btoa(`
            <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${color}dd;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="150" height="150" fill="url(#grad${index})"/>
                <circle cx="75" cy="60" r="20" fill="rgba(255,255,255,0.3)"/>
                <text x="75" y="95" text-anchor="middle" dy=".3em" font-size="12" fill="white" font-weight="bold">
                    Produto ${index + 1}
                </text>
            </svg>
        `)}`,
        name: `placeholder${index + 1}`
    }));
};

/**
 * Obtém uma imagem aleatória do cache
 * @returns {string} - URL da imagem
 */
export const getRandomLocalImage = () => {
    if (!imageCache || imageCache.length === 0) {
        // Se não há cache, retorna um placeholder
        const placeholders = getPlaceholderImages();
        return placeholders[Math.floor(Math.random() * placeholders.length)].url;
    }

    const randomImage = imageCache[Math.floor(Math.random() * imageCache.length)];
    return randomImage.url;
};

/**
 * Retorna todas as imagens disponíveis
 * @returns {Array} - Array com todas as imagens
 */
export const getAllLocalImages = () => {
    return imageCache || getPlaceholderImages();
};

/**
 * Limpa o cache de imagens (útil para recarregar)
 */
export const clearImageCache = () => {
    imageCache = null;
};