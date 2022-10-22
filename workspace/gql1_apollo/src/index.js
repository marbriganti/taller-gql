const fs = require("fs");
const path = require("path");
const { ApolloServer, PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const { getUserId } = require("./utils");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const Subscription = require("./resolvers/Subscription");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,

  context: ({ req }) => {
    return {
      ...req,
      pubsub,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
