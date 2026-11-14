import asyncio
import pytest
from backend.app.models import LearnerProfile, SkillItem, AssessmentSubmission
from backend.app.orchestrator import MultiAgentOrchestrator

def test_demo_scenario_alex_rivera_low_js_score():
    """
    REQUIRED DEMO SCENARIO:
    1. Alex Rivera is targeting Full Stack Developer.
    2. He receives a low JavaScript assessment score (35%).
    3. The Assessment Agent identifies weak topics.
    4. The Roadmap Agent adds relevant revision lessons.
    5. The Mentor Agent explains why the roadmap changed and gives supportive feedback.
    6. The AI Agent Room displays the actual sequence of agent decisions.
    """
    orchestrator = MultiAgentOrchestrator()

    alex_profile = LearnerProfile(
        name="Alex Rivera",
        targetCareerId="fullstack",
        targetRole="Full Stack Developer",
        skills=[
            SkillItem(name="Python", proficiency=85, confidence=90, verified=True),
            SkillItem(name="SQL", proficiency=72, confidence=78, verified=True),
            SkillItem(name="Basic HTML", proficiency=45, confidence=55, verified=False)
        ],
        completedTaskIds=["fs-t101"]
    )

    js_low_submission = AssessmentSubmission(
        quizId="quiz-js",
        quizTitle="JavaScript Core & Asynchronous Runtime Diagnostic",
        skillId="javascript",
        score=35,
        isDevFixture=True,
        weakTopicsOverride=["Event Loop & Microtasks", "Promises & Async Concurrency"]
    )

    result = asyncio.run(orchestrator.evaluate_assessment_and_adapt(
        profile=alex_profile,
        submission=js_low_submission
    ))

    # 1. Assessment Agent Output Verification
    assert result.score == 35
    assert result.band == "remediation"
    assert result.remediationRequired is True
    assert "Event Loop & Microtasks" in result.weakTopics
    assert "Promises & Async Concurrency" in result.weakTopics

    # 2. Roadmap Agent Output Verification
    assert len(result.adaptiveTasks) == 2
    task1 = result.adaptiveTasks[0]
    task2 = result.adaptiveTasks[1]
    assert "Event Loop & Microtasks" in task1.title
    assert task1.adaptiveType == "Beginner Revision"
    assert "Remedial Practice" in task2.adaptiveType

    # 3. Mentor Agent Output Verification
    assert "Foundational Revision Added" in result.mentorHeadline
    assert "Score: 35%" in result.mentorMessage
    assert "Event Loop & Microtasks" in result.mentorMessage

    # 4. Agent Room Sequence of Events Verification
    agent_names = [e.agentName for e in result.agentEvents]
    assert "Assessment Evaluator" in agent_names
    assert "Roadmap Planner" in agent_names
    assert "AI Mentor" in agent_names
    assert "Central Orchestrator" in agent_names

    # Check global events history
    history = orchestrator.get_events_history()
    assert len(history) >= 4
    assert any("35%" in e["summary"] for e in history)
    assert any("Injected 2" in e["summary"] for e in history)

def test_high_score_passed_scenario():
    """Test passing score (85%) elevates credentials and unlocks phase."""
    orchestrator = MultiAgentOrchestrator()
    alex_profile = LearnerProfile(name="Alex Rivera", targetCareerId="fullstack")
    submission = AssessmentSubmission(
        quizId="quiz-js",
        quizTitle="JavaScript Core Diagnostic",
        skillId="javascript",
        score=85
    )
    result = asyncio.run(orchestrator.evaluate_assessment_and_adapt(alex_profile, submission))
    assert result.band == "passed"
    assert result.unlockedPhase is not None
    assert "Phase 2" in result.unlockedPhase
