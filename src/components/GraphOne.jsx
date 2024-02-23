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
  TimeScale, // Import TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns"; // Import the adapter
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
  TimeScale // Register TimeScale
);

const GraphOne = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SHOW);
        const sortedData = response.data.show.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        // console.log(sortedData); // Log the sorted data
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Prepare the data for the chart
  const chartData = {
    datasets: [
      {
        label: "Full Range",
        data: data.map((dat) => ({
          x: new Date(dat.date),
          y: dat.company,
        })), // Assuming 'company' holds the numeric value
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Current Full Range",
        data: data.map((dat) => ({
          x: new Date(dat.date),
          y: dat.fullRangeCurrent,
        })),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MM/dd/yyyy",
          displayFormats: {
            day: "MM/dd/yyyy",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Range",
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

export default GraphOne;
