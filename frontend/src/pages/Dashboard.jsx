import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import TitleCard from "../components/TitleCard";
import YetToStart from "../components/YetToStart";
import InProgress from "../components/InProgress";
import Completed from "../components/Completed";
import API from "../api.js";

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

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/user/userDetails");
      setTasks(
        res.data.tasks || { YetToStart: [], InProgress: [], Completed: [] }
      );
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
      else console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-50 shadow-md bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} fetchTasks={fetchTasks} />
      </div>

      {/* Tasks */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
          <TitleCard title={"🚀 Yet To Start"} />
          <div className="pt-4 space-y-3">
            <YetToStart
              task={tasks.YetToStart}
              onTaskClick={(id) => {
                setEditTaskId(id);
                setEditTaskDiv("block");
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
          <TitleCard title={"⚡ In Progress"} />
          <div className="pt-4 space-y-3">
            <InProgress
              task={tasks.InProgress}
              onTaskClick={(id) => {
                setEditTaskId(id);
                setEditTaskDiv("block");
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
          <TitleCard title={"✅ Completed"} />
          <div className="pt-4 space-y-3">
            <Completed
              task={tasks.Completed}
              onTaskClick={(id) => {
                setEditTaskId(id);
                setEditTaskDiv("block");
              }}
            />
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {addTaskDiv === "block" && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <AddTask
              setAddTaskDiv={setAddTaskDiv}
              fetchTasks={fetchTasks} // 🔄 auto-refresh
            />
          </div>
        </>
      )}

      {/* Edit Task Modal */}
      {editTaskDiv === "block" && editTaskId && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <EditTask
              editTaskId={editTaskId}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
              fetchTasks={fetchTasks} // 🔄 auto-refresh
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
