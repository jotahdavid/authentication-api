const UserRepository = require('../repositories/User.repository');
const UserSchema = require('../schemas/User.schema');

class UserController {
  async index(req, res) {
    const users = await UserRepository.findAll();
    return res.json(users);
  }

  async store(req, res) {
    const validation = UserSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ error: validation.error.message });
    }

    const user = await UserRepository.create(req.body);

    return res.status(201).json(user);
  }
}

module.exports = new UserController();
