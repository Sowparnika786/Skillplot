# SkillPilot AI — Your Personal AI Career Architect
### Project Context, Architecture Specification & Multi-Agent Intelligence Platform

---

## 1. Executive Summary & Vision

**SkillPilot AI** is an advanced AI-powered career architecture and skill acceleration platform for developers and engineers. It moves beyond static roadmaps and hardcoded career guides by treating learning as a dynamic, reactive control loop powered by genuine multi-agent collaboration:
- **Diagnose**: Evaluates competencies through objective 5-question technical diagnostic tests.
- **Analyze**: Continuously plots skills on a 4-quadrant Skill DNA matrix (Core Strengths, Growth Edge, Hidden Potential, and Overconfidence Risks).
- **Match**: Calculates weighted, penalty-adjusted career readiness across target engineering tracks (Full Stack Developer, Data Analyst, AI/ML Engineer).
- **Mutate**: Automatically rewires the student's learning roadmap in real-time based on test scores—injecting first-principles revision lessons for low scores (<50%), targeted code drills for mid-tier scores (50–79%), and verifying credentials to unlock advanced phases for high scores (≥80%).
- **Multi-Agent Consensus**: Five specialized backend agents deliberate in real-time, recording an immutable execution trace rendered in the AI Agent Room.

---

## 2. Technology Stack & Design System

### Frontend Stack
- **Framework**: React 19 + Vite 6
- **Language**: Modern ES6+ / JSX
- **Styling**: Pure semantic CSS with modern design tokens (Linear / Vercel dark theme)
- **Icons**: Lucide React
- **Persistence**: Reactive `localStorage` serialization with versioning and fail-safe demo fallbacks
- **Client Service**: `src/services/api.js` with graceful fallback resilience if backend is offline

### Backend Stack
- **Framework**: Python 3.14 + FastAPI + Uvicorn
- **Architecture**: Specialized Multi-Agent System coordinated by `MultiAgentOrchestrator`
- **Data Modeling**: Pydantic v2 schemas for all agent inputs, execution events, and structured outputs
- **HTTP Client**: `httpx` asynchronous client for LLM API integration
- **LLM Engine**: Dual-mode engine supporting Gemini 1.5 Flash / OpenAI GPT-4o with secure backend environment variable resolution and transparent rule-based fallback when no API key is present
- **Testing**: Zero-dependency Node.js ESM test runners + `pytest` suite for agents, orchestrator, and FastAPI endpoints

### Design System (Linear / Vercel / Notion Aesthetic)
- **App Background**: `#09090F` (Dark Obsidian Navy)
- **Sidebar Background**: `#101017` (Deep Slate Slate)
- **Card Background**: `#16161F` with `#1A1A26` hover states
- **Borders**: `#272734` default, `#38384D` hover, `#8B5CF6` focus
- **Primary Accent**: `#8B5CF6` (Electric Violet / Purple)
- **Secondary Accent**: `#38BDF8` (Sky Cyan)
- **Success Tone**: `#10B981` (Emerald Green)
- **Warning Tone**: `#F59E0B` (Amber Orange)
- **Danger Tone**: `#F43F5E` / `#FB7185` (Rose Red)
- **Typography**: Inter / system sans-serif with JetBrains Mono for code snippets
- **Layout**: Fixed 240px sidebar, 1280px max-width content container, responsive 12-column grid, 20–24px card padding, 12–16px border-radius, 150–200ms cubic-bezier transitions

---

## 3. Genuine Multi-Agent Architecture

The backend implements a dedicated multi-agent system (`backend/app/agents/`) coordinated by a central orchestrator:

```
                          ┌─────────────────────────────┐
                          │   MultiAgentOrchestrator    │
                          └──────────────┬──────────────┘
                                         │
        ┌───────────────────┬────────────┴───────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
┌───────────────┐   ┌───────────────┐    ┌───────────────┐   ┌───────────────┐
│ Skill Analyzer│   │ Career Matcher│    │  Assessment   │   │Roadmap Planner│
│     Agent     │   │     Agent     │    │Evaluator Agent│   │     Agent     │
└───────────────┘   └───────────────┘    └───────┬───────┘   └───────▲───────┘
                                                 │                   │
                                                 └───────►───────────┘
                                            (triggers mutation)
                                                         │
                                                         ▼
                                                 ┌───────────────┐
                                                 │   AI Mentor   │
                                                 │     Agent     │
                                                 │ (LLM/Fallback)│
                                                 └───────────────┘
```

