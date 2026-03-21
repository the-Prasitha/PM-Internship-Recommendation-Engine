import pandas as pd

jobs = pd.read_csv("../dataset/job_postings.csv")
companies = pd.read_csv("../dataset/companies.csv")
skills = pd.read_csv("../dataset/job_skills.csv")

# merge jobs with companies
data = jobs.merge(companies, on="company_id", how="left")

# combine skills for each job
skill_data = skills.groupby("job_id")["skill_abr"].apply(lambda x: " ".join(x)).reset_index()

data = data.merge(skill_data, on="job_id", how="left")

# create company website link
data["link"] = "https://www." + data["name"].str.lower().str.replace(" ", "") + ".com"

dataset = data[["title","name","skill_abr","link"]]

dataset.columns = ["title","company","skills","link"]

dataset.to_csv("../dataset/internship_dataset.csv", index=False)

print("Kaggle dataset rebuilt successfully")