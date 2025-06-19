import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log("✅ Server file loaded");

app.get("/ping", (req, res) => {
  console.log("GET /ping");
  res.json({ message: "pong" });
});

app.post("/api/data", (req, res) => {
  console.log("POST /api/data", req.body);
  res.json({ status: "success", data: req.body });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
