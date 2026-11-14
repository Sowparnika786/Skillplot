from typing import Dict, Any, List
from datetime import datetime

from .agents.skill_analyzer import SkillAnalyzerAgent
from .agents.career_matching import CareerMatchingAgent
from .agents.assessment_evaluator import AssessmentEvaluatorAgent
from .agents.roadmap_planner import RoadmapPlannerAgent
from .agents.ai_mentor import AIMentorAgent

from .models import (
    LearnerProfile,
    AssessmentSubmission,
    AssessmentEvaluationResult,
    AdaptiveTask,
    AgentExecutionEvent,
    FullAuditResult
)

class MultiAgentOrchestrator:
    def __init__(self):
        self.skill_analyzer = SkillAnalyzerAgent()
        self.career_matcher = CareerMatchingAgent()
        self.assessment_evaluator = AssessmentEvaluatorAgent()
        self.roadmap_planner = RoadmapPlannerAgent()
        self.ai_mentor = AIMentorAgent()

        self.global_events_history: List[AgentExecutionEvent] = []

    def get_agents_status(self) -> List[Dict[str, Any]]:
        agents = [
            self.skill_analyzer,
            self.career_matcher,
            self.roadmap_planner,
            self.assessment_evaluator,
            self.ai_mentor
        ]
        return [a.get_profile() for a in agents]

    def get_events_history(self, limit: int = 50) -> List[Dict[str, Any]]:
        return [e.model_dump() for e in reversed(self.global_events_history[-limit:])]

    def _record_event(self, event: AgentExecutionEvent):
        self.global_events_history.append(event)

    async def evaluate_assessment_and_adapt(
        self,
        profile: LearnerProfile,
        submission: AssessmentSubmission
    ) -> AssessmentEvaluationResult:
        """
        Required Demo Scenario:
        1. Assessment Evaluator Agent evaluates score, detects weak topics.
        2. Roadmap Planner Agent mutates curriculum, injects revision lessons.
        3. AI Mentor Agent synthesizes explanation and delivers encouragement.
        4. Central orchestrator logs all events for the AI Agent Room.
        """
        events_batch: List[AgentExecutionEvent] = []

        # Step 1: Assessment Evaluator Agent
        eval_result = self.assessment_evaluator.evaluate(submission)
        self._record_event(eval_result["event"])
        events_batch.append(eval_result["event"])

        # Step 2: Roadmap Planner Agent
        roadmap_result = self.roadmap_planner.adapt_for_assessment(
            eval_result,
            completed_task_ids=profile.completedTaskIds
        )
        self._record_event(roadmap_result["event"])
        events_batch.append(roadmap_result["event"])

        # Step 3: AI Mentor Agent
        student_skills = [s.name for s in profile.skills] if profile.skills else []
        chosen_personality = getattr(submission, "personality", "genz") or "genz"
        mentor_result = await self.ai_mentor.generate_feedback(
            student_name=profile.name,
            target_career=profile.targetRole or "Full Stack Developer",
            quiz_title=submission.quizTitle,
            score=submission.score,
            band=eval_result["band"],
            weak_topics=eval_result["weakTopics"],
            injected_tasks=roadmap_result["injectedTasks"],
            skills=student_skills,
            personality=chosen_personality
        )
        self._record_event(mentor_result["event"])
        events_batch.append(mentor_result["event"])

        # Step 4: Orchestrator Consensus Event
        consensus_summary = (
            f"Multi-Agent Consensus Reached: Assessment Agent diagnosed {eval_result['bandStatus']}. "
            f"Roadmap Agent injected {len(roadmap_result['injectedTasks'])} adaptive tasks. "
            f"Mentor Agent delivered personalized guidance to {profile.name}."
        )
        consensus_event = AgentExecutionEvent(
            id=f"evt-{int(datetime.now().timestamp() * 1000)}-orch",
            timestamp=datetime.now().strftime("%I:%M %p"),
            agentName="Central Orchestrator",
            agentRole="Multi-Agent Coordinator",
            eventType="consensus",
            summary=consensus_summary,
            details={
                "quizTitle": submission.quizTitle,
                "score": submission.score,
                "injectedTasks": [t["title"] for t in roadmap_result["injectedTasks"]],
                "unlockedPhase": roadmap_result["unlockedPhase"]
            },
            llmUsed=mentor_result["isLlmPowered"],
            source=mentor_result["source"]
        )
        self._record_event(consensus_event)
        events_batch.append(consensus_event)

        adaptive_tasks_models = [
            AdaptiveTask(**t) for t in roadmap_result["injectedTasks"]
        ]

        return AssessmentEvaluationResult(
            score=submission.score,
            band=eval_result["band"],
            bandStatus=eval_result["bandStatus"],
            weakTopics=eval_result["weakTopics"],
            remediationRequired=eval_result["remediationRequired"],
            adaptiveTasks=adaptive_tasks_models,
            mentorHeadline=mentor_result["headline"],
            mentorMessage=mentor_result["message"],
            agentEvents=events_batch,
            unlockedPhase=roadmap_result["unlockedPhase"],
            isLlmPowered=mentor_result.get("isLlmPowered", False),
            provider=mentor_result.get("provider", "rule-based-fallback"),
            source=mentor_result.get("source", "rule-based-fallback")
        )

    async def run_full_audit(
        self,
        profile: LearnerProfile
    ) -> FullAuditResult:
        """
        Runs comprehensive multi-agent audit across all 5 agents:
        Skill Analyzer -> Career Matcher -> Roadmap Planner -> AI Mentor.
        """
        events_batch: List[AgentExecutionEvent] = []

        # 1. Skill Analyzer
        skill_analysis = self.skill_analyzer.analyze(
            skills=profile.skills,
            projects=profile.projects
        )
        self._record_event(skill_analysis["event"])
        events_batch.append(skill_analysis["event"])

        # 2. Career Matcher
        career_match = self.career_matcher.match(
            analyzed_skills=skill_analysis["verifiedSkills"] + skill_analysis["unverifiedSkills"],
            target_career_id=profile.targetCareerId
        )
        self._record_event(career_match["event"])
        events_batch.append(career_match["event"])

        # 3. Roadmap Planner strategic evaluation
        planning_summary = (
            f"Roadmap Strategy: Focus sprint allocated to critical gap '{career_match['topPriorityGap']}' "
            f"to optimize career trajectory for {career_match['targetCareer']}."
        )
        planner_event = self.roadmap_planner.create_event(
            event_type="decision",
            summary=planning_summary,
            details={
                "topPriorityGap": career_match["topPriorityGap"],
                "targetCareer": career_match["targetCareer"]
            }
        )
        self._record_event(planner_event)
        events_batch.append(planner_event)

        # 4. AI Mentor Strategic Coaching
        mentor_summary = (
            f"Strategic Note for {profile.name}: Your existing foundation gives a solid base. "
            f"Prioritizing {career_match['topPriorityGap']} will give the highest immediate gain in career readiness."
        )
        mentor_event = self.ai_mentor.create_event(
            event_type="consensus",
            summary=mentor_summary,
            details={"advice": mentor_summary}
        )
        self._record_event(mentor_event)
        events_batch.append(mentor_event)

        return FullAuditResult(
            timestamp=datetime.now().strftime("%I:%M %p"),
            learnerName=profile.name,
            targetCareer=career_match["targetCareer"],
            readinessScore=career_match["readinessScore"],
            skillAnalysis=skill_analysis,
            careerMatch=career_match,
            roadmapRecommendation={
                "topPriorityGap": career_match["topPriorityGap"],
                "summary": planning_summary
            },
            mentorGuidance={
                "headline": f"Strategic Path to {career_match['targetCareer']}",
                "message": mentor_summary
            },
            agentEvents=events_batch
        )

# Global orchestrator singleton instance
orchestrator = MultiAgentOrchestrator()
