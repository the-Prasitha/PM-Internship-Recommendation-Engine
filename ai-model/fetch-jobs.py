import pandas as pd

jobs = pd.read_csv("../dataset/job_postings.csv")
companies = pd.read_csv("../dataset/companies.csv")
skills = pd.read_csv("../dataset/job_skills.csv")

# merge jobs + company names
data = jobs.merge(companies, on="company_id", how="left")

# merge skills
skill_data = skills.groupby("job_id")["skill_abr"].apply(lambda x: " ".join(x)).reset_index()
data = data.merge(skill_data, on="job_id", how="left")

# company career pages
career_links = {
    "Google": "https://careers.google.com",
    "Microsoft": "https://careers.microsoft.com",
    "Amazon": "https://amazon.jobs",
    "Infosys": "https://careers.infosys.com",
    "IBM": "https://www.ibm.com/careers",
    "Deloitte": "https://jobs.deloitte.com",
    "Accenture": "https://careers.accenture.com",
    "TCS": "https://www.tcs.com/careers",
    "Wipro": "https://careers.wipro.com"
}

data["link"] = data["name"].map(career_links)

# default if company not in dictionary
data["link"] = data["link"].fillna("https://www.linkedin.com/jobs")

dataset = data[["title","name","skill_abr","link"]]

dataset.columns = ["title","company","skills","link"]

dataset.to_csv("../dataset/internship_dataset.csv", index=False)

print("Dataset with company links created!")