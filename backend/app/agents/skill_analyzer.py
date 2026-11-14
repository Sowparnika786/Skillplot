from typing import Dict, Any, List
from .base import BaseAgent
from ..models import SkillItem, ProjectItem, AgentExecutionEvent
from ..data.careers import normalize_skill_id

class SkillAnalyzerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Skill Analyzer",
            role="Skill Verification & Competency Analyst",
            color="#38BDF8", # Sky Blue
            avatar="Radar",
            directive="Audit reported skills against empirical assessment and project evidence to detect confidence gaps and unverified assumptions."
        )

    def analyze(
        self,
        skills: List[SkillItem],
        projects: List[ProjectItem] = None
    ) -> Dict[str, Any]:
        projects = projects or []
        verified_skills = []
        unverified_skills = []
        overconfidence_risks = []
        strengths = []
        growth_edges = []

        for skill in skills:
            norm = normalize_skill_id(skill.name)
            is_verified = skill.verified
            # Check project evidence
            if not is_verified:
                for proj in projects:
                    if (proj.verifiedScore or 0) >= 80 and any(normalize_skill_id(t) == norm for t in proj.tech):
                        is_verified = True
                        break

            item_data = {
                "id": skill.id or norm,
                "name": skill.name,
                "proficiency": skill.proficiency,
                "confidence": skill.confidence,
                "verified": is_verified,
                "category": skill.category
            }

            if is_verified:
                verified_skills.append(item_data)
                if skill.proficiency >= 70:
                    strengths.append(item_data)
            else:
                unverified_skills.append(item_data)
                if skill.confidence - skill.proficiency >= 10:
                    overconfidence_risks.append(item_data)
                elif skill.proficiency >= 50:
                    growth_edges.append(item_data)

        summary = (
            f"Audited {len(skills)} skills: {len(verified_skills)} verified, "
            f"{len(unverified_skills)} self-reported, {len(overconfidence_risks)} verification gaps."
        )

        event = self.create_event(
            event_type="observation",
            summary=summary,
            details={
                "verifiedCount": len(verified_skills),
                "unverifiedCount": len(unverified_skills),
                "overconfidenceRisks": [s["name"] for s in overconfidence_risks]
            }
        )

        return {
            "agent": self.name,
            "status": "completed",
            "summary": summary,
            "verifiedSkills": verified_skills,
            "unverifiedSkills": unverified_skills,
            "overconfidenceRisks": overconfidence_risks,
            "strengths": strengths,
            "growthEdges": growth_edges,
            "event": event
        }
