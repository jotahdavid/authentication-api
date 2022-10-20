const UserRepository = require('../repositories/User.repository');
const LoginSchema = require('../schemas/Login.schema');

const Hash = require('../../utils/hash');
const Token = require('../../utils/token');

const HOUR_IN_SECONDS = 3600;

class AuthController {
  async login(req, res) {
    const { value: payload, error } = LoginSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const user = await UserRepository.findByEmail(payload.email);
    if (!user) {
      return res.status(400).json({ error: 'E-mail or password are invalid' });
    }

    const isTheSamePassword = await Hash.compare(payload.password, user.password);
    if (!isTheSamePassword) {
      return res.status(400).json({ error: 'E-mail or password are invalid' });
    }

    const token = await Token.generate({
      iss: 'authentication-api',
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + HOUR_IN_SECONDS,
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json({ user: userResponse, token });
  }
}

module.exports = new AuthController();
