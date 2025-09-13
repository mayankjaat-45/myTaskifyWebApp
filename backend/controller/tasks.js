import Task from "../model/task.js";

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
        .json({ message: "Title must be Atleast 4 characters" });
    }

    if (description.length < 10) {
      return res
        .status(400)
        .json({ message: "Description must be Atleast 10 characters" });
    }

    //creating Task
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      user: user._id,
    });
    await newTask.save();

    //pushing task to the user
    user.tasks.push(newTask._id);
    await user.save();

    res.status(200).json({ message: "Task Added Successfully", task: newTask });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error " });
  }
};

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    await Task.findByIdAndUpdate(id, { title, description, priority, status });
    res.status(200).json({ message: "Task Edit" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error " });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await Task.findById(id);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error " });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "task Deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error " });
  }
};
