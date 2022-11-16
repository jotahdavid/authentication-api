import db from '../../database';

class UserRepository {
  TABLE = 'users';

  async findAll() {
    const rows = await db.query(`SELECT id, name, email FROM ${this.TABLE}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await db.query(`
      SELECT * FROM ${this.TABLE}
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email: string) {
    const [row] = await db.query(`
      SELECT * FROM ${this.TABLE}
      WHERE email = $1
    `, [email]);
    return row;
  }

  async create({ name, email, password }: { name: string; email: string; password: string }) {
    const [row] = await db.query(`
      INSERT INTO ${this.TABLE} (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `, [name, email, password]);
    return row;
  }

  async update(id: string, { name, email }: { name: string; email: string }) {
    const [row] = await db.query(`
      UPDATE ${this.TABLE}
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING id, name, email
    `, [name, email, id]);
    return row;
  }

  async updatePassword(id: string, { password }: { password: string }) {
    const [row] = await db.query(`
      UPDATE ${this.TABLE}
      SET password = $1
      WHERE id = $2
      RETURNING id, name, email
    `, [password, id]);
    return row;
  }
}

export default new UserRepository();
