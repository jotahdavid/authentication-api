const UserRepository = require('../repositories/User.repository');
const UserSchema = require('../schemas/User.schema');

const Hash = require('../../utils/hash');

class UserController {
  async index(req, res) {
    const users = await UserRepository.findAll();

    return res.json(users);
  }

  async store(req, res) {
    const { value, error } = UserSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const userExists = await UserRepository.findByEmail(value.email);
    if (userExists) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const passwordHashed = await Hash.make(value.password);
    value.password = passwordHashed;

    const user = await UserRepository.create(value);

    return res.status(201).json(user);
  }
}

module.exports = new UserController();
