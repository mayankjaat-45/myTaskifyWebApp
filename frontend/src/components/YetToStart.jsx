import React from "react";
import TaskCard from "./TaskCard";

const YetToStart = ({ task }) => {
  if (!task || task.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 italic border border-dashed border-gray-300 rounded-lg">
        📝 No Tasks Yet To Start
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">Yet To Start</h2>
      {task.map((item, idx) =>
        item ? <TaskCard key={idx} item={item} /> : null
      )}
    </div>
  );
};

export default YetToStart;
