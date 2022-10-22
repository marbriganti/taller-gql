function links(parent, args, context) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}

module.exports = {
  links,
};

//Nota: Agregar el virtual links, hará que cada vez que se pida en la mutation o
//query se acceda a la base y se busquen todos los links. Esto se puede optimizar
//según la necesidad, por ejemplo haciendo "includes" de prisma, sólo en los casos
//en los que sabemos sea necesario en determinadas queries
