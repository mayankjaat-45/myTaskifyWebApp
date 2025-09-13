import express from "express";
import { login, logout, register, userDetails } from "../controller/auth.js";
import { protect } from "../middleware/protect.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/userDetails",protect, userDetails);

export default userRouter;
