from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SkillItem(BaseModel):
    id: Optional[str] = None
    name: str
    category: Optional[str] = "General"
    proficiency: int = Field(default=0, ge=0, le=100)
    confidence: int = Field(default=50, ge=0, le=100)
    verified: bool = False
    status: Optional[str] = None

class ProjectItem(BaseModel):
    id: Optional[str] = None
    title: str
    tech: List[str] = Field(default_factory=list)
    verifiedScore: Optional[int] = 0

class LearnerProfile(BaseModel):
    name: str = "Alex Rivera"
    targetCareerId: str = "fullstack"
    targetRole: Optional[str] = "Full Stack Developer"
    weeklyStudyHours: Optional[int] = 18
    skills: List[SkillItem] = Field(default_factory=list)
    projects: List[ProjectItem] = Field(default_factory=list)
    completedTaskIds: List[str] = Field(default_factory=list)
    unlockedPhaseIds: List[str] = Field(default_factory=list)

class AssessmentSubmission(BaseModel):
    quizId: str
    quizTitle: str
    skillId: Optional[str] = None
    score: int = Field(ge=0, le=100)
    selectedAnswers: Dict[str, int] = Field(default_factory=dict)
    weakTopicsOverride: Optional[List[str]] = None
    isDevFixture: bool = False
    personality: Optional[str] = "genz"

class AgentExecutionEvent(BaseModel):
    id: str
    timestamp: str
    agentName: str
    agentRole: str
    eventType: str # "decision", "action", "observation", "consensus"
    summary: str
    details: Dict[str, Any] = Field(default_factory=dict)
    llmUsed: bool = False
    source: str = "rule-based-fallback" # "llm" or "rule-based-fallback"

class AdaptiveTask(BaseModel):
    id: str
    title: str
    points: int = 50
    isAdaptive: bool = True
    adaptiveType: str
    targetQuizId: Optional[str] = None

class AssessmentEvaluationResult(BaseModel):
    score: int
    band: str # "remediation" | "reinforcement" | "passed"
    bandStatus: str
    weakTopics: List[str] = Field(default_factory=list)
    remediationRequired: bool
    adaptiveTasks: List[AdaptiveTask] = Field(default_factory=list)
    mentorHeadline: str
    mentorMessage: str
    agentEvents: List[AgentExecutionEvent] = Field(default_factory=list)
    unlockedPhase: Optional[str] = None
    isLlmPowered: bool = False
    provider: str = "rule-based-fallback"
    source: str = "rule-based-fallback"

class FullAuditResult(BaseModel):
    timestamp: str
    learnerName: str
    targetCareer: str
    readinessScore: int
    skillAnalysis: Dict[str, Any]
    careerMatch: Dict[str, Any]
    roadmapRecommendation: Dict[str, Any]
    mentorGuidance: Dict[str, Any]
    agentEvents: List[AgentExecutionEvent] = Field(default_factory=list)
