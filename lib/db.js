import mysql from "mysql2/promise";

let pool;
export function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 10,
    });
  }
  return pool;
}
