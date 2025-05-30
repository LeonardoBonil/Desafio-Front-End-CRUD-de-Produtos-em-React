# Desafio-Front-End-CRUD-de-Produtos-em-React
Um desafio front end.

29/05/2025 - Estrutura Inicial (esboço) do Projeto com os conceitos básicos sendo criados e com um método para testar a funcionalidade do Projeto  
30/05/2025 a adição de vários dos elementos opicionais e não opicionais requisitados no arquivo de desafio.  

Título & Descrição  

Titulo: Desafio-Front-End-CRUD-de-Produtos-em-React  
Descrição: Um desafio Front-End que tem como objetivo construir uma aplicação em React sem consumo de API externa. Os dados residem apenas no front-end (memória e/ou localStorage). A aplicação deve permitir Criar, Listar (paginado), Atualizar e Remover produtos.  
  
Stack e Pré-requisitos  

React: Uma biblioteca JavaScript para construir interfaces de usuário, que você está usando para criar componentes como ProductForm, ProductCard.
Material-UI: Uma biblioteca de componentes React que fornece uma implementação de design de interface do usuário o projeto está utilizando componentes do MUI para estilização e layout.  
Context API: Usada para gerenciamento de estado global (no seu caso, ProductContext).  
JavaScript/ES6: A linguagem de programação que você está usando para escrever o código.  
Styled Components: Para estilização.  
  
Os Pré-Requisitos recomendados é ter uma IDE configurada para edição do projeto, foi utilizada a WebStorm;  
Processador: processador 1 GHz ou mais rápido com 2 ou mais núcleos, compatível com arquitetura de 64 bits; 
RAM: 4 GB de RAM;  
Internet: É necessária uma conexão com a internet durante a configuração inicial do aplicativo;  
Armazenamento: 1GB é suficiente.  
  
Instalação (passo a passo)  

A instalação da IDE Webstormn é simples e os passos estão na pagina JetBrains.  
Em relação a instalação dos plugins, você precisa ir em terminal e usar o comando npm install, para que todas as dependencias do projeto sejam instaladas.  
  
Scripts (start, seed, build)  


Uso (fluxos CRUD, atalhos)  

Estrutura de Pastas  

Está é a representação visual da estrutura de pastas e componentes mais importantes do projeto.  
  
produtos-app
├── src
│   ├── assets
│   │   └── imagem1.png
│   ├── components
│   │   ├── ImageSelector
│   │   │   └── ImageSelector.jsx
│   │   ├── ProductForm
│   │   │   └── ProductForm.jsx
│   │   ├── products
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductCard.styled.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductList.styled.jsx
│   ├── contexts
│   │   └── ProductContext.jsx
│   ├── mocks
│   │   └── products.js
│   ├── pages
│   │   └── products
│   │       └── Products.jsx
│   ├── services
│   │   └── productService.js
│   ├── utils
│   │   └── imageUtils.js
├── public
├── App.js
├── index.js
└── reportWebVitals.js
  
Arquitetura & Gerenciamento de Estado  

Validações & Acessibilidade  

Reset de Dados  

Padrões de Código & Commits  

Funcionalidades Futuras / Bônus  

Licença  
Unlicense
