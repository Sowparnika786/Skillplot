import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_api_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["agentsCount"] == 5
    assert "llm" in data

def test_api_get_agents():
    response = client.get("/api/agents")
    assert response.status_code == 200
    data = response.json()
    assert len(data["agents"]) == 5
    names = [a["name"] for a in data["agents"]]
    assert "Skill Analyzer" in names
    assert "Career Matcher" in names
    assert "Assessment Evaluator" in names
    assert "Roadmap Planner" in names
    assert "AI Mentor" in names

def test_api_evaluate_assessment():
    payload = {
        "profile": {
            "name": "Alex Rivera",
            "targetCareerId": "fullstack",
            "targetRole": "Full Stack Developer",
            "skills": [
                {"name": "Python", "proficiency": 85, "verified": True},
                {"name": "SQL", "proficiency": 72, "verified": True}
            ],
            "completedTaskIds": ["fs-t101"]
        },
        "submission": {
            "quizId": "quiz-js",
            "quizTitle": "JavaScript Core Diagnostic",
            "skillId": "javascript",
            "score": 35,
            "isDevFixture": True,
            "weakTopicsOverride": ["Event Loop & Microtasks", "Promises & Async Concurrency"]
        }
    }
    response = client.post("/api/orchestrator/assessment", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 35
    assert data["band"] == "remediation"
    assert len(data["adaptiveTasks"]) == 2
    assert len(data["agentEvents"]) == 4

def test_api_get_events():
    response = client.get("/api/orchestrator/events")
    assert response.status_code == 200
    data = response.json()
    assert "events" in data
    assert len(data["events"]) > 0

def test_api_run_audit():
    profile = {
        "name": "Alex Rivera",
        "targetCareerId": "fullstack",
        "skills": [
            {"name": "Python", "proficiency": 85, "verified": True},
            {"name": "SQL", "proficiency": 72, "verified": True},
            {"name": "Basic HTML", "proficiency": 45, "verified": False}
        ]
    }
    response = client.post("/api/orchestrator/audit", json=profile)
    assert response.status_code == 200
    data = response.json()
    assert data["readinessScore"] == 30
    assert "agentEvents" in data
