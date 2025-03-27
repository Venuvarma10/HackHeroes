import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_absolute_error, accuracy_score


data = {
    'project_name': [
        'Solar Plant A', 'Wind Farm B', 'Hydro Project C', 'Geothermal D', 'BioEnergy E',
        'Solar Plant F', 'Wind Farm G', 'Hydro Project H', 'Geothermal I', 'BioEnergy J',
        'Solar Plant K', 'Wind Farm L', 'Hydro Project M', 'Geothermal N', 'BioEnergy O',
        'Solar Plant P', 'Wind Farm Q', 'Hydro Project R', 'Geothermal S', 'BioEnergy T'
    ],
    'location': [
        'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
        'Indore', 'Bhopal', 'Visakhapatnam', 'Surat', 'Patna',
        'Chandigarh', 'Nagpur', 'Coimbatore', 'Thiruvananthapuram', 'Vadodara'
    ],
    'category': [
        'Solar', 'Wind', 'Hydro', 'Geothermal', 'BioEnergy',
        'Solar', 'Wind', 'Hydro', 'Geothermal', 'BioEnergy',
        'Solar', 'Wind', 'Hydro', 'Geothermal', 'BioEnergy',
        'Solar', 'Wind', 'Hydro', 'Geothermal', 'BioEnergy'
    ],
    'initial_capital': [
        500000, 750000, 600000, 800000, 550000,
        520000, 770000, 620000, 850000, 580000,
        530000, 780000, 630000, 860000, 590000,
        540000, 790000, 640000, 870000, 600000
    ],
    'risk_factor': [
        2, 3, 1, 4, 3,
        2, 3, 1, 4, 3,
        1, 2, 1, 5, 2,
        2, 4, 1, 3, 3
    ],
    'esg_score': [
        85, 78, 90, 74, 80,
        87, 79, 92, 76, 82,
        89, 81, 94, 73, 83,
        86, 77, 91, 75, 79
    ],
    'priority': [
        1, 2, 1, 3, 2,
        1, 2, 1, 3, 2,
        1, 2, 1, 3, 2,
        1, 2, 1, 3, 2
    ],
    'actual_capital': [
        520000, 770000, 620000, 850000, 580000,
        530000, 780000, 630000, 860000, 590000,
        540000, 790000, 640000, 870000, 600000,
        550000, 800000, 650000, 880000, 610000
    ]
}

df = pd.DataFrame(data)

# Encoding categorical features
label_encoders = {}
categorical_cols = ['location', 'category']

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Features and Target Variables
X = df[['location', 'category', 'initial_capital']]
y_risk = df['risk_factor']
y_esg = df['esg_score']
y_priority = df['priority']
y_actual_capital = df['actual_capital']

# Splitting Data
X_train, X_test, y_risk_train, y_risk_test = train_test_split(X, y_risk, test_size=0.2, random_state=42)
X_train, X_test, y_esg_train, y_esg_test = train_test_split(X, y_esg, test_size=0.2, random_state=42)
X_train, X_test, y_priority_train, y_priority_test = train_test_split(X, y_priority, test_size=0.2, random_state=42)
X_train, X_test, y_capital_train, y_capital_test = train_test_split(X, y_actual_capital, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Model Training
risk_model = LogisticRegression()
risk_model.fit(X_train, y_risk_train)
y_risk_pred = risk_model.predict(X_test)
# print("Risk Factor Accuracy:", accuracy_score(y_risk_test, y_risk_pred))

esg_model = RandomForestRegressor()
esg_model.fit(X_train, y_esg_train)
y_esg_pred = esg_model.predict(X_test)
# print("ESG Score MAE:", mean_absolute_error(y_esg_test, y_esg_pred))

priority_model = LogisticRegression()
priority_model.fit(X_train, y_priority_train)
y_priority_pred = priority_model.predict(X_test)
# print("Priority Accuracy:", accuracy_score(y_priority_test, y_priority_pred))

capital_model = RandomForestRegressor()
capital_model.fit(X_train, y_capital_train)
y_capital_pred = capital_model.predict(X_test)
# print("Actual Capital MAE:", mean_absolute_error(y_capital_test, y_capital_pred))

# Function to Predict New Project

def predict_project(location, category, initial_capital):
    location_encoded = label_encoders['location'].transform([location])[0]
    category_encoded = label_encoders['category'].transform([category])[0]
    features = np.array([[location_encoded, category_encoded, initial_capital]])

    risk_prediction = risk_model.predict(features)[0]
    esg_prediction = esg_model.predict(features)[0]
    priority_prediction = priority_model.predict(features)[0]
    capital_prediction = capital_model.predict(features)[0]

    print(f"Predicted Risk Factor: {risk_prediction}")
    print(f"Predicted ESG Score: {esg_prediction:.2f}")
    print(f"Predicted Priority: {priority_prediction}")
    print(f"Predicted Actual Capital: {capital_prediction:.2f}")

# Example Prediction
predict_project('Bangalore', 'Solar', 700000)
