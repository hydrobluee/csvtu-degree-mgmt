import db from "../db.js";

export async function createApplication(data) {
  const passingYear = Number(data.passing_year.split("-")[0]);
  const assignedDept = passingYear > 2016 ? "MPCon" : "DegreeCell";
  const sql = `
    INSERT INTO applications
    (type, certificate_type, enrollment_number, branch, roll_number,
     student_name, passing_year, course, division, mobile, email,
     fees_date, fee_status, assigned_department, current_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.type,
    data.certificate_type,
    data.enrollment_number,
    data.branch,
    data.roll_number,
    data.student_name,
    data.passing_year,
    data.course,
    data.division,
    data.mobile,
    data.email,
    data.fees_date,
    "Pending",
    assignedDept,
    "To-Do",
  ];
  const [result] = await db.execute(sql, params);
  return result.insertId;
}

export async function getByRoll(rollNumber) {
  const sql = `SELECT * FROM applications WHERE roll_number = ?`;
  const [rows] = await db.execute(sql, [rollNumber]);
  return rows[0];
}

export async function getByStatus(status) {
  const sql = `SELECT * FROM applications WHERE current_status = ?`;
  const [rows] = await db.execute(sql, [status]);
  return rows;
}

export async function updateStatus(id, newStatus, userId) {
  const assignDept =
    newStatus === "Forwarded to DegreeCell"
      ? "DegreeCell"
      : newStatus === "Forwarded to MPCon"
      ? "MPCon"
      : null;

  const sqlApp = `
    UPDATE applications
    SET current_status = ?, assigned_department = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  await db.execute(sqlApp, [newStatus, assignDept, id]);

  const sqlHist = `
    INSERT INTO status_history
    (application_id, status_id, changed_by)
    VALUES
    (?, (SELECT status_id FROM statuses WHERE status_name = ?), ?)
  `;
  await db.execute(sqlHist, [id, newStatus, userId]);
}
