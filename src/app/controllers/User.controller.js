const UserRepository = require('../repositories/User.repository');
const UserSchema = require('../schemas/User.schema');

const Hash = require('../../utils/hash');
const Token = require('../../utils/token');

const HOUR_IN_SECONDS = 3600;

class UserController {
  async index(req, res) {
    const users = await UserRepository.findAll();

    return res.json(users);
  }

  async me(req, res) {
    const user = await UserRepository.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.json({ user: userResponse });
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

    const tokenPayload = {
      iss: 'authentication-api',
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + HOUR_IN_SECONDS,
    };
    const token = await Token.generate(tokenPayload);

    return res.status(201).json({ ...user, token });
  }
}

module.exports = new UserController();
