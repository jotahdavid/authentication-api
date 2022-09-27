const bcrypt = require('bcryptjs');

const make = async (value) => (
  bcrypt.hash(value, 10)
);

const compare = async (value, hash) => (
  bcrypt.compare(value, hash)
);

module.exports = {
  make,
  compare,
};
