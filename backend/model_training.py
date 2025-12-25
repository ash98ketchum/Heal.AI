#############################################################################

# IT IS IMPORTANT TO NOTE THAT THIS CODE MUST NOT BE RUN AS THE MODEL IS ALREADY TRAINED
# AND THE FILES ARE ALREADY GENERATED. THIS CODE IS FOR REFERENCE PURPOSES ONLY.

#############################################################################

import os
import numpy as np
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')
matplotlib.use('Agg')  # Avoid GUI backend

# Load dataset
df = pd.read_csv("Final_Augmented_dataset_Diseases_and_Symptoms.csv")

# Fill missing values with 0
df = df.fillna(0)

# Separate features and target
X = df.drop('diseases', axis=1)
y = df['diseases']

# Fit LabelEncoder on entire target to prevent unseen label errors
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.3, random_state=42)

# Train Logistic Regression model
logreg = LogisticRegression(max_iter=1000)
logreg.fit(X_train, y_train)

# Predict on test set
y_pred = logreg.predict(X_test)

# Evaluation
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
accuracy = accuracy_score(y_test, y_pred)
print(f"\nAccuracy of Logistic Regression: {accuracy:.4f}")

# Save model, label encoder, and features
joblib.dump(logreg, 'logistic_regression_model.pkl')
joblib.dump(le, 'label_encoder.pkl')
joblib.dump(list(X.columns), 'model_features.pkl')

print("Model and related files saved successfully.")
