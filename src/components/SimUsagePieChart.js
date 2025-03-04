import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const SimUsagePieChart = () => {
  const [simUsageData, setSimUsageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Calculate sim usage
        const usage = calculateSimUsage(response.data.data);
        setSimUsageData(usage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to calculate the total usage of each simId
  const calculateSimUsage = (data) => {
    const simUsage = { simId0: 0, simId1: 0, simId2: 0 };

    data.forEach((item) => {
      if (item.simId === 0) simUsage.simId0++;
      else if (item.simId === 1) simUsage.simId1++;
      else if (item.simId === 2) simUsage.simId2++;
    });

    return simUsage;
  };

  // Prepare data for the Pie Chart
  const pieChartData = {
    labels: ["Sim 0", "Sim 1", "Sim 2"],
    datasets: [
      {
        label: "Sim Usage",
        data: [simUsageData.simId0, simUsageData.simId1, simUsageData.simId2],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Sim 0
          "rgba(153, 102, 255, 0.6)", // Sim 1
          "rgba(255, 159, 64, 0.6)", // Sim 2
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculate percentages for each sim (rounded to the nearest integer)
  const totalUsage =
    simUsageData.simId0 + simUsageData.simId1 + simUsageData.simId2;
  const percentages = [
    Math.round((simUsageData.simId0 / totalUsage) * 100) + "%", // Rounded to nearest integer
    Math.round((simUsageData.simId1 / totalUsage) * 100) + "%", // Rounded to nearest integer
    Math.round((simUsageData.simId2 / totalUsage) * 100) + "%", // Rounded to nearest integer
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ width: "400px" }}>
      <h1 style={{ textAlign: "center" }}>Sim Usage Distribution</h1>
      <Pie
        data={pieChartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value = context.raw || 0;
                  const percentage = percentages[context.dataIndex];
                  return `${label}: ${value} (${percentage})`;
                },
              },
            },
            datalabels: {
              display: true,
              color: "#fff", // White text color
              formatter: (value, context) => {
                return percentages[context.dataIndex]; // Display percentage
              },
              font: {
                weight: "bold", // Bold font
                size: 20, // Font size
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SimUsagePieChart;
