const db = require('../../database');

const TABLE_NAME = 'users';

class UserRepository {
  async findAll() {
    const rows = await db.query(`SELECT id, name, email FROM ${TABLE_NAME}`);
    return rows;
  }

  async create({ name, email, password }) {
    const [row] = await db.query(`
      INSERT INTO ${TABLE_NAME} (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `, [name, email, password]);
    return row;
  }
}

module.exports = new UserRepository();
