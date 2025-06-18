import db from "../db.js";
export async function getHistory(applicationId) {
  const sql = `
    SELECT sh.changed_at, u.first_name, u.last_name, s.status_name
    FROM status_history sh
    JOIN users u ON sh.changed_by = u.user_id
    JOIN statuses s ON sh.status_id = s.status_id
    WHERE sh.application_id = ?
    ORDER BY sh.changed_at
  `;
  const [rows] = await db.execute(sql, [applicationId]);
  return rows;
}
