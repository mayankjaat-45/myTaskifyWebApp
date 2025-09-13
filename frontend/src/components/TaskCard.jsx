import React from "react";

const TaskCard = ({ item }) => {
  const showEditDiv = (e, id) => {
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  };

  if (!item) return null; // ✅ safeguard

  return (
    <button
      className="bg-white rounded-xl p-4 w-full shadow-sm hover:shadow-lg 
                 transition-all duration-300 text-left border border-zinc-200 
                 hover:border-blue-400 group"
      onClick={(event) => showEditDiv(event, item._id)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg group-hover:text-blue-700 transition-colors">
          {item.title}
        </h1>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            item.priority === "High"
              ? "bg-red-100 text-red-600 border border-red-200"
              : item.priority === "Medium"
              ? "bg-yellow-100 text-yellow-600 border border-yellow-200"
              : "bg-green-100 text-green-600 border border-green-200"
          }`}
        >
          {item.priority}
        </span>
      </div>

      {/* Divider */}
      <hr className="my-3 border-zinc-200" />

      {/* Description */}
      <p className="text-sm text-zinc-600 line-clamp-3">
        {item.description || "No description provided."}
      </p>
    </button>
  );
};

export default TaskCard;
