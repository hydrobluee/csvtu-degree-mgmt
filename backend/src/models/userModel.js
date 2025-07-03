// src/models/userModel.js
import db from "../db.js"; // your MySQL pool
import bcrypt from "bcrypt";

export async function findUserByEmail(email) {
  const [rows] = await db.execute(
    "SELECT u.user_id, u.email, u.password_hash, r.role_name " +
      "FROM users u JOIN roles r ON u.role_id = r.role_id WHERE u.email = ?",
    [email]
  );
  return rows[0] || null;
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
