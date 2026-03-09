import joblib

model = joblib.load("internship_model.pkl")

skills = input("Enter skills: ")

prediction = model.predict([skills])

print("Recommended Role:", prediction[0])