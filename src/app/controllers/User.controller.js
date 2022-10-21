const Joi = require('joi');

const UserRepository = require('../repositories/User.repository');
const UserSchema = require('../schemas/User.schema');

const Hash = require('../../utils/hash');
const Token = require('../../utils/token');

const HOUR_IN_SECONDS = 3600;

const UpdateUserSchema = UserSchema.keys({
  password: Joi.forbidden(),
});

const UpdateUserPasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
});

class UserController {
  async index(req, res) {
    const users = await UserRepository.findAll();

    return res.json(users);
  }

  async store(req, res) {
    const { value: payload, error } = UserSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const userExists = await UserRepository.findByEmail(payload.email);
    if (userExists) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const passwordHashed = await Hash.make(payload.password);

    const user = await UserRepository.create({
      ...payload,
      password: passwordHashed,
    });

    const token = await Token.generate({
      iss: 'authentication-api',
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + HOUR_IN_SECONDS,
    });

    return res.status(201).json({ user, token });
  }

  async getByToken(req, res) {
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

  async updateByToken(req, res) {
    const { value: payload, error } = UpdateUserSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const userExists = await UserRepository.findById(req.userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (payload.email !== userExists.email) {
      const isEmailAlreadyInUse = await UserRepository.findByEmail(payload.email);

      if (isEmailAlreadyInUse) {
        return res.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const user = await UserRepository.update(req.userId, payload);

    return res.json({ user });
  }

  async updatePasswordByToken(req, res) {
    const { value: payload, error } = UpdateUserPasswordSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const userExists = await UserRepository.findById(req.userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isTheSamePassword = await Hash.compare(payload.oldPassword, userExists.password);
    if (!isTheSamePassword) {
      return res.status(400).json({ error: 'Password invalid' });
    }

    const passwordHashed = await Hash.make(payload.password);

    const user = await UserRepository.updatePassword(req.userId, {
      password: passwordHashed,
    });

    return res.json({ user });
  }
}

module.exports = new UserController();
