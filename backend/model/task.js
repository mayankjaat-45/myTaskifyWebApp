import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "High", "Medium"],
    default: "Low",
  },
  status: {
    type: String,
    required: true,
    enum: ["YetToStart", "InProgress", "Completed"],
    default: "YetToStart",
  },
});

const Task = mongoose.model("task", taskSchema);

export default Task;
