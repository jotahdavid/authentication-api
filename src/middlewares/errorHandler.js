/* eslint-disable no-console */
module.exports = (error, req, res, next) => {
  console.error(error);
  return res.sendStatus(500);
};
