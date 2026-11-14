from typing import Dict, Any, List
from .base import BaseAgent
from ..models import AssessmentSubmission

class AssessmentEvaluatorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Assessment Evaluator",
            role="Diagnostic Grading & Weakness Interpreter",
            color="#F43F5E", # Rose Red
            avatar="Terminal",
            directive="Evaluate actual submitted answers, detect core conceptual misconceptions, categorize score bands, and instruct the curriculum planner to adapt."
        )

    def evaluate(
        self,
        submission: AssessmentSubmission
    ) -> Dict[str, Any]:
        score = submission.score
        quiz_title = submission.quizTitle
        skill_id = submission.skillId or "javascript"

        # Determine band
        if score < 50:
            band = "remediation"
            band_status = "Needs Remediation (< 50%)"
            remediation_required = True
            is_passed = False
            action_instructed = "Inject foundational beginner revision lessons & remedial labs"
        elif score < 80:
            band = "reinforcement"
            band_status = "Needs Practice (50% – 79%)"
            remediation_required = False
            is_passed = False
            action_instructed = "Inject targeted coding drills & reassessment challenge"
        else:
            band = "passed"
            band_status = "Verified & Passed (≥ 80%)"
            remediation_required = False
            is_passed = True
            action_instructed = "Mark skill as Verified & unlock next learning phase"

        # Weak topics extraction
        weak_topics = submission.weakTopicsOverride or []
        if not weak_topics:
            if "javascript" in quiz_title.lower() or "js" in quiz_title.lower():
                if score < 50:
                    weak_topics = ["Event Loop & Microtasks", "Promises & Async Concurrency"]
                elif score < 80:
                    weak_topics = ["Closures & Lexical Scope"]
            elif "react" in quiz_title.lower():
                if score < 50:
                    weak_topics = ["Hooks Rules & Fiber Architecture", "useEffect & Stale Closures"]
                elif score < 80:
                    weak_topics = ["Reconciliation & Keys"]
            elif "sql" in quiz_title.lower():
                if score < 50:
                    weak_topics = ["Window Functions", "Index Execution Plans"]
                elif score < 80:
                    weak_topics = ["CTEs & Subqueries"]
            elif "python" in quiz_title.lower():
                if score < 50:
                    weak_topics = ["Asyncio Event Loop", "Memory & Dict Implementation"]
                elif score < 80:
                    weak_topics = ["Generators & Iterables"]

        summary = (
            f"Evaluated {quiz_title}: Score {score}%. Band: {band_status}. "
            f"Weak topics identified: {', '.join(weak_topics) if weak_topics else 'None'}. "
            f"Instruction: {action_instructed}."
        )

        event = self.create_event(
            event_type="decision",
            summary=summary,
            details={
                "quizTitle": quiz_title,
                "score": score,
                "band": band,
                "weakTopics": weak_topics,
                "remediationRequired": remediation_required,
                "isPassed": is_passed,
                "actionInstructed": action_instructed,
                "isDevFixture": submission.isDevFixture
            }
        )

        return {
            "agent": self.name,
            "status": "completed",
            "quizId": submission.quizId,
            "quizTitle": quiz_title,
            "skillId": skill_id,
            "score": score,
            "band": band,
            "bandStatus": band_status,
            "weakTopics": weak_topics,
            "remediationRequired": remediation_required,
            "isPassed": is_passed,
            "actionInstructed": action_instructed,
            "summary": summary,
            "event": event
        }
