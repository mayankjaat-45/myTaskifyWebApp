import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import TaskCard from "../components/TaskCard";
import API from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [addTaskDiv, setAddTaskDiv] = useState("hidden");
  const [editTaskDiv, setEditTaskDiv] = useState("hidden");
  const [editTaskId, setEditTaskId] = useState(null);

  const [tasks, setTasks] = useState({
    YetToStart: [],
    InProgress: [],
    Completed: [],
  });

  const fetchUserDetails = async () => {
    try {
      const res = await API.get("/api/user/userDetails", {
        withCredentials: true,
      });
      setTasks(
        res.data.tasks || { YetToStart: [], InProgress: [], Completed: [] }
      );
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else console.error(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="sticky top-0 z-50 shadow-md bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row gap-6">
        {["YetToStart", "InProgress", "Completed"].map((status) => (
          <div
            key={status}
            className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="font-bold text-lg mb-4">
              {status === "YetToStart"
                ? "🚀 Yet To Start"
                : status === "InProgress"
                ? "⚡ In Progress"
                : "✅ Completed"}
            </h2>
            <div className="space-y-3">
              {tasks[status]?.map((task) => (
                <TaskCard
                  key={task._id}
                  item={task}
                  onClick={() => {
                    setEditTaskId(task._id);
                    setEditTaskDiv("block");
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {addTaskDiv === "block" && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <AddTask
              setAddTaskDiv={setAddTaskDiv}
              fetchTasks={fetchUserDetails}
            />
          </div>
        </>
      )}

      {editTaskDiv === "block" && editTaskId && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <EditTask
              editTaskId={editTaskId}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
              fetchTasks={fetchUserDetails}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
