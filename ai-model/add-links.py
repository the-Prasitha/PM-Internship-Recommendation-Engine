import pandas as pd

df = pd.read_csv("../dataset/internship_dataset.csv")

df["link"] = "https://www.google.com/search?q=" + df["title"] + "+internship"

df.to_csv("../dataset/internship_dataset.csv", index=False)

print("Links added successfully!")