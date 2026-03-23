# Dynamic Pricing App 🚀

Built this to practice putting an ML model into production. Predicts optimal ride prices like Uber does, using real supply/demand data.

## What it does

React form where you input riders/drivers, location, time, vehicle type etc. → sends to FastAPI → loads RandomForest model → returns predicted ₹ price.

Demo: http://localhost:3000 (after setup)

## Tech

- Frontend: React (hooks, axios)
- Backend: FastAPI + uvicorn
- ML: scikit-learn RandomForest + joblib/pandas

## Setup (2 terminals)

**Backend:**

```
cd dynamic-pricing-app/backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**

```
cd dynamic-pricing-app/frontend
npm i
npm start
```

Test API: curl -X POST http://localhost:8000/predict -d '{"Number_of_Riders":50,"Number_of_Drivers":25,...}' or just use the UI.

## The ML part (coolest bit)

Model expects exactly 13 features - had to match column order perfectly with pandas.reindex(). Features:

- Expected_Ride_Duration, Number_of_Drivers, Number_of_Riders, Customer_Loyalty_Status
- One-hots: Vehicle_Type (Economy/Premium), Location (Urban/Rural/Suburban), Time (Morning/Night/etc)

Currently fixing frontend payload to drop extra fields.

See TODO.md for status.

## Challenges

- Feature name matching (model.feature*names_in*)
- CORS setup for React
- One-hot encoding in JS before API call

## Skills shown

Full-stack + ML deployment. Can build/train/deploy models, APIs, UIs. Ready for production tweaks.

Hit me up if interested! [LinkedIn/GitHub/etc]

---

Live demo ready - just run the commands above.
