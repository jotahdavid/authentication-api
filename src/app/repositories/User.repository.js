const UUID = require('uuid');

const users = [];

class UserRepository {
  async findAll() {
    return Promise.resolve(users.map(
      (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    ));
  }

  async create({ name, email, password }) {
    return new Promise((resolve) => {
      const newUser = {
        id: UUID.v4(),
        name,
        email,
        password,
      };

      users.push(newUser);
      resolve(newUser);
    });
  }
}

module.exports = new UserRepository();
