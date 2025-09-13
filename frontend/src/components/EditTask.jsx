import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api";

const EditTask = ({ setEditTaskDiv, editTaskId, setEditTaskId }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "YetToStart",
  });

  // 🟢 Fetch task when modal opens
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/api/tasks/get/${editTaskId}`, {
          withCredentials: true,
        });
        setValues(res.data.task || res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load task");
      }
    };
    if (editTaskId) fetchTask();
  }, [editTaskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // ✏️ Update Task
  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/api/tasks/edit/${editTaskId}`, values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setEditTaskDiv("hidden");
        setEditTaskId(null); // ✅ clear id
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // 🗑️ Delete Task
  const handleDeleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/api/tasks/delete/${editTaskId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setEditTaskDiv("hidden");
        setEditTaskId(null); // ✅ clear id
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6 animate-fadeInUp">
      {/* Title */}
      <h1 className="text-center font-bold text-2xl text-gray-800 mb-4">
        ✏️ Edit Task
      </h1>
      <hr className="mb-4 border-gray-300" />

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleEditTask}>
        {/* Title */}
        <input
          type="text"
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg outline-none transition-all duration-300"
          placeholder="Task title..."
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />

        {/* Priority & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg outline-none w-full transition-all duration-300"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg outline-none w-full transition-all duration-300"
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
          placeholder="Task details..."
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg outline-none w-full h-[15vh] resize-none transition-all duration-300"
        ></textarea>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
          <button
            type="submit"
            className="w-full font-semibold bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="w-full font-semibold bg-gray-500 hover:bg-gray-600 py-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => {
              setEditTaskDiv("hidden");
              setEditTaskId(null);
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            className="w-full font-semibold bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleDeleteTask}
          >
            Delete Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
