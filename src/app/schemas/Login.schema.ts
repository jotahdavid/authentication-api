import Joi from 'joi';

interface LoginPayload {
  email: string;
  password: string;
}

export default Joi.object<LoginPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
