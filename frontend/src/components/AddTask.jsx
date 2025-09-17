import { useState } from "react";
import API from "../api";

const AddTask = ({ setAddTaskDiv, fetchTasks }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "YetToStart",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/tasks/add", values);
      setAddTaskDiv("hidden");
      setValues({
        title: "",
        description: "",
        priority: "Low",
        status: "YetToStart",
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6 animate-fadeInUp">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        ➕ Add Task
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleAddTask}>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
          placeholder="Task Title..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="YetToStart">🚀 Yet To Start</option>
            <option value="InProgress">⚡ In Progress</option>
            <option value="Completed">✅ Completed</option>
          </select>
        </div>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Task Description..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-[12vh] resize-none"
        ></textarea>
        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setAddTaskDiv("hidden")}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
