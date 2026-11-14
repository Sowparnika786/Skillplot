import pytest
from backend.app.models import SkillItem, ProjectItem, AssessmentSubmission
from backend.app.agents.skill_analyzer import SkillAnalyzerAgent
from backend.app.agents.career_matching import CareerMatchingAgent
from backend.app.agents.assessment_evaluator import AssessmentEvaluatorAgent
from backend.app.agents.roadmap_planner import RoadmapPlannerAgent
from backend.app.agents.ai_mentor import AIMentorAgent

def test_skill_analyzer_agent():
    agent = SkillAnalyzerAgent()
    skills = [
        SkillItem(name="Python", proficiency=85, confidence=90, verified=True),
        SkillItem(name="SQL", proficiency=72, confidence=78, verified=True),
        SkillItem(name="Basic HTML", proficiency=45, confidence=65, verified=False)
    ]
    result = agent.analyze(skills)
    assert result["agent"] == "Skill Analyzer"
    assert len(result["verifiedSkills"]) == 2
    assert len(result["unverifiedSkills"]) == 1
    # HTML has 65 confidence vs 45 proficiency -> overconfidence risk
    assert len(result["overconfidenceRisks"]) == 1
    assert result["overconfidenceRisks"][0]["name"] == "Basic HTML"
    assert result["event"].agentName == "Skill Analyzer"

def test_career_matching_agent():
    agent = CareerMatchingAgent()
    skills = [
        {"name": "Python", "proficiency": 85, "verified": True},
        {"name": "SQL", "proficiency": 72, "verified": True},
        {"name": "Basic HTML", "proficiency": 45, "verified": False}
    ]
    result = agent.match(skills, target_career_id="fullstack")
    assert result["agent"] == "Career Matcher"
    assert result["targetCareer"] == "Full Stack Developer"
    assert result["readinessScore"] == 30
    missing_names = [m["name"] for m in result["missingSkills"]]
    assert any("JavaScript" in n for n in missing_names)
    assert any("React" in n for n in missing_names)
    assert any("Node" in n for n in missing_names)

def test_assessment_evaluator_agent_remediation():
    agent = AssessmentEvaluatorAgent()
    submission = AssessmentSubmission(
        quizId="quiz-js",
        quizTitle="JavaScript Core Diagnostic",
        score=35,
        isDevFixture=True
    )
    result = agent.evaluate(submission)
    assert result["band"] == "remediation"
    assert result["remediationRequired"] is True
    assert "Event Loop & Microtasks" in result["weakTopics"]

def test_roadmap_planner_agent_injections():
    agent = RoadmapPlannerAgent()
    evaluation = {
        "band": "remediation",
        "quizId": "quiz-js",
        "skillId": "javascript",
        "quizTitle": "JavaScript Core Diagnostic",
        "weakTopics": ["Event Loop & Microtasks", "Promises & Async Concurrency"]
    }
    result = agent.adapt_for_assessment(evaluation)
    assert len(result["injectedTasks"]) == 2
    assert "Beginner Revision" in result["injectedTasks"][0]["adaptiveType"]
    assert "Remedial Practice" in result["injectedTasks"][1]["adaptiveType"]

import asyncio

def test_ai_mentor_agent():
    agent = AIMentorAgent()
    result = asyncio.run(agent.generate_feedback(
        student_name="Alex Rivera",
        target_career="Full Stack Developer",
        quiz_title="JavaScript Core Diagnostic",
        score=35,
        band="remediation",
        weak_topics=["Event Loop & Microtasks"],
        injected_tasks=[{"title": "Beginner Revision: Event Loop"}]
    ))
    assert "Foundational Revision Added" in result["headline"]
    assert "Score: 35%" in result["message"]
    assert result["event"].eventType == "consensus"
