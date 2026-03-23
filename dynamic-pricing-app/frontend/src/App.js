import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    Number_of_Riders: 50,
    Number_of_Drivers: 25,
    Number_of_Past_Rides: 30,
    Average_Ratings: 4.5,
    Historical_Cost_of_Ride: 25,
    Customer_Loyalty_Status: "0",  // 0 for New Customer
    Expected_Ride_Duration: 30,
    Location_Category: "Urban",
    Time_of_Booking: "Evening",
    Vehicle_Type: "Economy"
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const preparePayload = () => {
    return {
      Number_of_Riders: Number(formData.Number_of_Riders),
      Number_of_Drivers: Number(formData.Number_of_Drivers),
      Number_of_Past_Rides: Number(formData.Number_of_Past_Rides),
      Average_Ratings: Number(formData.Average_Ratings),
      Historical_Cost_of_Ride: Number(formData.Historical_Cost_of_Ride),
      Customer_Loyalty_Status: Number(formData.Customer_Loyalty_Status),
      Expected_Ride_Duration: Number(formData.Expected_Ride_Duration),

      Location_Category_Rural: formData.Location_Category === "Rural" ? 1 : 0,
      Location_Category_Suburban: formData.Location_Category === "Suburban" ? 1 : 0,
      Location_Category_Urban: formData.Location_Category === "Urban" ? 1 : 0,

      Time_of_Booking_Morning: formData.Time_of_Booking === "Morning" ? 1 : 0,
      Time_of_Booking_Afternoon: formData.Time_of_Booking === "Afternoon" ? 1 : 0,
      Time_of_Booking_Evening: formData.Time_of_Booking === "Evening" ? 1 : 0,
      Time_of_Booking_Night: formData.Time_of_Booking === "Night" ? 1 : 0,

      Vehicle_Type_Economy: formData.Vehicle_Type === "Economy" ? 1 : 0,
      Vehicle_Type_Premium: formData.Vehicle_Type === "Premium" ? 1 : 0
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrice(null);

    try {
      const payload = preparePayload();
      const res = await axios.post("http://localhost:8000/predict", payload);
      setPrice(res.data.predicted_price);
    } catch (err) {
      setError("❌ Failed to fetch prediction. Make sure the backend server is running.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🚖 Dynamic Pricing Dashboard</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Number of Riders:</label>
          <input 
            className="input" 
            name="Number_of_Riders" 
            type="number" 
            value={formData.Number_of_Riders} 
            onChange={handleChange} 
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label>Number of Drivers:</label>
          <input 
            className="input" 
            name="Number_of_Drivers" 
            type="number" 
            value={formData.Number_of_Drivers} 
            onChange={handleChange} 
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label>Past Rides:</label>
          <input 
            className="input" 
            name="Number_of_Past_Rides" 
            type="number" 
            value={formData.Number_of_Past_Rides} 
            onChange={handleChange} 
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label>Average Rating:</label>
          <input 
            className="input" 
            name="Average_Ratings" 
            type="number" 
            step="0.1" 
            value={formData.Average_Ratings} 
            onChange={handleChange} 
            min="0" 
            max="5"
          />
        </div>
        
        <div className="input-group">
          <label>Previous Cost (₹):</label>
          <input 
            className="input" 
            name="Historical_Cost_of_Ride" 
            type="number" 
            step="0.01"
            value={formData.Historical_Cost_of_Ride} 
            onChange={handleChange} 
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label>Expected Duration (min):</label>
          <input 
            className="input" 
            name="Expected_Ride_Duration" 
            type="number" 
            value={formData.Expected_Ride_Duration} 
            onChange={handleChange} 
            min="1"
          />
        </div>

        {/* Dropdowns with labels */}
        <div className="input-group">
          <label>Location Category:</label>
          <select 
            className="input" 
            name="Location_Category" 
            value={formData.Location_Category} 
            onChange={handleChange}
          >
            <option value="Urban">Urban</option>
            <option value="Suburban">Suburban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div className="input-group">
          <label>Time of Booking:</label>
          <select 
            className="input" 
            name="Time_of_Booking" 
            value={formData.Time_of_Booking} 
            onChange={handleChange}
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div className="input-group">
          <label>Vehicle Type:</label>
          <select 
            className="input" 
            name="Vehicle_Type" 
            value={formData.Vehicle_Type} 
            onChange={handleChange}
          >
            <option value="Economy">Economy</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div className="input-group">
          <label>Customer Status:</label>
          <select 
            className="input" 
            name="Customer_Loyalty_Status" 
            value={formData.Customer_Loyalty_Status} 
            onChange={handleChange}
          >
            <option value="0">New Customer</option>
            <option value="1">Loyal Customer</option>
          </select>
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Predicting..." : "🔮 Predict Price"}
        </button>
      </form>

      
      {error && <p className="error">{error}</p>}

      {price && (
        <div className="result">
          💰 Predicted Price: ₹{typeof price === 'number' ? price.toFixed(2) : price}
        </div>
      )}
    </div>
  );
}

export default App;

