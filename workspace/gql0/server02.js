const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construimos un schema con la sintaxis de Graphql
const schema = buildSchema(`
  type Query {
    saludo: String
  }
`);

// El root provee un resolver
const root = {
  saludo: () => {
    return 'Bueeenas, cómo andan..';;
  },
};

// Levantamos el cliente en http://localhost:4000/graphql
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');