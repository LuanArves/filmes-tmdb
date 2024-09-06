# Projeto: Lista de Filmes

Este projeto é uma aplicação de lista de filmes utilizando React no front-end e Node.js no back-end. Ele permite visualizar filmes, adicionar aos favoritos, e compartilhar listas de filmes favoritos.

## Observações :
Ao acessar a lista de favoritos e clicar no botão 'Ver Detalhes', você será redirecionado para a página de detalhes de outro filme. Para ser mais específico, será direcionado para o filme que tiver o mesmo ID no TMDB que o filme na lista de favoritos. Isso ocorre porque a tabela de lista possui um ID próprio para cada filme adicionado e, por algum motivo que ainda não descobri, esse é o ID que está sendo passado para o botão 'Ver Detalhes' dos filmes na lista. Esse problema acontece apenas na página FavoritePage.tsx; o restante da aplicação continua funcionando normalmente.

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Estrutura do Projeto

- **Frontend:** Localizado na pasta `frontend`, desenvolvido com React, TypeScript, e Vite.
- **Backend:** Localizado na pasta `backend`, desenvolvido com Node.js e Express, utilizando um banco de dados SQLite.

## Como Executar o Projeto

### Passo 2: Configuração do Frontend

1. Entre na pasta do front-end:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

O servidor front-end estará disponível em `http://localhost:5173`.

### Passo 3: Configuração do Backend

1. Entre na pasta do back-end:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor do Node.js:

   ```bash
   node index.js
   ```

O servidor back-end estará disponível em `http://localhost:3000`.

## Funcionalidades

- **Frontend (React):**
  - Visualização de filmes.
  - Adição e remoção de filmes aos favoritos.
  - Integração com API externa (TMDb).
  - Compartilhamento de listas de filmes favoritos.

- **Backend (Node.js):**
  - API para armazenar e gerenciar filmes favoritos.
  - Banco de dados SQLite para persistência de dados.

## Tecnologias Utilizadas

### Frontend:

- React
- Vite
- TypeScript

### Backend:

- Node.js
- Express
- SQLite

### Backend:
- Node.js
- Express
- SQLite (Banco de dados)
>>>>>>> 60688c951c0cd16364dc80a6e1820abca6266b08
