import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const GraphThree = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SHOW);
        const sortedData = response.data.show.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Prepare the data for the chart, focusing on batteryLevel
  const chartData = {
    datasets: [
      {
        label: "Degradation Miles",
        data: data.map((dat) => ({
          x: new Date(dat.date), // Use Date object directly for x-axis
          y: dat.degradationMiles * -1, // Use batteryLevel for y-axis
        })),
        borderColor: "rgb(54, 162, 235)", // Example color
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Example color with some transparency
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows control over the aspect ratio
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MM/dd/yyyy",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true, // Starts the y-axis from 0
        title: {
          display: true,
          text: "Miles",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {/* Remove inline styles and let Bootstrap's grid manage the size */}
          <div className="chart-container">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphThree;
