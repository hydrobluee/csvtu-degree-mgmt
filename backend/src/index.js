import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import applicationRoutes from "./routes/applicationRoutes.js";
import session from "express-session";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173", // allow your React app
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", applicationRoutes);

app.use(
  session({ secret: "csvtu-secret", resave: false, saveUninitialized: false })
);
app.use("/api", loginRoutes);

app.get("/doneseen", (req, res) => {
  res.json({ message: "hello js" });
});

const PORT = process.env.PORT || 2200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
