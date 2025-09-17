import Task from "../model/task.js";

// Add Task
export const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const user = req.user;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (title.length < 4) {
      return res
        .status(400)
        .json({ message: "Title must be at least 4 characters" });
    }
    if (description.length < 10) {
      return res
        .status(400)
        .json({ message: "Description must be at least 10 characters" });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      status,
      user: user._id,
    });
    await newTask.save();

    user.tasks.push(newTask._id);
    await user.save();

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit Task
export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id }, // ✅ ensure only owner can edit
      { title, description, priority, status },
      { new: true }
    );

    if (!task)
      return res.status(404).json({ message: "Task not found or not yours" });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.user._id }); // ✅ secure
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id }); // ✅ secure
    if (!task)
      return res.status(404).json({ message: "Task not found or not yours" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
