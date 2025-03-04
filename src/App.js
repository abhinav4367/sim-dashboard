import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SideMenu from "./components/SideMenu";
import NavBar from "./components/NavBar";
import BottomBar from "./components/BottomBar";
import SimUsagePieChart from "./components/SimUsagePieChart";
import TicketCounts from "./components/TicketCounts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://projectteho.com/api/sim-data"
        );
        console.log("API Response:", response.data);

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("API response is not in the expected format");
        }

        const transformedData = transformData(response.data.data);
        setData(transformedData);

        const availableWeeks = Object.keys(transformedData);
        console.log("Available Weeks:", availableWeeks);
        setWeeks(availableWeeks);
        setSelectedWeek(availableWeeks[0]);
        console.log("Selected Week:", availableWeeks[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transformData = (apiData) => {
    const groupedData = {};

    apiData.forEach((item) => {
      const entryDate = new Date(item.entrytime);
      const weekNumber = getWeekNumber(entryDate);
      const dayOfWeek = entryDate.getDay();

      if (!groupedData[`Week ${weekNumber}`]) {
        groupedData[`Week ${weekNumber}`] = {};
      }
      if (!groupedData[`Week ${weekNumber}`][dayOfWeek]) {
        groupedData[`Week ${weekNumber}`][dayOfWeek] = {
          simId0: 0,
          simId1: 0,
          simId2: 0,
        };
      }

      groupedData[`Week ${weekNumber}`][dayOfWeek][`simId${item.simId}`]++;
    });

    return groupedData;
  };

  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const prepareChartData = (selectedWeek) => {
    if (!data || !selectedWeek) return null;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const datasets = [
      { label: "simId0", data: [], backgroundColor: "rgba(75, 192, 192, 0.6)" },
      {
        label: "simId1",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      { label: "simId2", data: [], backgroundColor: "rgba(255, 159, 64, 0.6)" },
    ];

    const labels = [];
    let totalTicketsForWeek = 0;
    const dayTicketCounts = {};
    const dayDates = [];

    const weekNumber = parseInt(selectedWeek.split(" ")[1]);
    const year = new Date().getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7 - firstDayOfYear.getDay();

    for (let day = 0; day < 7; day++) {
      const counts = data[selectedWeek][day] || {
        simId0: 0,
        simId1: 0,
        simId2: 0,
      };
      datasets[0].data.push(counts.simId0);
      datasets[1].data.push(counts.simId1);
      datasets[2].data.push(counts.simId2);

      const currentDate = new Date(year, 0, 1 + daysOffset + day);
      dayDates.push(currentDate.toLocaleDateString());

      const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
        "en-US",
        { month: "short" }
      )}, ${days[day]}`;

      labels.push(formattedDate);

      const dailyTotal = counts.simId0 + counts.simId1 + counts.simId2;
      dayTicketCounts[formattedDate] = dailyTotal;
      totalTicketsForWeek += dailyTotal;
      dayDates.push(formattedDate);
    }

    return { labels, datasets, totalTicketsForWeek, dayTicketCounts, dayDates };
  };

  const handleWeekChange = (direction) => {
    const currentIndex = weeks.indexOf(selectedWeek);
    if (direction === "prev" && currentIndex > 0) {
      setSelectedWeek(weeks[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < weeks.length - 1) {
      setSelectedWeek(weeks[currentIndex + 1]);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const chartData = prepareChartData(selectedWeek);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isPrevDisabled = weeks.indexOf(selectedWeek) === 0;
  const isNextDisabled = weeks.indexOf(selectedWeek) === weeks.length - 1;

  return (
    <div className="app-container">
      <NavBar />
      <div className="sidemenu-container">
        <SideMenu />
      </div>
      <div className="piechart-container">
        <SimUsagePieChart />
      </div>
      <div className="content-wrapper">
        {" "}
        {/* Added content-wrapper */}
        <div className="main-content-container">
          <div className="title-container">
            <h1>Operational Dashboard</h1>
          </div>
          <div className="week-navigation-container">
            <button
              className={`chart-navigation-arrow left ${
                isPrevDisabled ? "disabled" : ""
              }`}
              onClick={() => !isPrevDisabled && handleWeekChange("prev")}
              disabled={isPrevDisabled}
            >
              &lt;
            </button>
            <div className="week-selector-container">
              <select
                id="week-select"
                value={selectedWeek || ""}
                onChange={handleDropdownChange}
              >
                {weeks.map((week) => (
                  <option key={week} value={week}>
                    {week}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={`chart-navigation-arrow right ${
                isNextDisabled ? "disabled" : ""
              }`}
              onClick={() => !isNextDisabled && handleWeekChange("next")}
              disabled={isNextDisabled}
            >
              &gt;
            </button>
          </div>
          <div className="chart-container">
            {chartData && (
              <>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      datalabels: {
                        display: false,
                      },
                    },
                    scales: {
                      x: { stacked: false },
                      y: { stacked: false, max: 20, beginAtZero: true },
                    },
                  }}
                />
                <TicketCounts
                  dayTicketCounts={chartData.dayTicketCounts}
                  dayDates={chartData.dayDates}
                />
              </>
            )}
          </div>
          <div className="bottombar-container">
            {chartData && (
              <BottomBar totalTicketsForWeek={chartData.totalTicketsForWeek} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
