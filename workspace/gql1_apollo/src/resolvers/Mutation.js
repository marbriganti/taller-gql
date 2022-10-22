const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");

async function post(parent, args, context, info) {
  const { userId } = context;
  const createdLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish("NEW_LINK", createdLink);

  return createdLink;
}

async function updateLink(parent, args, context, info) {
  const { id, url, description } = args;
  const result = await context.prisma.link.update({
    where: { id: parseInt(id) },
    data: {
      url: url ? url : undefined,
      description: description ? description : undefined,
    },
  });
  return result;
}

async function deleteLink(parent, args, context, info) {
  const { id } = args;
  return await context.prisma.link.delete({
    where: { id: parseInt(id) },
  });
}

async function signup(parent, args, context, info) {
  // 1 Encriptamos el password
  const password = await bcrypt.hash(args.password, 10);

  // 2 Creamos el usuario en la base con PrismaClient
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  // 3 Generamos un Json Web Token firmado con un APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET); //podríamos agregar la opciòn de expiración, {epiresIn: '2h'}

  // 4 Retornamos el token y los datos del usuario
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  //1 Buscamos el user a través del unique (esta versión tiene esta function, en otras versiones se usa findOne)
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  //2 Comparamos el password encriptado
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  // 3 Generamos un Json Web Token firmado con un APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function vote(parent, args, context, info) {
  //Recuperamos el userId
  const { userId } = context;
  const linkId = Number(args.linkId);

  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: linkId,
        userId,
      },
    },
    select: { linkId: true }, //No necesito los datos, proyecto linkId solamente
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${linkId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: linkId } },
    },
  });
  context.pubsub.publish("NEW_VOTE", newVote);
  return newVote;
}

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
  vote,
};
