# 📊 Documentação do Software de Gerenciamento de Transações Financeiras

Este software de gerenciamento de transações financeiras oferece uma interface dinâmica que permite aos usuários interagir facilmente com seu histórico financeiro. Com ele, é possível registrar entradas e saídas, visualizar um resumo consolidado do saldo, além de ordenar e filtrar os dados conforme necessário.

A plataforma conta com funcionalidades intuitivas, como filtros personalizados, ordenação de colunas e um sumário detalhado das transações. Além disso, inclui um modo de troca de temas entre claro e escuro, proporcionando uma experiência personalizada para o usuário.

![Aplicação](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/26.png)

## 📌 Funcionalidades Principais

### 🔹 Listagem de Transações
- As transações são exibidas em uma tabela contendo:
  - **Descrição**
  - **Valor** (valores negativos representam saídas, enquanto positivos representam entradas)
  - **Data**
  - **Tipo** (Entrada ou Saída - representado pela cor do valor e sinal)
- Possibilidade de **ordenar** os dados clicando sobre os cabeçalhos das colunas **Descrição, Valor e Data**.

![Ordenação Tabela](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/17.png)

- **Filtro de Tipo**:  
  O usuário pode selecionar um filtro para visualizar transações específicas:
  - **Todas**: Exibe tanto entradas quanto saídas.  
  - **Entradas**: Mostra apenas transações de entrada (valores positivos).  
  - **Saídas**: Exibe somente transações de saída (valores negativos).  

![Filtros Tabela](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/25.png)

### 🔹 Sumário Financeiro
- Exibe um resumo com a soma do total de **Entradas, Saídas e Saldo**.

![Resumo Financeiro](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/6.png)

### 🔹 Cadastro de Novas Transações
- Botão **"Nova Transação"** (no canto superior direito) permite ao usuário inserir Transações:

![Botão de Nova Transação](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/3.png)

- No modal **"Nova Transação"** é possível informar os seguintes campos:
  - **Descrição da transação**
  - **Valor** (positivo para entrada, negativo para saída)
  - **Data da transação**

![Modal de Nova Transação](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/4.png)

### 🔹 Exclusão de Transações
- Cada linha da tabela contém uma opção para excluir a transação.

![Botão de Exclusão](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/21.png)

- Um modal de **confirmação de exclusão** é exibido antes da remoção definitiva.

![Modal de Exclusão](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/20.png)

### 🔹 Filtro de Transações
- Campo de busca permite filtrar os registros por:
  - **Descrição**
  - **Valor**
  - **Data**
- O usuário pode alternar o critério de busca selecionando uma opção.

![Filtro de Busca](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/7.png)

### 🔹 Temas (Claro/Escuro)
- O usuário pode alternar entre os temas **claro** e **escuro** pelo botão (no canto superior esquerdo).
- O tema escolhido é aplicado em toda a interface da aplicação.

![Alternância de Tema](https://raw.githubusercontent.com/RafaelPablo/desafio-frontend-2025/main/docs/2.png)

## 🚀 Como Instalar e inicializar o Front e o 'Back'

### ✅ Instalação
Certifique-se de ter o Node.js instalado e execute os seguintes comandos:

```bash
# Clone o repositório
git clone https://github.com/RafaelPablo/desafio-frontend-2025.git

# Acesse a pasta do projeto
cd desafio-frontend-2025

# Instale as dependências
npm i
```

### ▶️ Executando o Projeto

```bash
npx json-server server.json -p 3333
npm run dev
```
A aplicação estará disponível em `http://localhost:3002`.

<!-- ## 🧪 Testes
A aplicação possui testes unitários cobrindo as principais funcionalidades. Para executá-los:

```bash
npm test
``` -->

## 🚀 Tecnologias Utilizadas

As principais tecnologias usadas no projeto são:

- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) `5.3.3`
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) `18.2.0`
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) `5.0.0`
- ![Styled Components](https://img.shields.io/badge/-Styled%20Components-DB7093?logo=styled-components&logoColor=white) `6.1.8`
- ![Radix UI](https://img.shields.io/badge/-Radix%20UI-000000?logo=radixui&logoColor=white) `1.1.0`
- ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) `1.6.8`
- ![Zod](https://img.shields.io/badge/-Zod-9B33FA?logo=zod&logoColor=white) `3.22.4`
- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=react-hook-form&logoColor=white) `7.46.0`
- ![Vitest](https://img.shields.io/badge/-Vitest-FFC72C?logo=vitest&logoColor=white) `0.34.6`
- ![JSON Server](https://img.shields.io/badge/-JSON%20Server-000000?logo=json&logoColor=white) `0.17.4`

## 📜 Licença
Este projeto está licenciado sob a [MIT License](./LICENSE).
