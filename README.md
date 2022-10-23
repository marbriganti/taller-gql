# talleres-gql

Ejemplos recopilados de distintos tutoriales de graphql.

## workspace

El folder workspace tiene código ejemplo separado en 2 grandes carpetas

### workspace.gql0_intro

Posee códigos ejemplo de graphql-express

### workspace.gql1_apollo

- Posee un proyecto en el raíz con
  - La librería apollo-server GraphQL
  - ORM Prisma configurado
  - schema.prisma y schema.graphql definidos
- Una carpeta ejemplos_curso con ejemplos básicos que se ejecutan individualmente
- Autenticación con JWT

#### Para acceder al ejemplo de apolo server:

1. ir al folder gql1_apollo
   npm install

2. ejecutar con comando node:
   node src/index.js

3. opcionalmente con nodemon
   nodemon src/

# Branches

- main: Última actualización

- dev/00_gql_prisma: Parte introductoria con gql0 y gql1 ejemplos de la introducción a Apollo server y Prisma

- dev/01_gql_prisma_auth: Añade Autentiación y jwt

- dev/02_gql_subscriptions: Añade Subscriptions

- dev/03_gql_paginated_queries: Añade Ejemplos de queries paginadas

# Ejecutar migrations de prisma

npx prisma migrate dev --name "nombre migration"

# Enlaces

- Github Código ejemplo y explicaciones del taller https://github.com/marbriganti/taller-gql
- Sitio GraphQL: https://graphql.org
- Github Código fuente del sitio howtographql completo: https://github.com/howtographql/graphql-js
- Sitio npm jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken
- Github node-jsonwebtoken: https://github.com/auth0/node-jsonwebtoken
- JWT libraries: https://jwt.io/libraries
- WebSocket: https://en.wikipedia.org/wiki/WebSocket
- Prisma: https://www.prisma.io/docs/reference
- Bases de datos soportadas por Prisma: https://www.prisma.io/docs/concepts/database-connectors
