import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173/", // allow your React app
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
