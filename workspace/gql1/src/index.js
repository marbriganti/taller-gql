const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `Esta es la API del taller`,
    feed: async (parents, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },

    updateLink: async (parent, args, context, info) => {
      const { id, url, description } = args;
      const result = await context.prisma.link.update({
        where: { id: parseInt(id) },
        data: {
          url: url ? url : undefined,
          description: description ? description : undefined,
        },
      });
      return result;
    },

    deleteLink: async (parent, args, context, info) => {
      const { id } = args;
      return await context.prisma.link.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,

  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
