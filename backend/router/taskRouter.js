import express from "express";
import { addTask, deleteTask, editTask, getTask } from "../controller/tasks.js";
import { protect } from "../middleware/protect.js";

const taskRouter = express.Router();

taskRouter.post("/add", protect, addTask);
taskRouter.put("/edit/:id", protect, editTask);
taskRouter.get("/get/:id", protect, getTask);
taskRouter.delete("/delete/:id", protect, deleteTask);

export default taskRouter;
