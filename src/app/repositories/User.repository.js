const db = require('../../database');

const TABLE_NAME = 'users';

class UserRepository {
  async findAll() {
    const rows = await db.query(`SELECT id, name, email FROM ${TABLE_NAME}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM ${TABLE_NAME}
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * FROM ${TABLE_NAME}
      WHERE email = $1
    `, [email]);
    return row;
  }

  async create({ name, email, password }) {
    const [row] = await db.query(`
      INSERT INTO ${TABLE_NAME} (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, email, password]);
    return row;
  }
}

module.exports = new UserRepository();
