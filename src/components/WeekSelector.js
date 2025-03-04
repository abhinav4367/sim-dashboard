import React from "react";

const WeekSelector = ({ selectedWeek, weeksData, onWeekChange }) => {
  const weekKeys =
    weeksData && typeof weeksData === "object" ? Object.keys(weeksData) : [];

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      {weekKeys.length > 0 && (
        <select
          id="weekSelector"
          value={selectedWeek}
          onChange={(e) => onWeekChange(Number(e.target.value))}
          className="p-2 border rounded"
          style={{ padding: "12px", width: "192px", fontSize: "18px" }} // Adjusted inline styles
        >
          {weekKeys.map((week) => (
            <option key={week} value={week}>
              Week {week}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default WeekSelector;
