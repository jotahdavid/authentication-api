import 'dotenv/config';

import { Client } from 'pg';

class Database {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.client.connect();
  }

  async query(queryStatement: string, values?: unknown[]) {
    const { rows } = await this.client.query(queryStatement, values);
    return rows;
  }
}

export default new Database();
