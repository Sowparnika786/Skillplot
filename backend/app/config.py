import os
from pathlib import Path

# Look for .env in project root or current dir
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = ROOT_DIR / ".env"

def load_env_file(path: Path):
    if not path.is_file():
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip("'\"")
                if k and k not in os.environ:
                    os.environ[k] = v
    except Exception:
        pass

load_env_file(ENV_PATH)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

HOST = os.environ.get("HOST", "127.0.0.1")
PORT = int(os.environ.get("PORT", "8000"))

def get_llm_status():
    if GEMINI_API_KEY:
        return {
            "available": True,
            "provider": "gemini",
            "model": "gemini-1.5-flash",
            "label": "Gemini API (Cloud LLM)"
        }
    elif OPENAI_API_KEY:
        return {
            "available": True,
            "provider": "openai",
            "model": "gpt-4o-mini",
            "label": "OpenAI API (Cloud LLM)"
        }
    else:
        return {
            "available": False,
            "provider": "fallback",
            "model": "deterministic-rules-engine",
            "label": "Rule-Based Deterministic Fallback (No API key set)"
        }
