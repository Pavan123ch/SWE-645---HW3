from fastapi import FastAPI
from pydantic import BaseModel
from database import conn, cursor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Survey(BaseModel):
    firstName: str
    lastName: str
    email: str
    city: str

@app.post("/surveys")
def create_survey(survey: Survey):
    cursor.execute(
        "INSERT INTO surveys (firstName, lastName, email, city) VALUES (?, ?, ?, ?)",
        (survey.firstName, survey.lastName, survey.email, survey.city)
    )
    conn.commit()
    return {"message": "Saved to DB"}

@app.get("/surveys")
def get_surveys():
    cursor.execute("SELECT * FROM surveys")
    rows = cursor.fetchall()

    return [
        {
            "id": r[0],
            "firstName": r[1],
            "lastName": r[2],
            "email": r[3],
            "city": r[4]
        }
        for r in rows
    ]
