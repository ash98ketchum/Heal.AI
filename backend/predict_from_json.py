import json
import pandas as pd
import joblib

# Load trained model, label encoder, and feature list
model = joblib.load('logistic_regression_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')
features = joblib.load('model_features.pkl')

# Load user input from JSON
data = json.load(open('user_data.json', 'r'))
# Expecting a JSON structure with a "symptoms" list
present_symptoms = data.get('symptoms', [])

# Initialize input dict for model: set all features to 0
test_input = {feature: 0 for feature in features}

# Mark present symptoms with 1
for symptom in present_symptoms:
    if symptom in test_input:
        test_input[symptom] = 1
    else:
        print(f"Warning: Symptom '{symptom}' not recognized. Skipping.")

# Create DataFrame for prediction
user_df = pd.DataFrame([test_input])

# Run prediction
pred_idx = model.predict(user_df)[0]
predicted_disease = label_encoder.inverse_transform([pred_idx])[0]

# Save result
output = {'predicted_disease': predicted_disease}
json.dump(output, open('predicted.json', 'w'), indent=4)

print("Prediction saved to predicted.json")
