import Joi from 'joi';

interface UserPayload {
  name: string;
  email: string;
  password: string;
}

export default Joi.object<UserPayload>({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
