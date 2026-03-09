import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
data = pd.read_csv("../dataset/internships.csv")

# Convert skills into vectors
vectorizer = TfidfVectorizer()
skill_matrix = vectorizer.fit_transform(data["skills"])

def recommend_internship(user_skill):

    user_vector = vectorizer.transform([user_skill])

    similarity = cosine_similarity(user_vector, skill_matrix)

    top_index = similarity.argsort()[0][-3:][::-1]

    recommendations = data.iloc[top_index]["internship"]

    return recommendations

print("AI Internship Recommendation System")

user_skill = input("Enter your skill: ")

result = recommend_internship(user_skill)

print("Top Internship Recommendations:")
for r in result:
    print("-", r)