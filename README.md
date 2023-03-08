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
- Com as suas variáveis de ambiente configuradas e com o docker instalado, suba o container do banco de dados na sua máquina, usando o `docker-compose`, com o seguinte comando:
  ```bash
  docker compose up -d
  ```
- Agora precisaremos criar as tabelas do nosso banco de dados. Vamos utilizar as migrations geradas pelo prisma:
  ```bash
  npx prisma migrate dev
  ```
- Por fim, rode o projeto com o comando `yarn start` ou `npm start`;

## 🌐 API

### Registro de Usuário **/users [POST]**

- Request (application/json)
  - Body
    ```json
    {
      "name": "any_name",
      "email": "any_email@email.com",
      "password": "any_password"
    }
    ```

- Response 201 (application/json)
  - Body
    ```json
    {
      "user": {
        "id": "e4b1774f-908f-4838-9054-e82db54b95b6",
        "name": "any_name",
        "email": "any_email@email.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
    ```

### Informação do Usuário **/users/me [GET]**

- Request (application/json)
  - Headers
    ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ```

- Response 200 (application/json)
  - Body
    ```json
    {
      "user": {
        "id": "e4b1774f-908f-4838-9054-e82db54b95b6",
        "name": "any_name",
        "email": "any_email@email.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
    ```

### Atualizar informações básicas do Usuário **/users/me [PUT]**

- Request (application/json)
  - Headers
    ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ```
  - Body
    ```json
    {
      "name": "other_name",
      "email": "other_email@email.com"
    }
    ```

- Response 200 (application/json)
  - Body
    ```json
    {
      "user": {
        "id": "e4b1774f-908f-4838-9054-e82db54b95b6",
        "name": "other_name",
        "email": "other_email@email.com"
      }
    }
    ```

### Atualizar senha do Usuário **/users/me/password [PUT]**

- Request (application/json)
  - Headers
    ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ```
  - Body
    ```json
    {
      "oldPassword": "any_password",
      "password": "new_password"
    }
    ```

- Response 200 (application/json)
  - Body
    ```json
    {
      "user": {
        "id": "e4b1774f-908f-4838-9054-e82db54b95b6",
        "name": "other_name",
        "email": "other_email@email.com"
      }
    }
    ```

### Autenticar Usuário **/login [POST]**

- Request (application/json)
  - Body
    ```json
    {
      "email": "other_email@email.com",
      "password": "new_password"
    }
    ```

- Response 200 (application/json)
  - Body
    ```json
    {
      "user": {
        "id": "e4b1774f-908f-4838-9054-e82db54b95b6",
        "name": "other_name",
        "email": "other_email@email.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
    ```
