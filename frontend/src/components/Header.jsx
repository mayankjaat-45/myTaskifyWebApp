import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
        { withCredentials: true }
      );
      toast.success(res.data?.message);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white tracking-wide cursor-pointer">
        Taskify
      </h1>

      {/* Actions */}
      <div className="flex gap-6 items-center">
        <button
          onClick={() => setAddTaskDiv("block")}
          className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition-all duration-300"
        >
          + Add Task
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-white text-lg hover:text-red-400 transition-all duration-300"
        >
          <IoLogOutOutline size={22} />
          <span className="hidden sm:inline font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