### The 5 Specialized Agents

1. **Skill Analyzer Agent (`skill_analyzer.py`)**:
   - *Role*: Skill Verification & Competency Analyst (`#38BDF8`)
   - *Input*: Reported skills, self-rated confidence, assessment completion history, verified project evidence.
   - *Responsibility*: Distinguishes verified credentials from unverified claims, flags overconfidence risks, and identifies core strengths and growth edges.
   - *Output*: Structured inventory with verified counts, unverified items, overconfidence flags, and telemetry events.

2. **Career Matching Agent (`career_matching.py`)**:
   - *Role*: Labor Market Alignment & Gap Specialist (`#8B5CF6`)
   - *Input*: Analyzed skills from Agent 1, target career (`fullstack`, `data-analyst`, `ai-ml`), career requirements matrix.
   - *Responsibility*: Calculates deterministic weighted career readiness, penalizing unverified self-reported skills by `0.75x`. Identifies strengths, weaknesses, critical missing skills, and transferable skills.
   - *Output*: Readiness score, prioritized missing skills, transferable competencies, and alignment events.

3. **Assessment Evaluator Agent (`assessment_evaluator.py`)**:
   - *Role*: Diagnostic Grading & Weakness Interpreter (`#F43F5E`)
   - *Input*: Quiz metadata, actual submitted answers, score, question topic tags.
   - *Responsibility*: Evaluates test performance into 3 bands: `< 50%` (remediation), `50%–79%` (reinforcement), `≥ 80%` (verified mastery). Extracts specific conceptual weak topics (e.g. `Event Loop & Microtasks`, `Promises & Async Concurrency`) and instructs the Roadmap Planner to adapt.
   - *Output*: Score band, list of weak topics, remediation requirement flag, and diagnostic action instructions.

4. **Roadmap Planner Agent (`roadmap_planner.py`)**:
   - *Role*: Dynamic Curriculum Architect (`#10B981`)
   - *Input*: Target career curriculum, completed task IDs, Assessment Evaluator instructions.
   - *Responsibility*: Dynamically mutates the student's roadmap. For scores `< 50%`, prepends *Beginner Revision Lessons* and *Remedial Practice Labs* into Phase 1. For scores `50%–79%`, prepends *Targeted Practice Drills*. For scores `≥ 80%`, unlocks the next milestone phase while strictly preserving completed tasks.
   - *Output*: List of injected adaptive tasks, phase unlock status, and curriculum mutation logs.

5. **AI Mentor Agent (`ai_mentor.py`)**:
   - *Role*: Pedagogical Coach & Socratic Explainer (`#EC4899`)
   - *Input*: Learner profile, assessment outcome, mutated roadmap tasks, weak topics.
   - *Responsibility*: Synthesizes empathetic, technically rigorous explanations for *why* the curriculum changed, dispels imposter syndrome, and provides actionable first-step encouragement.
   - *Output*: Personalized headline, guidance narrative, encouragement message, and clear attribution of the underlying engine (Gemini 1.5 vs deterministic rule-based fallback).

---

## 4. Required Demo Scenario Walkthrough

The system demonstrates full multi-agent collaboration across the following workflow:

1. **Student Context**: Alex Rivera, currently targeting **Full Stack Developer**, baseline skills: Python (85%), SQL (72%), Basic HTML (45%), completed task: `fs-t101`.
2. **Diagnostic Event**: Alex takes the JavaScript Core & Asynchronous Runtime Diagnostic and scores **35%** (or uses the developer demo fixture to simulate 35%).
3. **Assessment Evaluator Agent Execution**:
   - Categorizes score 35% into the **Remediation Band (`< 50%`)**.
   - Identifies conceptual weak topics: `Event Loop & Microtasks` and `Promises & Async Concurrency`.
   - Flags `remediationRequired = True`.
4. **Roadmap Planner Agent Collaboration**:
   - Receives evaluation from Assessment Agent.
   - Mutates Phase 1 sprint by prepending 2 foundational tasks:
     - `Beginner Revision Lesson: Event Loop & Microtasks First Principles` (+40 XP)
     - `Remedial Practice Lab: Promises & Async Concurrency Interactive Sandbox` (+50 XP)
   - Preserves Alex's existing completed milestone `fs-t101`.
