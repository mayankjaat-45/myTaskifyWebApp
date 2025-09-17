import React from "react";

const TaskCard = ({ item, onClick }) => {
  if (!item) return null;

  const priorityClasses =
    item.priority === "High"
      ? "bg-red-100 text-red-600 border border-red-200"
      : item.priority === "Medium"
      ? "bg-yellow-100 text-yellow-600 border border-yellow-200"
      : "bg-green-100 text-green-600 border border-green-200";

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-lg border border-zinc-200 hover:border-blue-400 transition-all duration-300 text-left group"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${priorityClasses}`}
        >
          {item.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">
        {item.description || "No description provided."}
      </p>
    </button>
  );
};

export default TaskCard;
