from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# load dataset
data = pd.read_csv("../dataset/internship_dataset.csv")

@app.route("/predict", methods=["POST"])
def predict():

    skills = request.json.get("skills", "")
    user_skills = skills.lower().split()

    df = data.copy()

    scores = []

    for _, row in df.iterrows():

        job_text = (
            str(row.get("title", "")) + " " +
            str(row.get("skills", ""))
        ).lower()

        score = sum(skill in job_text for skill in user_skills)

        scores.append(score)

    df["score"] = scores

    df = df[df["score"] > 0]

    if df.empty:
        df = data.sample(min(5, len(data)))
    else:
        df = df.sort_values(by="score", ascending=False).head(5)

    results = []

    for _, row in df.iterrows():

        results.append({
            "title": row["title"],
            "company": row["company"],
            "link": row.get("link", "#")
        })

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)