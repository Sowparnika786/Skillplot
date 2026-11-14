# SkillPilot AI — Your Personal AI Career Architect

**SkillPilot AI** is an advanced AI SaaS platform for software engineers and career transitioners. It moves beyond static roadmaps by implementing a real-time reactive control loop powered by **five specialized AI backend agents**, objective **smart diagnostics**, a **4-quadrant Skill DNA analyzer**, a **dynamic self-mutating curriculum**, and **PIP**—an animated persistent learning companion.

---

## 🌟 Key Features

1. **5 Specialized AI Backend Agents**:
   - **Skill Analyzer Agent** (`#38BDF8`): Audits self-reported skills, detects verification gaps, and calculates true baseline proficiency.
   - **Career Matching Agent** (`#8B5CF6`): Deterministically computes weighted career readiness across Full Stack Developer, Data Analyst, and AI/ML Engineer tracks (penalizing unverified skills by `0.75x`).
   - **Assessment Evaluator Agent** (`#F43F5E`): Grades 5-question diagnostics, extracts granular weak topics (e.g., *Event Loop & Microtasks*), and triggers remediation protocols.
   - **Roadmap Planner Agent** (`#10B981`): Dynamically mutates learning sprints—injecting beginner revision lessons for scores `< 50%`, targeted code drills for `50%–79%`, and unlocking next phases for `≥ 80%`.
   - **AI Mentor Agent** (`#EC4899`): Synthesizes empathetic, technically sound explanations of *why* the curriculum adapted. Supports live Gemini 1.5 / OpenAI GPT-4o integration with a clearly labeled rule-based fallback when no API key is provided.
2. **PIP — Persistent Animated AI Learning Companion**:
   - A playful, intelligent lavender-purple jelly mascot rendered in lightweight SVG and CSS keyframe animations.
   - 6 expressive animated states: `waving`, `thinking`, `happy`, `encouraging`, `celebrating`, `resting`.
   - 4 switchable personalities: **💅 Gen Z Bestie**, **🌱 Wholesome Coach**, **🎮 Gamer Companion**, and **💼 Executive Mentor**.
   - Context-aware dialogue across landing, onboarding, Skill DNA, roadmap, and diagnostics.
   - Reacts to real assessment scores with actionable revision guidance and non-intrusive floating controls (minimize, hide, reduce-motion).
3. **Smart Assessments & Diagnostic Engine**:
   - Four 5-question technical diagnostic tests: **JavaScript**, **React**, **Python**, and **SQL**.
   - Deterministic answer grading, topic tags, and detailed explanations.
   - Built-in **Developer Demo Fixtures** to test exact threshold bands including specifically **35% remediation**.
4. **4-Quadrant Skill DNA Analyzer**:
   - Categorizes skills into *Core Strengths*, *Growth Edge*, *Hidden Potential*, and *Overconfidence Risks*.
5. **AI Agent Room**:
   - Real-time consensus and execution stream displaying actual agent decisions, timestamps, and decision payloads.
6. **Student Onboarding & Demo Mode**:
   - Instant 1-click Demo Mode loading Alex Rivera's live Full Stack trajectory.
   - 3-step onboarding wizard for new learners with responsive Dark Navy UI forms.
7. **Robust Persistence**:
   - LocalStorage serialization with versioning, preserving completed tasks during curriculum mutations.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite 6, Plain CSS with modern design tokens (Linear / Vercel dark theme), Lucide React
- **Backend**: Python 3.14, FastAPI, Uvicorn, Pydantic v2, HTTPX
- **Testing**: Zero-dependency Node.js ESM test runners + Pytest for backend agents and API endpoints
- **Styling**: `#09090F` Obsidian Navy, `#101017` Slate, `#16161F` Cards, `#8B5CF6` Electric Violet Accent

---

## 🚀 Setup & Running Instructions

### 1. Prerequisites
- **Node.js** v18+ (tested with v24)
- **Python** 3.10+ (tested with v3.14)

### 2. Frontend Setup
```bash
# Navigate to project directory
cd skillpilot-ai

# Install dependencies
npm install

# Run Vite development server (port 5173)
npm run dev
```
Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

### 3. Backend Setup
```bash
# Optional: create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install backend dependencies
pip install -r backend/requirements.txt

# Run FastAPI backend server (port 8000)
npm run backend
# or directly:
python3 -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
Check backend health at [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health).

### 4. Running Automated Tests
```bash
# Run all frontend and backend tests in one command:
npm test

# Or run separately:
npm run test:frontend   # Runs testScenario, testAuthOnboarding, testSmartAssessments, testPipCompanion
npm run test:backend    # Runs pytest backend/tests (12 tests)
```

### 5. Production Build
```bash
npm run build
```

---

## 🧪 Demo Scenario Walkthrough

1. Open the app and click **Try Demo** on the Landing Page to load **Alex Rivera** (targeting Full Stack Developer).
2. Navigate to **Assessments** in the sidebar.
3. Click **Start Diagnostic** on **JavaScript Core Diagnostic** (or use the developer fixture **Simulate 35% Score**).
4. Upon completing with 35%:
   - The **Assessment Evaluator Agent** flags score < 50% and identifies weak topics: *Event Loop & Microtasks* and *Promises & Async Concurrency*.
   - The **Roadmap Planner Agent** injects 2 beginner revision lessons into Phase 1 of the roadmap.
   - The **AI Mentor Agent** delivers contextual encouragement.
   - **PIP** pops up with its iconic Gen Z reaction:
     > *"Bestie, JavaScript really chose violence today 💀 But your comeback arc starts NOW! Let's fix those async concepts together. 🔥"*
   - Navigate to the **AI Agent Room** to inspect the real-time sequence of inter-agent deliberation events.
   - Navigate to **Roadmap** to see the injected adaptive tasks prepended to Phase 1 with previous completed tasks preserved.

---

## ⚠️ Limitations & Hackathon Prototype Notes

- **Transparent Rule-Based Fallback**: No external LLM API key (`GEMINI_API_KEY` / `OPENAI_API_KEY`) is hardcoded. When an API key is omitted, the system operates in a clearly labeled deterministic rule-based fallback mode (`source: "rule-based-fallback"`), ensuring reliable, instant responses during hackathon judging.
- **Client-Side Auth**: The authentication forms feature realistic client-side validation and onboarding state capture; third-party OAuth providers (Google/GitHub) and JWT storage are not integrated in this phase.
- **Data Persistence**: Data is persisted reactively in browser `localStorage` alongside the FastAPI backend.
