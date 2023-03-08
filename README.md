# 🔒 Authentication (API)

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- TypeScript
- Express
- Prisma
- JWT
- Joi
- Docker

## 💻 Projeto

Este é um projeto de estudo, com o objetivo de praticar o fluxo de autenticação por meios de tokens JWT.

Neste repositório, desenvolvi uma que API possui sistema de registro e login de usuários, gerando os tokens de acesso e os validando. Veja mais detalhes sobre os [endpoints](#🌐-api).

Este repositório faz parte do projeto [:octocat: Authentication Project](https://github.com/jotahdavid/authentication-project).

## 📥 Instalando o Projeto

### Programas necessários

- Git **(ou baixe o repositório como .zip)**
- Node **(preferência na versão LTS)**
- Docker

### Etapas

- Vá até a pasta do projeto `authentication-api` e rode o comando `yarn` ou `npm install` para instalar as dependências do projeto;
- Crie o arquivo `.env` na raíz do projeto e adicione as variáveis necessárias como mostra o arquivo `.env.example`;
- Com as suas variáveis de ambiente configuradas e com o docker instalado, suba o container do banco de dados na sua máquina, usando o docker-compose, com o seguinte comando:
  ```bash
  docker compose up -d
  ```
- Agora precisaremos criar as tabelas do nosso banco de dados. Vamos utilizar as migrations geradas pelo prisma:
  ```bash
  npx prisma migrate dev
  ```
- Por fim, rode o projeto com o comando `yarn start` ou `npm start`;

## 🌐 API
