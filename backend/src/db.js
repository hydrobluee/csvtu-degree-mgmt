import mysql from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "vivekverma",
  database: "degree",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
