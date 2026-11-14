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
    is_vercel = bool(os.environ.get("VERCEL"))
    is_local_ollama = bool(config.OLLAMA_BASE_URL and ("127.0.0.1" in config.OLLAMA_BASE_URL or "localhost" in config.OLLAMA_BASE_URL))

    if config.OLLAMA_BASE_URL and not (is_vercel and is_local_ollama):
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
    Prioritizes the exact user message, distinguishes Java from JavaScript,
    and avoids unrelated Python-to-JavaScript advice.
    """
    import re
    skills_summary = ", ".join(skills) if skills else "Python, SQL"
    tone_instruction = PERSONALITY_TONE_GUIDELINES.get(
        (personality or "genz").lower(), 
        PERSONALITY_TONE_GUIDELINES["genz"]
    )
    clean_message = message.strip()

    prompt = f"""You are Archie, the expert AI Mentor in SkillPilot AI.
{tone_instruction}

Student Profile (reference ONLY if directly relevant to what the student asks):
- Name: {student_name}
- Target Track: {target_career}
- Current Skills: {skills_summary}

Student: "{clean_message}"

CRITICAL INSTRUCTIONS:
1. Directly and strictly answer what the student said or asked. Prioritize their exact statement over profile context.
2. DISTINGUISH JAVA FROM JAVASCRIPT: Java is an object-oriented compiled language on the JVM (Spring, enterprise backend, Android). JavaScript is the lightweight scripting language of the web (ECMAScript, Node.js, browsers). They are completely distinct languages. If the student mentions Java, address Java specifically (not JavaScript or Python).
3. Do NOT force-fit unrelated skills (e.g. Python or JavaScript) or curriculum promises unless the student explicitly asks about them.
4. Keep your answer under 4 sentences. Be helpful, clear, and technically accurate."""

    is_vercel = bool(os.environ.get("VERCEL"))
    is_local_ollama = bool(config.OLLAMA_BASE_URL and ("127.0.0.1" in config.OLLAMA_BASE_URL or "localhost" in config.OLLAMA_BASE_URL))

    if config.OLLAMA_BASE_URL and not (is_vercel and is_local_ollama):
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

    # Deterministic fallback reply with accurate semantic relevance
    q = clean_message.lower()
    is_java = bool(re.search(r'\bjava\b', q)) and "javascript" not in q

    if is_java:
        if any(w in q for w in ["don't like", "dislike", "hate", "not like"]):
            reply = (
                "That's completely fine! Java's verbose boilerplate and strict class hierarchies aren't for everyone. "
                "The great news: you do not need Java for modern full-stack or web engineering. "
                "You can build outstanding applications with Python (FastAPI/Django) or Node.js/TypeScript, completely Java-free."
            )
        else:
            reply = (
                "Java is a statically-typed, object-oriented language compiled to bytecode on the JVM. "
                "Keep in mind: Java is completely distinct from JavaScript (the language of the web). "
                "If Java doesn't fit your preferences, Python and TypeScript are top-tier modern alternatives."
            )
    elif "sql" in q:
        reply = (
            "SQL (Structured Query Language) is the standard declarative language for interacting with relational databases "
            "like PostgreSQL, MySQL, and SQLite. You use it to query (`SELECT`), insert, update, and define schemas for structured tabular data."
        )
    elif "promise" in q or "promises" in q:
        reply = (
            "A JavaScript Promise is an object representing the eventual completion (or failure) of an asynchronous operation. "
            "It transitions between Pending, Fulfilled (with a value), and Rejected (with an error), and is consumed via `.then()`, `.catch()`, or modern `async/await`."
        )
    elif "event loop" in q:
        reply = (
            "The JavaScript Event Loop orchestrates non-blocking concurrency: synchronous code runs immediately on the Call Stack, "
            "while asynchronous callbacks (timers, fetch) wait in task queues until the Call Stack clears."
        )
    elif "dict" in q or "map" in q:
        reply = (
            "In Python, dictionaries accept any hashable key (tuples, integers, strings). "
            "In JavaScript, standard objects coerce keys to strings; use ES6 Map (`const m = new Map()`) for arbitrary key types."
        )
    else:
        reply = (
            f"Thanks for asking, {student_name}! Regarding '{clean_message}', in your {target_career} journey, "
            f"focus on mastering the fundamental concepts first and applying them through hands-on code."
        )

    return {
        "is_llm_powered": False,
        "provider": "deterministic-rules-engine",
        "model": "deterministic-rules-engine",
        "source": "rule-based-fallback",
        "reply": reply,
        "agent": "Archie (Rules Fallback)",
        "llm_verified": False
    }
