from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

url = "https://internshala.com/internships/web-development-internship/"

driver.get(url)

time.sleep(5)

cards = driver.find_elements(By.CLASS_NAME, "individual_internship")

print("Found cards:", len(cards))

internships = []

for card in cards:

    try:

        title = card.find_element(By.CLASS_NAME, "profile").text
        company = card.find_element(By.CLASS_NAME, "company_name").text

        internships.append({
            "title": title,
            "company": company,
            "skills": "html css javascript",
            "role": "Frontend Developer"
        })

    except:
        pass

driver.quit()

df = pd.DataFrame(internships)

print(df.head())

df.to_csv("../dataset/real_internships.csv", index=False)

print("Dataset saved successfully!")