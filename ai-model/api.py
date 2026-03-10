from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load ML model
model = joblib.load("internship_model.pkl")

# Load dataset
data = pd.read_csv("../dataset/real_internships.csv")


# Map predicted roles to dataset roles
def map_role(predicted_role):

    predicted_role = predicted_role.lower()

    if "frontend" in predicted_role:
        return "Software Development"

    if "full stack" in predicted_role:
        return "Software Development"

    if "backend" in predicted_role:
        return "Software Development"

    if "machine learning" in predicted_role:
        return "AI / ML"

    if "ai" in predicted_role:
        return "AI / ML"

    if "data" in predicted_role:
        return "AI / ML"

    if "design" in predicted_role:
        return "Design"

    return "Software Development"


@app.route("/predict", methods=["POST"])
def predict():

    skills = request.json["skills"]

    # Predict role using ML model
    predicted_role = model.predict([skills])[0]

    print("Predicted Role:", predicted_role)

    # Map to dataset category
    mapped_role = map_role(predicted_role)

    print("Mapped Role:", mapped_role)

    # Filter dataset
    matches = data[data["role"].str.contains(mapped_role, case=False, na=False)]

    # fallback if nothing found
    if matches.empty:
        matches = data.sample(5)

    results = []

    for _, row in matches.head(5).iterrows():

        results.append({
            "title": row["title"],
            "company": row["company"]
        })

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)