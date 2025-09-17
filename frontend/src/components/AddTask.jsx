import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

const AddTask = ({ setAddTaskDiv, refreshTasks }) => {
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
      const res = await API.post("/api/tasks/add", values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setAddTaskDiv("hidden");
        setValues({ title: "", description: "", priority: "Low", status: "YetToStart" });
        refreshTasks();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6 animate-fadeInUp">
      <h1 className="text-center font-bold text-2xl mb-4">➕ Add New Task</h1>
      <form className="flex flex-col gap-5" onSubmit={handleAddTask}>
        <input type="text" placeholder="Title" name="title" value={values.title} onChange={handleChange} required className="border p-2 rounded-lg" />
        <textarea placeholder="Description" name="description" value={values.description} onChange={handleChange} className="border p-2 rounded-lg"></textarea>
        <div className="flex gap-2">
          <select name="priority" value={values.priority} onChange={handleChange} className="border p-2 rounded-lg w-full">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select name="status" value={values.status} onChange={handleChange} className="border p-2 rounded-lg w-full">
            <option value="YetToStart">Yet To Start</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg">Add Task</button>
          <button type="button" className="bg-red-600 text-white w-full py-2 rounded-lg" onClick={() => setAddTaskDiv("hidden")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
