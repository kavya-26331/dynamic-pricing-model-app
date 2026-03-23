from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Dynamic Pricing API")

# ✅ CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model ONCE (important for performance)
MODEL_PATH = "../model/random_forest_model.pkl"
model = joblib.load(MODEL_PATH)

# ✅ Input schema
class PricingInput(BaseModel):
    Number_of_Riders: int
    Number_of_Drivers: int
    Customer_Loyalty_Status: int
    Expected_Ride_Duration: int
    Location_Category_Rural: int
    Location_Category_Suburban: int
    Location_Category_Urban: int
    Time_of_Booking_Afternoon: int
    Time_of_Booking_Evening: int
    Time_of_Booking_Morning: int
    Time_of_Booking_Night: int
    Vehicle_Type_Economy: int
    Vehicle_Type_Premium: int


@app.get("/")
def read_root():
    return {"message": "Dynamic Pricing API is running"}


@app.post("/predict")
def predict_price(input_data: PricingInput):
    try:
        # ✅ Convert input
        input_dict = input_data.model_dump()

        input_dict = input_data.model_dump()

        # ONLY use model features (13 exact)
        data = pd.DataFrame([{
            "Expected_Ride_Duration": input_dict["Expected_Ride_Duration"],
            "Number_of_Drivers": input_dict["Number_of_Drivers"],
            "Number_of_Riders": input_dict["Number_of_Riders"],
            "Customer_Loyalty_Status": input_dict["Customer_Loyalty_Status"],

            "Vehicle_Type_Premium": input_dict["Vehicle_Type_Premium"],
            "Vehicle_Type_Economy": input_dict["Vehicle_Type_Economy"],

            "Location_Category_Urban": input_dict["Location_Category_Urban"],
            "Location_Category_Rural": input_dict["Location_Category_Rural"],
            "Location_Category_Suburban": input_dict["Location_Category_Suburban"],

            "Time_of_Booking_Evening": input_dict["Time_of_Booking_Evening"],
            "Time_of_Booking_Morning": input_dict["Time_of_Booking_Morning"],
            "Time_of_Booking_Night": input_dict["Time_of_Booking_Night"],
            "Time_of_Booking_Afternoon": input_dict["Time_of_Booking_Afternoon"],
        }])

        # Match exact model column order
        data = data.reindex(columns=model.feature_names_in_, fill_value=0)

        # ✅ Prediction
        prediction = model.predict(data)[0]

        return {"predicted_price": round(float(prediction), 2)}

    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))


# ✅ Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)