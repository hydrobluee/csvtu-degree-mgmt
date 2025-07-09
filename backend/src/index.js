// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import applicationRoutes from "./routes/applicationRoutes.js";
// // import session from "express-session";
// import loginRoutes from "./routes/loginRoutes.js";
// // import MySQLStore from "express-mysql-session";

// const app = express();
// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173", // allow your React app
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // const store = new MySQLStore({
// //   // reuse your existing DB config
// //   ...dbConfig,
// //   expiration: 1000 * 60 * 60 * 24, // sessions expire in 1 day
// // });

// // app.use(
// //   session({
// //     key: "csvtu_session",
// //     secret: process.env.SESSION_SECRET, // use a strong secret from env
// //     store,
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //       httpOnly: true, // no client‑side JS access
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "lax", // or 'strict' if you prefer
// //       maxAge: 1000 * 60 * 60 * 24, // one day
// //     },
// //   })
// // );

// app.use("/api", applicationRoutes);
// app.use("/api", loginRoutes); // includes /login, /logout, /session

// app.get("/doneseen", (req, res) => {
//   res.json({ message: "hello js" });
// });

// const PORT = process.env.PORT || 2200;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// CHAT GPT SUGGESTION

// ────────────────────────────────── index.js ──────────────────────────────────
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import mysql from "mysql2/promise";
import mysqlSession from "express-mysql-session";

import { dbConfig } from "./db.js";
import loginRoutes from "./routes/loginRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ── 1️⃣  Build pool & session store  ──────────────────────────────────────────
const connection = await mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
});

const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(
  {
    // first arg: store options
    expiration: 1000 * 60 * 60 * 24, // 1 day
  },
  connection
); // second arg: mysql pool

// ── 2️⃣  Session middleware (use the store)  ──────────────────────────────────
app.use(
  session({
    key: "csvtu_session",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ── 3️⃣  Routes  ──────────────────────────────────────────────────────────────
app.use("/api", loginRoutes);
app.use("/api", applicationRoutes);

const PORT = process.env.PORT || 2200;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
