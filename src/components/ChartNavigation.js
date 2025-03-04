import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChartNavigation = ({ onWeekChange, selectedWeek, totalWeeks }) => {
  return (
    <div className="relative w-full">
      {/* Left Button (Moved Outside) */}
      <button
        onClick={() => onWeekChange("prev")}
        disabled={selectedWeek === 1}
        className="absolute top-2 left-52 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="text-gray-700 text-2xl" />
      </button>

      {/* Right Button (Moved Outside) */}
      <button
        onClick={() => onWeekChange("next")}
        disabled={selectedWeek === totalWeeks}
        className="absolute top-2 right-52 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="text-gray-700 text-2xl" />
      </button>
    </div>
  );
};

export default ChartNavigation;
