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

  useEffect(() => {
    if (!editTaskId) return;
    API.get(`/api/tasks/get/${editTaskId}`).then((res) =>
      setValues(res.data.task)
    );
  }, [editTaskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    await API.put(`/api/tasks/edit/${editTaskId}`, values);
    setEditTaskDiv("hidden");
    setEditTaskId(null);
    fetchTasks();
  };

  const handleDeleteTask = async () => {
    if (window.confirm("Delete this task?")) {
      await API.delete(`/api/tasks/delete/${editTaskId}`);
      setEditTaskDiv("hidden");
      setEditTaskId(null);
      fetchTasks();
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6">
      <form onSubmit={handleEditTask}>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />
        <select name="priority" value={values.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="status" value={values.status} onChange={handleChange}>
          <option value="YetToStart">Yet To Start</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Save Changes</button>
        <button
          type="button"
          onClick={() => {
            setEditTaskDiv("hidden");
            setEditTaskId(null);
          }}
        >
          Cancel
        </button>
        <button type="button" onClick={handleDeleteTask}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditTask;
