const UserSchema = require('../schemas/User.schema');

class UserController {
  async store(req, res) {
    const validation = UserSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ error: validation.error.message });
    }

    return res.status(201).json(validation.value);
  }
}

module.exports = new UserController();
