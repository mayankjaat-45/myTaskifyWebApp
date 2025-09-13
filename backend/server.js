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
<<<<<<< HEAD

const corsOptions = {
  origin: "https://taskify-frontend-xi.vercel.app",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
=======
app.use(
  cors({
    origin: ["http://localhost:5173", "https://taskify-backend-hsac.onrender.com"],
    credentials: true,
  })
);
>>>>>>> 9fbd5930878cee957e19d2599f84a4f0023056b9

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
