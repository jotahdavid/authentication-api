import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { validate as validateUUID } from 'uuid';

import UserRepository from '@repositories/User.repository';
import Token from '@helpers/Token';

interface Payload extends JwtPayload {
  sub: string;
}

function isValidPayload(payload: any): asserts payload is Payload {
  if (
    !(typeof payload === 'object'
      && 'sub' in payload
      && typeof payload.sub === 'string'
      && validateUUID(payload.sub))
  ) {
    throw new Error('Payload invalid');
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  try {
    const payload = await Token.verify(token);
    isValidPayload(payload);

    const user = await UserRepository.findById(payload.sub);
    if (!user) {
      throw new Error('Token invalid');
    }

    res.locals.user = user;
  } catch {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
