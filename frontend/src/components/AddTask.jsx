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
      fetchTasks(); // 🔄 refresh tasks
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[90%] md:w-[40%] bg-white shadow-xl rounded-2xl p-6">
      <form onSubmit={handleAddTask}>
        {/* Title */}
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />
        {/* Priority & Status */}
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
        {/* Description */}
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Add Task</button>
        <button type="button" onClick={() => setAddTaskDiv("hidden")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTask;
