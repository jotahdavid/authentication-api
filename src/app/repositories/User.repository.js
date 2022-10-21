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
      RETURNING id, name, email
    `, [name, email, password]);
    return row;
  }

  async update(id, { name, email }) {
    const [row] = await db.query(`
      UPDATE ${TABLE_NAME}
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING id, name, email
    `, [name, email, id]);
    return row;
  }
}

module.exports = new UserRepository();
