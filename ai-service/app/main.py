from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
import joblib
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy Sentiment Model (In production, load a pre-trained model)
vectorizer = CountVectorizer()
sentiment_model = LogisticRegression()
# Sample training data
texts = ["great leader", "bad politician", "neutral performance", "excellent work", "disappointing results"]
labels = [1, 0, 0, 1, 0] # 1: positive, 0: negative/neutral
X = vectorizer.fit_transform(texts)
sentiment_model.fit(X, labels)

class ReviewRequest(BaseModel):
    text: str

class PredictionRequest(BaseModel):
    votes: int
    surveys: float
    sentiment: float
    experience: int
    promises_fulfilled: int

@app.get("/")
def read_root():
    return {"message": "Politics Around AI Service"}

@app.post("/analyze-sentiment")
def analyze_sentiment(request: ReviewRequest):
    X_new = vectorizer.transform([request.text])
    prediction = sentiment_model.predict(X_new)[0]
    score = sentiment_model.predict_proba(X_new)[0][1]
    return {"sentiment": "positive" if prediction == 1 else "negative", "score": float(score)}

@app.post("/predict-election")
def predict_election(request: PredictionRequest):
    # Simple logistic regression for demonstration
    # In reality, this would be trained on historical data
    # Probability = sigmoid(w1*votes + w2*surveys + w3*sentiment + w4*experience + w5*promises)
    # Just a mock formula for now:
    prob = (request.votes/100000 * 0.4) + (request.surveys/5 * 0.2) + (request.sentiment * 0.2) + (request.experience/20 * 0.1) + (request.promises_fulfilled/10 * 0.1)
    prob = min(max(prob, 0.0), 1.0)
    return {"win_probability": prob}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
