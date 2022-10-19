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

const verify = (token) => (
  new Promise((resolve, reject) => {
    JWT.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => (err ? reject(err) : resolve(decoded)),
    );
  })
);

module.exports = {
  generate,
  verify,
};
