function info() {
  return `Esta es la API del taller`;
}

async function feed(parents, args, context) {
  const { skip, take, orderBy } = args;
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  const count = await context.prisma.link.count({
    where,
  });

  return {
    links,
    count: count,
  };
}

async function link(parent, args, context) {
  return await context.prisma.link.findUnique({
    where: { id: Number(args.id) },
  });
}

module.exports = {
  info,
  feed,
  link,
};
