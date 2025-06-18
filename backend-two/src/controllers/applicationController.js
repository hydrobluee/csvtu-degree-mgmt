import Application from "../models/Application.js";

// Create new application
export async function createApplication(req, res) {
  try {
    const app = new Application({ ...req.body });
    await app.save();
    res.status(201).json({ id: app._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

// Lookup by roll number
export async function getByRoll(req, res) {
  try {
    const app = await Application.findOne({
      rollNumber: req.params.rollNumber,
    });
    if (!app) return res.status(404).json({ error: "Not found" });
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// List by currentStatus
export async function listByStatus(req, res) {
  try {
    const apps = await Application.find({ currentStatus: req.query.status });
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Update status
export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { currentStatus } = req.body;
    const assignDept =
      currentStatus === "Forwarded to DegreeCell"
        ? "DegreeCell"
        : currentStatus === "Forwarded to MPCon"
        ? "MPCon"
        : null;

    const app = await Application.findByIdAndUpdate(
      id,
      {
        currentStatus,
        assignedDepartment: assignDept,
      },
      { new: true }
    );

    if (!app) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Status updated", app });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}
