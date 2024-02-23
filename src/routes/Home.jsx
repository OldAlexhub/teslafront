import React, { useState } from "react";
import axios from "axios";
import GIF from "../images/tesla2.gif";
import GraphOne from "../components/GraphOne";
import GraphTwo from "../components/GraphTwo";
import GraphThree from "../components/GraphThree";
import GraphFour from "../components/GraphFour";

const Home = () => {
  const [currentPercentage, setCurrentPercentage] = useState("");
  const [currentRange, setCurrentRange] = useState("");
  const [fullRangeCurrent, setFullRangeCurrent] = useState(null);
  const [degradationMiles, setDegradationMiles] = useState(null);
  const [degradationPercentage, setDegradationPercentage] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const fullRangeManufacturer = 358; // Assuming this is a constant value

  const calculate = async (e) => {
    e.preventDefault();
    const percentage = parseFloat(currentPercentage);
    const range = parseFloat(currentRange);
    if (!isNaN(percentage) && !isNaN(range)) {
      const calculatedFullRangeCurrent = (range / percentage) * 100;
      const calculatedDegradationMiles =
        fullRangeManufacturer - calculatedFullRangeCurrent;
      const calculatedDegradationPercentage =
        (calculatedDegradationMiles / fullRangeManufacturer) * 100;
      const calculatedBatteryLevel = 100 - calculatedDegradationPercentage;

      setFullRangeCurrent(calculatedFullRangeCurrent.toFixed(2));
      setDegradationMiles(calculatedDegradationMiles.toFixed(2));
      setDegradationPercentage(calculatedDegradationPercentage.toFixed(2));
      setBatteryLevel(calculatedBatteryLevel.toFixed(2));

      try {
        await axios.post(process.env.REACT_APP_POST_URL, {
          fullRangeCurrent: calculatedFullRangeCurrent.toFixed(2),
          degradationPercentage: calculatedDegradationPercentage.toFixed(2),
          batteryLevel: calculatedBatteryLevel.toFixed(2),
          degradationMiles: calculatedDegradationMiles.toFixed(2),
        });
        setFeedback({ message: "Data saved successfully!", type: "success" });
      } catch (error) {
        console.error("Error posting data", error);
        setFeedback({ message: "Failed to save data.", type: "error" });
      }
    } else {
      setFeedback({
        message: "Please enter valid numbers for both fields.",
        type: "error",
      });
    }
  };

  return (
    <div className="container">
      {/* Form Row */}
      {feedback.message && (
        <div
          className={`alert ${
            feedback.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}
      <div className="row mb-3">
        <div className="col-12">
          {/* This ensures the form takes full width on smaller screens */}
          <form onSubmit={calculate}>
            <div className="mb-3">
              <img
                src={GIF}
                alt="tesla"
                className="rounded mx-auto d-block w-25"
              />
              <input
                className="form-control"
                placeholder="current percentage"
                value={currentPercentage}
                onChange={(e) => setCurrentPercentage(e.target.value)}
                type="number"
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="current range"
                value={currentRange}
                onChange={(e) => setCurrentRange(e.target.value)}
                type="number"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Calculate
            </button>
          </form>
        </div>
      </div>

      {/* Results Row */}
      {fullRangeCurrent && (
        <div className="alert alert-info">
          <p>Battery Level: {batteryLevel}%</p>
          <p>Degradation Percentage: {degradationPercentage}%</p>
          <p>Estimated 100% Range: {fullRangeCurrent} miles</p>
          <p>Degradation in Miles: {degradationMiles} miles</p>
        </div>
      )}

      {/* Graphs Rows */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Full Range VS. Currect Full Range</h5>
              <GraphOne />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Current Battery Level</h5>
              <GraphTwo />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Degradation In Miles</h5>
              <GraphThree />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Degradation Percentage</h5>
              <GraphFour />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
