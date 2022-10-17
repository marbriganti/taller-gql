const { ApolloServer } = require("apollo-server");

// 1
const typeDefs = `
  type Query {
    info: String!
  }
`;

// 2
const resolvers = {
  Query: {
    info: () => `Esta es la API del taller`,
  },
};

// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
