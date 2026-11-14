from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from .config import get_llm_status, HOST, PORT
from .models import (
    LearnerProfile,
    AssessmentSubmission,
    AssessmentEvaluationResult,
    FullAuditResult
)
from .orchestrator import orchestrator
from .llm_client import generate_mentor_explanation, generate_mentor_chat

app = FastAPI(
    title="SkillPilot AI — Multi-Agent Intelligence Backend",
    version="2.0.0",
    description="Python FastAPI backend orchestrating 5 specialized AI agents for dynamic career pathing."
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AssessmentRequest(BaseModel):
    profile: LearnerProfile
    submission: AssessmentSubmission

class MentorChatRequest(BaseModel):
    message: str
    studentName: str = "Alex Rivera"
    targetCareer: str = "Full Stack Developer"
    skills: Optional[List[str]] = None
    personality: Optional[str] = "genz"
    context: Optional[Dict[str, Any]] = None

@app.get("/")
@app.get("/api")
@app.get("/api/health")
async def health_check():
    llm_info = get_llm_status()
    agents = orchestrator.get_agents_status()
    return {
        "status": "healthy",
        "service": "SkillPilot AI Multi-Agent Backend",
        "llm": llm_info,
        "agentsCount": len(agents),
        "agents": agents
    }

@app.get("/api/agents")
async def get_agents():
    return {
        "agents": orchestrator.get_agents_status()
    }

@app.get("/api/orchestrator/events")
async def get_orchestrator_events(limit: int = 50):
    return {
        "events": orchestrator.get_events_history(limit=limit)
    }

@app.post("/api/orchestrator/assessment", response_model=AssessmentEvaluationResult)
async def evaluate_assessment(payload: AssessmentRequest):
    try:
        result = await orchestrator.evaluate_assessment_and_adapt(
            profile=payload.profile,
            submission=payload.submission
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assessment evaluation failed: {str(e)}")

@app.post("/api/orchestrator/audit", response_model=FullAuditResult)
async def run_profile_audit(profile: LearnerProfile):
    try:
        result = await orchestrator.run_full_audit(profile=profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Profile audit failed: {str(e)}")

@app.post("/api/agents/mentor/chat")
async def mentor_chat(payload: MentorChatRequest):
    try:
        feedback = await generate_mentor_chat(
            message=payload.message,
            student_name=payload.studentName,
            target_career=payload.targetCareer,
            skills=payload.skills or [],
            personality=payload.personality or "genz"
        )
        return feedback
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Mentor chat failed: {str(e)}")
