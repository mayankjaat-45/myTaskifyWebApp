import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TitleCard from "../components/TitleCard";
import YetToStart from "../components/YetToStart";
import InProgress from "../components/InProgress";
import Completed from "../components/Completed";

import EditTask from "../components/EditTask";
import API from "../api";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("hidden");
  const [editTaskDiv, setEditTaskDiv] = useState("hidden");
  const [editTaskId, setEditTaskId] = useState(null);

  const [tasks, setTasks] = useState({
    YetToStart: [],
    InProgress: [],
    Completed: [],
  });

  // ✅ Fetch tasks once on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await API.get("/api/user/userDetails", {
          withCredentials: true,
        });
        setTasks(res.data.tasks || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-50 shadow-md bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Tasks layout */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row gap-6">
        {/* Yet To Start */}
        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
          <TitleCard title={"🚀 Yet To Start"} />
          <div className="pt-4 space-y-3">
            <YetToStart
              task={tasks.YetToStart || []}
              setEditTaskId={setEditTaskId}
              setEditTaskDiv={setEditTaskDiv}
            />
          </div>
        </div>

        {/* In Progress */}
        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
          <TitleCard title={"⚡ In Progress"} />
          <div className="pt-4 space-y-3">
            <InProgress
              task={tasks.InProgress || []}
              setEditTaskId={setEditTaskId}
              setEditTaskDiv={setEditTaskDiv}
            />
          </div>
        </div>

        {/* Completed */}
        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
          <TitleCard title={"✅ Completed"} />
          <div className="pt-4 space-y-3">
            <Completed
              task={tasks.Completed || []}
              setEditTaskId={setEditTaskId}
              setEditTaskDiv={setEditTaskDiv}
            />
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {addTaskDiv === "block" && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className="animate-fadeInUp">
              <AddTask setAddTaskDiv={setAddTaskDiv} />
            </div>
          </div>
        </>
      )}

      {/* Edit Task Modal */}
      {editTaskDiv === "block" && editTaskId && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className="animate-fadeInUp">
              <EditTask
                editTaskId={editTaskId}
                setEditTaskDiv={setEditTaskDiv}
                setEditTaskId={setEditTaskId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
