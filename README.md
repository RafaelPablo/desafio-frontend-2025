# 📊 Gerenciamento de Transações Financeiras

Este é um software para gerenciamento de transações financeiras, permitindo registrar entradas e saídas, visualizar um resumo financeiro e ordenar ou filtrar os dados conforme necessário.

![Dashboard de Transações](/desafio-frontend-2025/docs/26.png)

## 📌 Funcionalidades Principais

### 🔹 Listagem de Transações
- As transações são exibidas em uma tabela contendo:
  - **Descrição**
  - **Valor** (valores negativos representam saídas, enquanto positivos representam entradas)
  - **Data**
  - **Tipo** (Entrada ou Saída)
- Possibilidade de **ordenar** por qualquer uma das colunas clicando sobre o cabeçalho.

![Tabela de Transações](/desafio-frontend-2025/docs/17.png)

### 🔹 Sumário Financeiro
- Exibe um resumo com a soma do total de **Entradas, Saídas e Saldo**.

![Resumo Financeiro](/desafio-frontend-2025/docs/6.png)

### 🔹 Cadastro de Novas Transações
- Botão **"Nova Transação"** permite ao usuário inserir Transações:

![Botão de Nova Transação](/desafio-frontend-2025/docs/3.png)

- No modal **"Nova Transação"** é possível informar os seguintes campos:
  - **Descrição da transação**
  - **Valor** (positivo para entrada, negativo para saída)
  - **Data da transação**

![Modal de Nova Transação](/desafio-frontend-2025/docs/4.png)

### 🔹 Exclusão de Transações
- Cada linha da tabela contém uma opção para excluir a transação.

![Botão de Exclusão](/desafio-frontend-2025/docs/21.png)

- Um modal de **confirmação de exclusão** é exibido antes da remoção definitiva.

![Modal de Exclusão](/desafio-frontend-2025/docs/20.png)

### 🔹 Filtro de Transações
- Campo de busca permite filtrar os registros por:
  - **Descrição**
  - **Valor**
  - **Data**
- O usuário pode alternar o critério de busca selecionando uma opção.

![Filtro de Busca](/desafio-frontend-2025/docs/7.png)

### 🔹 Temas (Claro/Escuro)
- O usuário pode alternar entre os temas **claro** e **escuro** pelo botão no canto superior direito.
- O tema escolhido é aplicado em toda a interface da aplicação.

![Alternância de Tema](/desafio-frontend-2025/docs/2.png)

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

## 📜 Licença
Este projeto está licenciado sob a [MIT License](./LICENSE).
