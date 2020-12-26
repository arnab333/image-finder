module.exports = (promise) => {
  return promise.then((response) => [null, response]).catch((error) => [error]);
};
