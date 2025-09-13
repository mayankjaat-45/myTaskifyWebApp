import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./router/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRouter from "./router/taskRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});