5. **AI Mentor Agent Delivery**:
   - Synthesizes personalized guidance:
     > *"Score: 35%. Tripped on Event Loop & Microtasks and Promises & Async Concurrency. Finding knowledge gaps early is exactly how elite engineers master complex systems. We've automatically added beginner revision lessons to your roadmap to build core mental models from first principles. Keep your head high—failure is just diagnostic data."*
6. **Central Orchestrator Consensus & AI Agent Room Display**:
   - Records an immutable sequence of inter-agent deliberation events (`Assessment Evaluator` ➔ `Roadmap Planner` ➔ `AI Mentor` ➔ `Central Orchestrator`).
   - The **AI Agent Room** (`src/modules/AgentRoom.jsx`) renders this real sequence live with timestamps, agent colors, badges, and expandable JSON decision payloads.

---

## 5. Secure LLM Protocol & Transparent Fallback

- **API Key Security**: The backend reads `GEMINI_API_KEY` (or `OPENAI_API_KEY`) strictly from backend environment variables or a secure `.env` file excluded by `.gitignore`. No keys are ever exposed in frontend client bundles or repositories.
- **Transparent Fallback**: When an API key is not configured, the system provides a clearly labeled deterministic rule-based fallback:
  - Frontend badge: `Rule-Based Fallback (No API key set)`
  - Agent event attribute: `source: "rule-based-fallback"`, `llmUsed: false`, `provider: "deterministic-rules-engine"`
  - When a valid key is provided, the badge automatically updates to `Gemini LLM Active` with live streaming synthesis.

---

## 6. FastAPI Backend Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck, agent registry status, and active LLM provider. |
| `GET` | `/api/agents` | Retrieves profile, directives, avatars, and colors for all 5 specialized agents. |
| `GET` | `/api/orchestrator/events` | Retrieves real-time chronological execution events from the orchestrator. |
| `POST` | `/api/orchestrator/assessment` | Evaluates assessment submission, triggers Assessment Evaluator ➔ Roadmap Planner ➔ AI Mentor collaboration, and returns mutated curriculum. |
| `POST` | `/api/orchestrator/audit` | Executes full profile audit across Skill Analyzer, Career Matcher, Roadmap Planner, and AI Mentor. |
| `POST` | `/api/agents/mentor/chat` | Contextual chat with the AI Mentor agent. |

---

## 7. Verification & Automated Test Suites

All tests are integrated and executed via `npm test`:

```bash
npm test
```

### Full Test Breakdown

1. **Frontend Unit Tests (Node.js ESM)**:
   - `testScenario.js`: Alex Rivera baseline, missing skills detection, skill addition, career switching to Data Analyst, and transferable skill preservation.
   - `testAuthOnboarding.js`: Form validation (regex, passwords, matching) and 3-step onboarding pipeline integration.
   - `testSmartAssessments.js`: 4 quizzes validation, answer grading, 35% & 40% remediation bands, 60% reinforcement band, ≥80% passing & Phase 2 unlock, and completed tasks preservation.

2. **Backend Unit & Integration Tests (Pytest)**:
   - `test_agents.py`: Unit tests verifying inputs, structured outputs, and event generation for all 5 agents.
   - `test_orchestrator.py`: End-to-end test of the required Alex Rivera 35% low JS score scenario and high-score phase unlock.
   - `test_api.py`: FastAPI `TestClient` integration tests for health, agents registry, assessment evaluation, audit, and events log endpoints.

3. **Production Build**:
   - `npm run build`: Vite 6 production build compiles with 0 warnings in ~830ms.

---

## 8. Remaining Tasks & Subsequent Milestones

- **Live Code Execution**: Replace/augment multiple-choice quizzes with in-browser WebContainer code sandboxes.
- **Database Layer**: Transition `localStorage` persistence to PostgreSQL with async SQLAlchemy / Tortoise ORM.
- **Skill Passport Export**: Implement verifiable credential export (JSON-LD / cryptographic hashes) for recruiter sharing.
- **WebSocket Streaming**: Stream agent deliberation events and AI Mentor chat tokens over WebSockets in real time.
