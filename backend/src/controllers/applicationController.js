import * as AppModel from "../models/applicationModel.js";

export async function create(req, res) {
  // console.log("Creating application with data:", req.body);
  try {
    const id = await AppModel.createApplication(req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insertion failed" });
  }
}

export async function lookupByRoll(req, res) {
  try {
    const app = await AppModel.getByRoll(req.params.rollNumber);
    if (!app) return res.status(404).json({ error: "Not found" });
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
}

export async function listByStatus(req, res) {
  try {
    const apps = await AppModel.getByStatus(req.query.status);
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
}

export async function updateStatus(req, res) {
  try {
    const userId = req.body.userId || 1;
    await AppModel.updateStatus(
      parseInt(req.params.id, 10),
      req.body.current_status,
      userId
    );
    res.json({ message: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
}
