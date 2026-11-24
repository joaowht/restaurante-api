# Restaurante API

API REST desenvolvida com Node.js, Express e MySQL para gerenciamento de um sistema de restaurante.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- MySQL2
- Axios
- Bcrypt
- Dotenv

## Funcionalidades

- Gerenciamento de usuários
- Gerenciamento de produtos
- Gerenciamento de pedidos
- Integração com receitas

## Estrutura do projeto

```text
restaurante api/
├── src/
│   ├── config.db.js
│   ├── server.js
│   └── routers/
│       ├── usuarios.js
│       ├── produtos.js
│       ├── pedidos.js
│       └── receitas.js
├── restaurante.sql
├── package.json
├── package-lock.json
└── .env.example
```

## Como instalar

1. Clone o repositório:

```bash
git clone https://github.com/joaowht/restaurante-api.git
```

2. Entre na pasta da API:

```bash
cd "restaurante api"
```

3. Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

1. Inicie o MySQL.
2. Importe o arquivo `restaurante.sql` pelo phpMyAdmin.
3. Configure as variáveis de ambiente no arquivo `.env`, seguindo o modelo `.env.example`.

## Como executar

Inicie o servidor com:

```bash
npm run dev
```

O servidor será iniciado, por padrão, na porta 3333.

## Rota inicial

`GET /`

Retorna uma mensagem de boas-vindas.

## Autor

Projeto acadêmico desenvolvido para fins educacionais.