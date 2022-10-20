function info() {
  return `Esta es la API del taller`;
}

function feed(parents, args, context) {
  return context.prisma.link.findMany();
}

module.exports = {
  info,
  feed,
};
