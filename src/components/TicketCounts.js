import React from "react";

const TicketCounts = ({ dayTicketCounts }) => {
  if (!dayTicketCounts || Object.keys(dayTicketCounts).length === 0) {
    return null; // Or return a loading indicator or message
  }

  return (
    <div className="ticket-counts">
      {Object.entries(dayTicketCounts).map(([day, count]) => (
        <div key={day} className="ticket-count">
          {count}
        </div>
      ))}
    </div>
  );
};

export default TicketCounts;
