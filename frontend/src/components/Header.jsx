import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full flex justify-between items-center p-4 md:px-8 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-800">Taskify</h1>
      <div className="flex gap-3">
        <button
          onClick={() => setAddTaskDiv("block")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center gap-1"
        >
          ➕ Add Task
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
