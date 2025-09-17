import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

const EditTask = ({
  editTaskId,
  setEditTaskDiv,
  setEditTaskId,
  refreshTasks,
}) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "YetToStart",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/api/tasks/get/${editTaskId}`, {
          withCredentials: true,
        });
        setValues(res.data.task || res.data);
      } catch (error) {
        toast.error("Failed to load task");
      }
    };
    if (editTaskId) fetchTask();
  }, [editTaskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/api/tasks/edit/${editTaskId}`, values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setEditTaskDiv("hidden");
        setEditTaskId(null);
        refreshTasks();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      const res = await API.delete(`/api/tasks/delete/${editTaskId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setEditTaskDiv("hidden");
        setEditTaskId(null);
        refreshTasks();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6 animate-fadeInUp">
      <h1 className="text-center font-bold text-2xl mb-4">✏️ Edit Task</h1>
      <form className="flex flex-col gap-5" onSubmit={handleEditTask}>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded-lg"
          required
        />
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded-lg"
        ></textarea>
        <div className="flex gap-2">
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          >
            <option value="YetToStart">Yet To Start</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white w-full py-2 rounded-lg"
            onClick={() => {
              setEditTaskDiv("hidden");
              setEditTaskId(null);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-600 text-white w-full py-2 rounded-lg"
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
