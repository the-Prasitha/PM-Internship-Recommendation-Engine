import pandas as pd

# Load dataset
df = pd.read_csv("../dataset/real_internships.csv")

print("Dataset loaded")
print(df.head())

def extract_skills(title):

    title = str(title).lower()

    if "frontend" in title or "react" in title:
        return "html css javascript react"

    elif "backend" in title:
        return "nodejs api backend"

    elif "ai" in title or "ml" in title:
        return "python machine learning"

    elif "data" in title:
        return "python pandas data analysis"

    elif "designer" in title:
        return "figma ui ux"

    elif "writer" in title:
        return "content writing seo"

    elif "devops" in title:
        return "docker kubernetes ci cd"

    else:
        return "software development"

# Update skills column
df["skills"] = df["title"].apply(extract_skills)

print("Updated dataset:")
print(df.head())

# Save dataset
df.to_csv("../dataset/real_internships.csv", index=False)

print("Dataset updated and saved!")