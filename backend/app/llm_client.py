import os
from typing import Dict, Any, Optional, List
import httpx
from . import config

PERSONALITY_TONE_GUIDELINES = {
    "genz": "Tone: Witty, supportive, Gen Z bestie slang (bestie, cooked, lock in, comeback arc, no cap, fr fr), relevant emojis (💀, ✨, 🔥, 💅).",
    "wholesome": "Tone: Warm, gentle, empathetic, patient coach, growth mindset, nature and sun emojis (🌱, 🌿, ☀️).",
    "gamer": "Tone: Questline analogies, level up, grinding XP, boss fight recovery, sword and shield emojis (⚔️, 🛡️, 🎮).",
    "professional": "Tone: Concise, strategic engineering advisor, telemetry-driven, actionable competencies, executive precision."
}

async def generate_mentor_explanation(
    student_name: str,
    target_career: str,
    quiz_title: str,
    score: int,
    band: str,
    weak_topics: list,
    injected_tasks: list,
    skills: Optional[List[str]] = None,
    personality: str = "genz"
) -> Dict[str, Any]:
    """
    Generates personalized learning guidance and encouragement.
    Uses local Ollama (llama3.2:1b) if running; or Gemini/OpenAI if configured;
    otherwise provides a clearly labeled deterministic rule-based fallback.
    Sets Ollama status to verified active ONLY after a successful real response.
    """
    skills_summary = ", ".join(skills) if skills else "Python, SQL, HTML"
    tone_instruction = PERSONALITY_TONE_GUIDELINES.get(
        (personality or "genz").lower(), 
        PERSONALITY_TONE_GUIDELINES["genz"]
    )
    topics_list_str = ', '.join(weak_topics) if weak_topics else 'None'
    tasks_list_str = ', '.join([
        t.get('title', '') if isinstance(t, dict) else str(t) 
        for t in injected_tasks
    ])

    prompt = f"""You are PIP, the AI Mentor in SkillPilot AI.
Student Name: {student_name}
Target Career Goal: {target_career}
Current Tracked Skills: {skills_summary}
Diagnostic Assessment: {quiz_title}
Score: {score}%
Performance Band: {band}
Identified Weak Topics: {topics_list_str}
Roadmap Injected Tasks: {tasks_list_str}

{tone_instruction}

Write a punchy, personalized 2-sentence explanation of why their roadmap adapted and encouraging their comeback/next action. Keep under 55 words. Do not prefix with role labels."""

    # 1. Try Local Ollama (llama3.2:1b on M4)
    if config.OLLAMA_BASE_URL:
        try:
            url = f"{config.OLLAMA_BASE_URL.rstrip('/')}/api/generate"
            payload = {
                "model": config.OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "num_predict": 85,
                    "temperature": 0.7
                }
            }
            async with httpx.AsyncClient(timeout=6.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    text = data.get("response", "").strip()
                    if text:
                        # Clean quotes if model wrapped output in quotes
                        if (text.startswith('"') and text.endswith('"')) or (text.startswith("'") and text.endswith("'")):
                            text = text[1:-1].strip()
                        # Mark verified active ONLY after a successful real response
                        config.set_ollama_verified(True)
                        headline = f"AI Mentor Live Guidance (Ollama {config.OLLAMA_MODEL})"
                        return {
                            "is_llm_powered": True,
                            "provider": "ollama",
                            "model": config.OLLAMA_MODEL,
                            "source": "local-llm",
                            "headline": headline,
                            "message": text,
                            "personality": personality,
                            "llm_verified": True
                        }
        except Exception:
            # Fall through cleanly if Ollama is unreachable or times out
            pass

    # 2. Try Gemini if key is provided
    if config.GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={config.GEMINI_API_KEY}"
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                    return {
                        "is_llm_powered": True,
                        "provider": "gemini-1.5-flash",
                        "model": "gemini-1.5-flash",
                        "source": "cloud-llm",
                        "headline": "AI Mentor Live Guidance (Gemini 1.5)",
                        "message": text,
                        "personality": personality,
                        "llm_verified": True
                    }
        except Exception:
            pass

    # 3. Try OpenAI if key is provided
    if config.OPENAI_API_KEY:
        try:
            url = "https://api.openai.com/v1/chat/completions"
            headers = {"Authorization": f"Bearer {config.OPENAI_API_KEY}"}
            payload = {
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 150
            }
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.post(url, headers=headers, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    text = data["choices"][0]["message"]["content"].strip()
                    return {
                        "is_llm_powered": True,
                        "provider": "gpt-4o-mini",
                        "model": "gpt-4o-mini",
                        "source": "cloud-llm",
                        "headline": "AI Mentor Live Guidance (OpenAI GPT-4o)",
                        "message": text,
                        "personality": personality,
                        "llm_verified": True
                    }
        except Exception:
            pass

    # 4. Clearly labeled Rule-Based Fallback
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
        "model": "deterministic-rules-engine",
        "source": "rule-based-fallback",
        "headline": headline,
        "message": message,
        "personality": personality,
        "llm_verified": False,
        "note": "Generated via deterministic rule engine because Ollama/Gemini/OpenAI was unreachable."
    }

async def generate_mentor_chat(
    message: str,
    student_name: str = "Alex Rivera",
    target_career: str = "Full Stack Developer",
    skills: Optional[List[str]] = None,
    personality: str = "genz"
) -> Dict[str, Any]:
    """
    Interactive Q&A chat with AI Mentor Archie/PIP powered by Ollama.
    """
    skills_summary = ", ".join(skills) if skills else "Python, SQL, HTML"
    tone_instruction = PERSONALITY_TONE_GUIDELINES.get(
        (personality or "genz").lower(), 
        PERSONALITY_TONE_GUIDELINES["genz"]
    )

    prompt = f"""You are Archie, the AI Mentor in SkillPilot AI.
Student: {student_name}
Target Career: {target_career}
Current Skills: {skills_summary}
Question from student: "{message}"

{tone_instruction}

Provide a concise, technically accurate answer connecting their current skills to the answer in under 4 sentences."""

    if config.OLLAMA_BASE_URL:
        try:
            url = f"{config.OLLAMA_BASE_URL.rstrip('/')}/api/generate"
            payload = {
                "model": config.OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "num_predict": 120,
                    "temperature": 0.7
                }
            }
            async with httpx.AsyncClient(timeout=7.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    text = data.get("response", "").strip()
                    if text:
                        config.set_ollama_verified(True)
                        return {
                            "is_llm_powered": True,
                            "provider": "ollama",
                            "model": config.OLLAMA_MODEL,
                            "source": "local-llm",
                            "reply": text,
                            "agent": "Archie (Ollama)",
                            "llm_verified": True
                        }
        except Exception:
            pass

    # Deterministic fallback reply
    q = message.lower()
    if "dict" in q or "map" in q:
        reply = (
            "In Python, dictionaries accept any hashable key (tuples, integers, strings). "
            "In JavaScript, standard objects coerce keys to strings; use ES6 Map (`const m = new Map()`) "
            "for arbitrary key types. Your Python dictionary background directly maps to JS Map!"
        )
    elif "event loop" in q:
        reply = (
            "Think of the JS Event Loop like a restaurant kitchen: synchronous code is the chef cooking on the main burner, "
            "while async calls (fetch, setTimeout) are timers. When timers ding, their callbacks wait in the task queue "
            "until the chef's cutting board (call stack) is completely empty!"
        )
    else:
        reply = (
            f"Great question, {student_name}! Leveraging your {skills_summary} background gives you a major algorithmic advantage. "
            f"Focus on how asynchronous promises coordinate with your backend data contracts."
        )

    return {
        "is_llm_powered": False,
        "provider": "deterministic-rules-engine",
        "model": "deterministic-rules-engine",
        "source": "rule-based-fallback",
        "reply": reply,
        "agent": "Archie",
        "llm_verified": False
    }
