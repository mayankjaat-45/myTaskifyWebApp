import React from "react";

const TitleCard = ({ title }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-t-lg shadow drop-shadow select-none">
      <h2 className="text-center font-semibold text-lg tracking-wide">
        {title}
      </h2>
    </div>
  );
};

export default TitleCard;
