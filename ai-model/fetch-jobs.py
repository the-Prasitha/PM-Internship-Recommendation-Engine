import requests
import pandas as pd

url = "https://remotive.com/api/remote-jobs"

response = requests.get(url)

data = response.json()

jobs = []

for job in data["jobs"][:50]:

    jobs.append({
        "title": job["title"],
        "company": job["company_name"],
        "role": job["category"],
        "skills": "software development"
    })

df = pd.DataFrame(jobs)

print(df.head())

df.to_csv("../dataset/real_internships.csv", index=False)

print("Real job dataset saved!")