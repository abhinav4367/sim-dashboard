import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import WeekSelector from "./WeekSelector";
import ChartNavigation from "./ChartNavigation";
import TicketCounts from "./TicketCounts"; // ✅ Import TicketCounts Component
import BottomBar from "./BottomBar"; // ✅ Import BottomBar Component

const SimulatorChart = () => {
  const [chartData, setChartData] = useState(null);
  const [ticketCounts, setTicketCounts] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [totalTicketsForWeek, setTotalTicketsForWeek] = useState(0); // Add state for total tickets for the week

  // Updated sample data in the desired format
  const weeksData = {
    1: [
      {
        id: 1,
        entrytime: "2025-02-15T13:55:39.938055",
        simId: 0,
        timelapsed: 253808,
        remoteUpload: 5,
        createdAt: "2025-02-15T08:27:48.856000",
      },
      {
        id: 2,
        entrytime: "2025-02-15T13:55:39.938055",
        simId: 1,
        timelapsed: 123456,
        remoteUpload: 8,
        createdAt: "2025-02-15T08:30:00.123000",
      },
      {
        id: 3,
        entrytime: "2025-02-15T13:55:39.938055",
        simId: 2,
        timelapsed: 789012,
        remoteUpload: 12,
        createdAt: "2025-02-15T08:35:15.456000",
      },
      {
        id: 4,
        entrytime: "2025-02-16T13:55:39.938055",
        simId: 0,
        timelapsed: 345678,
        remoteUpload: 7,
        createdAt: "2025-02-16T08:27:48.856000",
      },
      {
        id: 5,
        entrytime: "2025-02-16T13:55:39.938055",
        simId: 1,
        timelapsed: 901234,
        remoteUpload: 10,
        createdAt: "2025-02-16T08:30:00.123000",
      },
      {
        id: 6,
        entrytime: "2025-02-16T13:55:39.938055",
        simId: 2,
        timelapsed: 567890,
        remoteUpload: 9,
        createdAt: "2025-02-16T08:35:15.456000",
      },
    ],
    2: [
      {
        id: 7,
        entrytime: "2025-02-22T13:55:39.938055",
        simId: 0,
        timelapsed: 111111,
        remoteUpload: 3,
        createdAt: "2025-02-22T08:27:48.856000",
      },
      {
        id: 8,
        entrytime: "2025-02-22T13:55:39.938055",
        simId: 1,
        timelapsed: 222222,
        remoteUpload: 5,
        createdAt: "2025-02-22T08:30:00.123000",
      },
      {
        id: 9,
        entrytime: "2025-02-22T13:55:39.938055",
        simId: 2,
        timelapsed: 333333,
        remoteUpload: 7,
        createdAt: "2025-02-22T08:35:15.456000",
      },
      {
        id: 10,
        entrytime: "2025-02-23T13:55:39.938055",
        simId: 0,
        timelapsed: 444444,
        remoteUpload: 6,
        createdAt: "2025-02-23T08:27:48.856000",
      },
      {
        id: 11,
        entrytime: "2025-02-23T13:55:39.938055",
        simId: 1,
        timelapsed: 555555,
        remoteUpload: 8,
        createdAt: "2025-02-23T08:30:00.123000",
      },
      {
        id: 12,
        entrytime: "2025-02-23T13:55:39.938055",
        simId: 2,
        timelapsed: 666666,
        remoteUpload: 10,
        createdAt: "2025-02-23T08:35:15.456000",
      },
    ],
  };

  useEffect(() => {
    const updateChartData = (weekData) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const ticketsByDay = { 0: [], 1: [], 2: [] };
      const totalTicketsPerDay = {};
      let totalTicketsForWeek = 0; // Initialize total tickets for the week

      daysOfWeek.forEach((day, index) => {
        const filteredData = weekData.filter(
          (entry) => new Date(entry.createdAt).getDay() === index
        );

        const simId0Tickets =
          filteredData
            .filter((entry) => entry.simId === 0)
            .map((entry) => entry.remoteUpload)[0] || 0;
        const simId1Tickets =
          filteredData
            .filter((entry) => entry.simId === 1)
            .map((entry) => entry.remoteUpload)[0] || 0;
        const simId2Tickets =
          filteredData
            .filter((entry) => entry.simId === 2)
            .map((entry) => entry.remoteUpload)[0] || 0;

        ticketsByDay[0].push(simId0Tickets);
        ticketsByDay[1].push(simId1Tickets);
        ticketsByDay[2].push(simId2Tickets);

        // Calculate total tickets per day
        totalTicketsPerDay[day] = simId0Tickets + simId1Tickets + simId2Tickets;

        // Sum total tickets for the week
        totalTicketsForWeek += totalTicketsPerDay[day];
      });

      setChartData({
        labels: daysOfWeek,
        datasets: [
          {
            label: "simId0",
            data: ticketsByDay[0],
            backgroundColor: "#007bff",
            borderColor: "#000",
            borderWidth: 1,
            barThickness: 30,
          },
          {
            label: "simId1",
            data: ticketsByDay[1],
            backgroundColor: "#28a745",
            borderColor: "#000",
            borderWidth: 1,
            barThickness: 30,
          },
          {
            label: "simId2",
            data: ticketsByDay[2],
            backgroundColor: "#ffc107",
            borderColor: "#000",
            borderWidth: 1,
            barThickness: 30,
          },
        ],
      });

      setTicketCounts(totalTicketsPerDay);

      // Set total tickets for the selected week
      setTotalTicketsForWeek(totalTicketsForWeek);
    };

    updateChartData(weeksData[selectedWeek]);
  }, [selectedWeek]);

  const handleWeekChange = (direction) => {
    if (direction === "prev" && selectedWeek > 1) {
      setSelectedWeek(selectedWeek - 1);
    } else if (
      direction === "next" &&
      selectedWeek < Object.keys(weeksData).length
    ) {
      setSelectedWeek(selectedWeek + 1);
    }
  };

  return (
    <div className="absolute top-20 left-2/3 transform -translate-x-1/2 w-full max-w-6xl">
      <div className="w-full max-w-4xl p-4 border rounded-lg shadow-lg">
        <WeekSelector
          selectedWeek={selectedWeek}
          weeksData={weeksData}
          onWeekChange={setSelectedWeek}
        />

        <div className="mt-8">
          <ChartNavigation
            onWeekChange={handleWeekChange}
            selectedWeek={selectedWeek}
            totalWeeks={Object.keys(weeksData).length}
          />
        </div>

        {/* ✅ Ensure Graph & TicketCounts are in a full-width container */}
        <div className="w-full flex flex-col items-center mt-0">
          <h2 className="text-xl font-bold mb-4">Simulator Dashboard</h2>
          {chartData ? (
            <>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    x: { stacked: false },
                    y: { beginAtZero: true },
                  },
                }}
              />

              {/* ✅ Display TicketCounts Below the Graph */}
              <TicketCounts ticketCounts={ticketCounts} />
            </>
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        {/* Add BottomBar to display total tickets */}
        <BottomBar totalTicketsForWeek={totalTicketsForWeek} />
      </div>
    </div>
  );
};

export default SimulatorChart;
