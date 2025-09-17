import { useEffect, useState } from "react";
import API from "../api";

const EditTask = ({
  editTaskId,
  setEditTaskDiv,
  setEditTaskId,
  fetchTasks,
}) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "YetToStart",
  });

  // Fetch task details on mount or when editTaskId changes
  useEffect(() => {
    if (!editTaskId) return;
    API.get(`/api/tasks/get/${editTaskId}`).then((res) => {
      setValues(res.data.task);
    });
  }, [editTaskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    await API.put(`/api/tasks/edit/${editTaskId}`, values, {
      withCredentials: true,
    });
    setEditTaskDiv("hidden");
    setEditTaskId(null);
    fetchTasks();
  };

  const handleDeleteTask = async () => {
    if (window.confirm("Delete this task?")) {
      await API.delete(`/api/tasks/delete/${editTaskId}`, {
        withCredentials: true,
      });
      setEditTaskDiv("hidden");
      setEditTaskId(null);
      fetchTasks();
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6 animate-fadeInUp">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        ✏️ Edit Task
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleEditTask}>
        {/* Title */}
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
          placeholder="Task Title..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Priority & Status */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="YetToStart">🚀 Yet To Start</option>
              <option value="InProgress">⚡ In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Task Description..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-[12vh] resize-none"
        ></textarea>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {
              setEditTaskDiv("hidden");
              setEditTaskId(null);
            }}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteTask}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
