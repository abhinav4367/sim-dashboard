import React from "react";

const BottomBar = ({ totalTicketsForWeek }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "center",
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        width: "40%", // ✅ Adjust this value (e.g., 50%, 300px, etc.)
        margin: "20px auto", // ✅ Center it horizontally
      }}
    >
      Total Tickets for this Week: {totalTicketsForWeek}
    </div>
  );
};

export default BottomBar;
