import db from "../db.js";
export async function getAllStatuses() {
  const [rows] = await db.query("SELECT * FROM statuses");
  return rows;
}
