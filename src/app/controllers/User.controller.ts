import { Request, Response } from 'express';
import Joi from 'joi';
import { User } from '@prisma/client';

import UserRepository from '@repositories/User.repository';
import UserSchema from '@schemas/User.schema';

import Hash from '@helpers/Hash';
import Token from '@helpers/Token';

const HOUR_IN_SECONDS = 3600;

const UpdateUserSchema = UserSchema.keys({
  password: Joi.forbidden(),
});

const UpdateUserPasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
});

type ResponseAuthenticated<TBody = any> = Response<TBody, { user: User }>;

class UserController {
  async store(req: Request, res: Response) {
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

  async getByToken(req: Request, res: ResponseAuthenticated) {
    const { user } = res.locals;

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.json({ user: userResponse });
  }

  async updateByToken(req: Request, res: ResponseAuthenticated) {
    const { value: payload, error } = UpdateUserSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const { user } = res.locals;

    if (payload.email !== user.email) {
      const isEmailAlreadyInUse = await UserRepository.findByEmail(payload.email);

      if (isEmailAlreadyInUse) {
        return res.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const updatedUser = await UserRepository.update(user.id, payload);

    const userResponse = {
      ...updatedUser,
      password: undefined,
    };

    return res.json({ user: userResponse });
  }

  async updatePasswordByToken(req: Request, res: ResponseAuthenticated) {
    const { value: payload, error } = UpdateUserPasswordSchema.validate(req.body);

    if (error) {
      return res.status(422).json({ error: error.message });
    }

    const { user } = res.locals;

    const isTheSamePassword = await Hash.compare(payload.oldPassword, user.password);
    if (!isTheSamePassword) {
      return res.status(400).json({ error: 'Password invalid' });
    }

    const passwordHashed = await Hash.make(payload.password);

    const updatedUser = await UserRepository.updatePassword(user.id, {
      password: passwordHashed,
    });

    const userResponse = {
      ...updatedUser,
      password: undefined,
    };

    return res.json({ user: userResponse });
  }
}

export default new UserController();
