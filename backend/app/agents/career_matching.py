from typing import Dict, Any, List
from .base import BaseAgent
from ..data.careers import CAREER_REQUIREMENTS, normalize_skill_id

class CareerMatchingAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Career Matcher",
            role="Labor Market Alignment & Gap Specialist",
            color="#8B5CF6", # Purple
            avatar="Compass",
            directive="Calculate weighted readiness against real industry requirements, penalize unverified skills, and identify high-leverage missing capabilities."
        )

    def match(
        self,
        analyzed_skills: List[Dict[str, Any]],
        target_career_id: str = "fullstack"
    ) -> Dict[str, Any]:
        career = CAREER_REQUIREMENTS.get(target_career_id, CAREER_REQUIREMENTS["fullstack"])
        skill_map = {normalize_skill_id(s["name"]): s for s in analyzed_skills}

        total_weight = 0
        earned_weighted_score = 0.0
        strengths = []
        weaknesses = []
        missing_skills = []

        for req in career["requiredSkills"]:
            weight = req["weight"]
            min_prof = req["minProficiency"]
            total_weight += weight
            norm_id = normalize_skill_id(req["id"])

            user_skill = skill_map.get(norm_id)
            if not user_skill:
                missing_skills.append({
                    "id": req["id"],
                    "name": req["name"],
                    "minProficiency": min_prof,
                    "weight": weight,
                    "status": "Missing Skill"
                })
            else:
                # 0.75x penalty for unverified self-reported skills
                verification_factor = 1.0 if user_skill.get("verified", False) else 0.75
                effective_score = min(100.0, user_skill.get("proficiency", 0) * verification_factor)
                ratio = min(1.0, effective_score / min_prof)
                earned_weighted_score += ratio * weight

                match_item = {
                    "id": req["id"],
                    "name": req["name"],
                    "userProficiency": user_skill.get("proficiency", 0),
                    "isVerified": user_skill.get("verified", False),
                    "minProficiency": min_prof,
                    "weight": weight
                }

                if user_skill.get("proficiency", 0) >= min_prof:
                    match_item["status"] = "Strength"
                    strengths.append(match_item)
                else:
                    match_item["status"] = "Weakness"
                    weaknesses.append(match_item)

        readiness_score = round((earned_weighted_score / total_weight) * 100) if total_weight > 0 else 0

        # Transferable skills detection (skills user has with prof >= 65 not in requiredSkills)
        req_norm_ids = {normalize_skill_id(r["id"]) for r in career["requiredSkills"]}
        transferable = []
        for s in analyzed_skills:
            norm = normalize_skill_id(s["name"])
            if norm not in req_norm_ids and s.get("proficiency", 0) >= 65:
                transferable.append({
                    "name": s["name"],
                    "proficiency": s["proficiency"],
                    "reason": f"High proficiency ({s['proficiency']}%) provides cross-domain algorithmic fluency."
                })

        top_priority_gap = missing_skills[0]["name"] if missing_skills else (weaknesses[0]["name"] if weaknesses else None)

        summary = (
            f"Evaluated readiness for {career['title']}: {readiness_score}%. "
            f"Found {len(strengths)} strengths, {len(weaknesses)} weaknesses, "
            f"and {len(missing_skills)} missing skills. Top gap: {top_priority_gap}."
        )

        event = self.create_event(
            event_type="decision",
            summary=summary,
            details={
                "targetCareer": career["title"],
                "readinessScore": readiness_score,
                "topPriorityGap": top_priority_gap,
                "missingSkillsCount": len(missing_skills)
            }
        )

        return {
            "agent": self.name,
            "status": "completed",
            "targetCareer": career["title"],
            "targetCareerId": career["id"],
            "readinessScore": readiness_score,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "missingSkills": missing_skills,
            "transferableSkills": transferable,
            "topPriorityGap": top_priority_gap,
            "summary": summary,
            "event": event
        }
