import React from "react";
import TaskCard from "./TaskCard";

const InProgress = ({ task, onTaskClick }) => {
  if (!task || task.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 italic border border-dashed border-gray-300 rounded-lg">
        ⏳ No Tasks In Progress
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {task.map((item) =>
        item ? (
          <TaskCard
            key={item._id}
            item={item}
            onClick={() => onTaskClick(item._id)}
          />
        ) : null
      )}
    </div>
  );
};

export default InProgress;
