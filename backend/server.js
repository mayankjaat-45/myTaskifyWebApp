// server.js
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./router/userRouter.js";
import taskRouter from "./router/taskRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

// Connect DB and start server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  });
