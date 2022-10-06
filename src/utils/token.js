const JWT = require('jsonwebtoken');

const generate = (payload) => (
  new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      process.env.SECRET_KEY,
      { algorithm: 'HS256' },
      (err, token) => (err ? reject(err) : resolve(token)),
    );
  })
);

module.exports = {
  generate,
};
