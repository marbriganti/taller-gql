async function newLinkSubscribe(parent, args, context, info) {
  //Accedemos a pubsub desde el context y llamamos a la function asyncIterator
  //pasando el string "NEW_LINK". Esta function se usa para resolver la
  //subscription y pushar los datos del evento
  return context.pubsub.asyncIterator("NEW_LINK");
}

//resolver
async function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};
const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
};
