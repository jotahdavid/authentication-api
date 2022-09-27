SELECT 'CREATE DATABASE authentication_project'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'authentication_project')\gexec

\c authentication_project;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);
