import os
from typing import Dict, Any, Optional
import httpx
from . import config

async def generate_mentor_explanation(
    student_name: str,
    target_career: str,
    quiz_title: str,
    score: int,
    band: str,
    weak_topics: list,
    injected_tasks: list
) -> Dict[str, Any]:
    """
    Generates personalized learning guidance and encouragement.
    Uses real Gemini or OpenAI LLM API if key is set in environment;
    otherwise provides a clearly labeled deterministic rule-based fallback.
    """
    prompt = f"""You are the AI Mentor in SkillPilot AI.
Student Name: {student_name}
Target Career: {target_career}
Diagnostic: {quiz_title}
Score: {score}%
Performance Band: {band}
Identified Weak Topics: {', '.join(weak_topics) if weak_topics else 'None'}
Roadmap Injected Tasks: {', '.join([t.get('title', '') for t in injected_tasks])}

Generate a concise, encouraging, and technically rigorous explanation of why their roadmap changed,
how to tackle these concepts, and supportive guidance addressing any self-doubt.
Keep response under 4 sentences. Tone: High-agency, empathetic, technical."""

    # 1. Try Gemini if key is provided
    if config.GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={config.GEMINI_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}]
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                    return {
                        "is_llm_powered": True,
                        "provider": "gemini-1.5-flash",
                        "source": "llm",
                        "headline": "AI Mentor Live Guidance (Gemini 1.5)",
                        "message": text
                    }
        except Exception as e:
            # Fall through to rule-based fallback
            pass

    # 2. Try OpenAI if key is provided
    if config.OPENAI_API_KEY:
        try:
            url = "https://api.openai.com/v1/chat/completions"
            headers = {"Authorization": f"Bearer {config.OPENAI_API_KEY}"}
            payload = {
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 200
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, headers=headers, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    text = data["choices"][0]["message"]["content"].strip()
                    return {
                        "is_llm_powered": True,
                        "provider": "gpt-4o-mini",
                        "source": "llm",
                        "headline": "AI Mentor Live Guidance (OpenAI GPT-4o)",
                        "message": text
                    }
        except Exception:
            pass

    # 3. Clearly labeled Rule-Based Fallback
    topics_str = " and ".join(weak_topics[:2]) if weak_topics else "these concepts"
    if band == "remediation":
        headline = "Growth Opportunity: Foundational Revision Added"
        message = (
            f"Score: {score}%. Tripped on {topics_str}. Finding knowledge gaps early is exactly how elite engineers "
            f"master complex systems. We've automatically added beginner revision lessons to your roadmap to build core "
            f"mental models from first principles. Keep your head high—failure is just diagnostic data."
        )
    elif band == "reinforcement":
        headline = "Solid Baseline: Targeted Practice Exercises Added"
        message = (
            f"Score: {score}%. Good foundation! You understand the broad strokes, but need sharpening on {topics_str}. "
            f"We've injected targeted coding practice exercises into your roadmap so you can reinforce these edge cases "
            f"before your next attempt."
        )
    else:
        headline = "Verified Mastery: Next Module Unlocked!"
        message = (
            f"Score: {score}%. Outstanding performance! You demonstrated rigorous competence across {quiz_title}. "
            f"This skill is now officially marked as Verified in your Skill DNA, and the next roadmap phase has been unlocked!"
        )

    return {
        "is_llm_powered": False,
        "provider": "deterministic-rules-engine",
        "source": "rule-based-fallback",
        "headline": headline,
        "message": message,
        "note": "Generated via deterministic rule engine because GEMINI_API_KEY/OPENAI_API_KEY is not configured in environment."
    }
