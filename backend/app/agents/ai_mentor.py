from typing import Dict, Any, List
from .base import BaseAgent
from ..llm_client import generate_mentor_explanation

class AIMentorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="AI Mentor",
            role="Pedagogical Coach & Socratic Explainer",
            color="#EC4899", # Pink
            avatar="Sparkles",
            directive="Provide empathetic, technically sound explanations for why curriculum adjustments occur, dispel imposter syndrome, and guide learners toward mastery."
        )

    async def generate_feedback(
        self,
        student_name: str,
        target_career: str,
        quiz_title: str,
        score: int,
        band: str,
        weak_topics: List[str],
        injected_tasks: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        llm_response = await generate_mentor_explanation(
            student_name=student_name,
            target_career=target_career,
            quiz_title=quiz_title,
            score=score,
            band=band,
            weak_topics=weak_topics,
            injected_tasks=injected_tasks
        )

        headline = llm_response["headline"]
        message = llm_response["message"]
        is_llm = llm_response.get("is_llm_powered", False)
        source = llm_response.get("source", "rule-based-fallback")
        provider = llm_response.get("provider", "deterministic-rules-engine")

        summary = f"Delivered guidance: '{headline}'. Source: {source} ({provider})."

        event = self.create_event(
            event_type="consensus",
            summary=summary,
            details={
                "headline": headline,
                "message": message,
                "isLlmPowered": is_llm,
                "provider": provider,
                "score": score
            },
            llm_used=is_llm,
            source=source
        )

        return {
            "agent": self.name,
            "status": "completed",
            "headline": headline,
            "message": message,
            "isLlmPowered": is_llm,
            "provider": provider,
            "source": source,
            "event": event
        }
