const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    dateAndDescription: String!
  }
`;

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Tutorial de GraphQL, enlace a la fuente",
  },
];

const resolvers = {
  Query: {
    info: () => `Esta es la API del taller`,
    feed: () => links,
  },

  Link: {
    dateAndDescription: (parent) =>
      `${new Date().toISOString().split("T")[0]}: ${parent.description}`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
