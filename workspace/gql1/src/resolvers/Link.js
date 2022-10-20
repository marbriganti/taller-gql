//Este resovler se ejecutará en un segundo stage, antes de retornar la información del parent

function postedBy(parent, args, context) {
  return context.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

module.exports = {
  postedBy,
};
