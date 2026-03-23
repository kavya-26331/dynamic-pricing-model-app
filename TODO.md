# Dynamic Pricing Model Feature Fix

Status: Implementing approved plan to match exact 13 model features.

## TODO Steps:

- [ ] 1. Edit backend/main.py (remove 3 unused fields from schema + predict func)
- [ ] 2. Edit frontend/src/App.js (remove 3 unused form inputs + payload)
- [ ] 3. Test backend API: cd dynamic-pricing-app/backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload
- [ ] 4. Test frontend: cd dynamic-pricing-app/frontend && npm start (http://localhost:3000)
- [ ] 5. Submit form → Verify predicted price (no crash)

Model features (13):
Expected_Ride_Duration, Number_of_Drivers, Number_of_Riders, Customer_Loyalty_Status,
Vehicle_Type_Premium/Economy, Location_Category_Urban/Rural/Suburban,
Time_of_Booking_Evening/Morning/Night/Afternoon

Removed: Number_of_Past_Rides, Average_Ratings, Historical_Cost_of_Ride
