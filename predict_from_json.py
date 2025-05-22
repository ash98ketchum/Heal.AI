
import json
import pandas as pd
import joblib

# Load trained model, label encoder, and feature list
model = joblib.load('logistic_regression_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')
features = joblib.load('model_features.pkl')

# Load user input (symptoms with value 1 only)
with open('user_data.json', 'r') as f:
    present_symptoms = json.load(f)

# Initialize all symptoms to 0
user_input = {feature: 0 for feature in features}

# Set listed symptoms to 1
for symptom in present_symptoms:
    if symptom in user_input:
        user_input[symptom] = 1
    else:
        print(f"Warning: Symptom '{symptom}' not recognized and will be ignored.")

# Convert to DataFrame
user_df = pd.DataFrame([user_input])

# Predict
predicted_class_index = model.predict(user_df)[0]
predicted_disease = label_encoder.inverse_transform([predicted_class_index])[0]

# Save prediction to JSON
with open('predicted.json', 'w') as f:
    json.dump({'predicted_disease': predicted_disease}, f, indent=4)

print("Prediction saved to predicted.json")
