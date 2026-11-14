from typing import Dict, Any, List
from .base import BaseAgent
from ..models import AdaptiveTask
import time

class RoadmapPlannerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Roadmap Planner",
            role="Dynamic Curriculum Architect",
            color="#10B981", # Emerald Green
            avatar="Compass",
            directive="Dynamically re-architect learning milestones in response to diagnostic scores, injecting remedial lessons for misconceptions and unlocking advanced sprints upon mastery."
        )

    def adapt_for_assessment(
        self,
        evaluation: Dict[str, Any],
        completed_task_ids: List[str] = None
    ) -> Dict[str, Any]:
        completed_task_ids = set(completed_task_ids or [])
        band = evaluation["band"]
        quiz_id = evaluation["quizId"]
        skill_id = evaluation["skillId"]
        weak_topics = evaluation["weakTopics"]

        injected_tasks: List[AdaptiveTask] = []
        unlocked_phase = None
        ts = int(time.time() * 1000)

        if band == "remediation":
            t1 = weak_topics[0] if len(weak_topics) > 0 else "Core Fundamentals"
            t2 = weak_topics[1] if len(weak_topics) > 1 else "Mental Models"

            injected_tasks.append(
                AdaptiveTask(
                    id=f"adapt-rem-{skill_id}-{ts}-1",
                    title=f"Beginner Revision Lesson: {t1} First Principles",
                    points=40,
                    isAdaptive=True,
                    adaptiveType="Beginner Revision",
                    targetQuizId=quiz_id
                )
            )
            injected_tasks.append(
                AdaptiveTask(
                    id=f"adapt-rem-{skill_id}-{ts}-2",
                    title=f"Remedial Practice Lab: {t2} Interactive Sandbox",
                    points=50,
                    isAdaptive=True,
                    adaptiveType="Remedial Practice",
                    targetQuizId=quiz_id
                )
            )
            planning_reason = (
                f"Curriculum mutated: Injected 2 foundational revision lessons into Phase 1 to address "
                f"misconceptions in {', '.join(weak_topics)} before progressing to advanced modules."
            )

        elif band == "reinforcement":
            t1 = weak_topics[0] if len(weak_topics) > 0 else "Edge Cases & Optimization"
            injected_tasks.append(
                AdaptiveTask(
                    id=f"adapt-reinf-{skill_id}-{ts}-1",
                    title=f"Targeted Practice: {t1} Code Review & Drills",
                    points=60,
                    isAdaptive=True,
                    adaptiveType="Targeted Practice",
                    targetQuizId=quiz_id
                )
            )
            injected_tasks.append(
                AdaptiveTask(
                    id=f"adapt-reinf-{skill_id}-{ts}-2",
                    title=f"Reassessment Challenge: {evaluation['quizTitle']}",
                    points=75,
                    isAdaptive=True,
                    adaptiveType="Reassessment",
                    targetQuizId=quiz_id
                )
            )
            planning_reason = (
                f"Curriculum mutated: Injected targeted practice drills and reassessment challenge "
                f"to reinforce {t1}."
            )

        else: # passed
            if skill_id == "javascript":
                unlocked_phase = "Phase 2: React 19 Ecosystem & Component Architecture"
            elif skill_id == "react":
                unlocked_phase = "Phase 3: Node.js & Microservices"
            elif skill_id == "sql":
                unlocked_phase = "Phase 2: Business Intelligence Dashboards"
            else:
                unlocked_phase = "Next Advanced Phase"

            planning_reason = (
                f"Curriculum accelerated: Verified mastery on {evaluation['quizTitle']}. "
                f"Unlocked {unlocked_phase}."
            )

        event = self.create_event(
            event_type="action",
            summary=planning_reason,
            details={
                "injectedTasksCount": len(injected_tasks),
                "injectedTaskTitles": [t.title for t in injected_tasks],
                "unlockedPhase": unlocked_phase,
                "band": band
            }
        )

        return {
            "agent": self.name,
            "status": "completed",
            "injectedTasks": [t.model_dump() for t in injected_tasks],
            "unlockedPhase": unlocked_phase,
            "planningReason": planning_reason,
            "event": event
        }
