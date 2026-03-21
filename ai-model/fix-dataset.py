import pandas as pd

df = pd.read_csv("../dataset/real_internships.csv")

def generate_skills(title):

    title = title.lower()

    if "writer" in title:
        return "content writing blogging seo copywriting"

    if "ios" in title:
        return "swift ios mobile development"

    if "frontend" in title:
        return "html css javascript react"

    if "backend" in title:
        return "nodejs api database"

    if "data" in title:
        return "python data analysis pandas"

    if "ai" in title:
        return "python machine learning ai"

    if "crypto" in title:
        return "blockchain crypto trading"

    if "marketing" in title:
        return "marketing seo social media"

    return "general skills"

df["skills"] = df["title"].apply(generate_skills)

df.to_csv("../dataset/real_internships.csv", index=False)

print("Dataset updated!")