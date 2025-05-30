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
Em relação a instalação dos plugins e dependencias, você precisa ir em terminal e usar o comando npm install, para que todas as configurações do projeto sejam instaladas corretamente.  
  
Scripts (start, seed, build)  
  
Para começar o projeto no momento é só usar no terminal shell: npm start.

Uso (fluxos CRUD, atalhos)  

Create (Criar): Funções ou telas para adicionar novos itens (ex: addProduct, formulário de cadastro).
Read (Ler): Funções ou telas que listam ou exibem detalhes dos itens (ex: getAllProducts, listagem de produtos).
Update (Atualizar): Funções ou telas para editar itens existentes (ex: updateProduct, formulário de edição).
Delete (Excluir): Funções ou botões para remover itens (ex: deleteProduct).  
  
Estrutura de Pastas  

Está é a representação visual da estrutura de pastas e componentes mais importantes do projeto durante a sua criação e modificação.  
  
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
  
Em relação a arquitetura do projeto, este projeto utiliza:  
Componentização: O código é altamente componentizado, o que é comum no React. Cada parte da interface do usuário é representada por um componente separado, como o ProductForm, Dialog, TextField, Button, etc.  
Ações e Reducer: O código define um conjunto de ações (ACTIONS) e um reducer (productReducer) para manipular as mudanças de estado com base nessas ações. O reducer atualiza o estado de acordo com a ação recebida, mantendo a imutabilidade dos dados.  
Feedback de Carregamento e Erro: O componente ProductList.jsx fornece feedback visual de carregamento e erro, exibindo indicadores de progresso e mensagens de erro quando apropriado.  
Contexto de Produtos: O contexto ProductContext foi criado para fornecer um estado compartilhado entre componentes relacionados aos produtos. Ele encapsula o estado e as funções relacionadas aos produtos, permitindo que os componentes acessem e modifiquem esses dados.  
Inicialização de Dados e Persistência de Dados LocalStorage: São fornecidas funções para inicializar os dados de produtos, salvar no LocalStorage, e carregar do LocalStorage. Isso garante que os dados dos produtos persistam mesmo após recarregar a página.
    
Validações & Acessibilidade  
  
Adição de atributos aria-* para melhorar a acessibilidade de componentes interativos, a garantia de um contraste adequado para usuários com deficiência visual, ou o uso de etiquetas semânticas para melhorar a navegação.  
Verificação de Campos Obrigatórios: Antes de adicionar um produto, o código verifica se campos obrigatórios, como nome, preço, estoque e categoria, estão preenchidos corretamente. Caso contrário, exibe alertas informando que esses campos são obrigatórios.  
Validação de Preço e Estoque: Há validações para garantir que o preço seja maior que zero e que o estoque seja um número positivo. Caso contrário, são exibidos alertas informando sobre a validação desses campos.  
Validação de Categoria: Uma validação foi adicionada para garantir que a categoria do produto seja selecionada antes de ser adicionado. Caso contrário, é exibido um alerta informando que a categoria é obrigatória.  Limitação do Tamanho da Imagem: Existe uma verificação para garantir que a imagem selecionada para o produto tenha no máximo 5MB. Caso a imagem exceda esse tamanho, é exibido um alerta indicando esse limite.  
Manipulação de Erros:  
Exibição de Alertas: Em caso de falha nas validações, erros durante a adição do produto ou problemas no processo, são exibidos alertas ao usuário informando sobre o ocorrido. Tratamento de Exceções: O código trata exceções durante a adição de produtos, garantindo que o usuário seja informado sobre possíveis erros e problemas que ocorreram durante o processo.

Reset de Dados  
 
Os dados podem ser excluidos e possui modal para confirmação de exclusão de cada um dos dados(produtos).  
  
Padrões de Código & Commits  

Commits foram realizados nos dias 29/05/2025 e 30/05/2025 para atualizar o projeto e também para atualizar o README, para melhor entendimento do projeto.
  
Funcionalidades Futuras / Bônus  

Licença  
  
Unlicense, pois é uma das licenças mais simples e sem muita burocracia.
