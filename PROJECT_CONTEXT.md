# SkillPilot AI — Your Personal AI Career Architect
### Project Context, Architecture Specification & Milestone Roadmap

---

## 1. Executive Summary & Vision

**SkillPilot AI** is an advanced AI-powered career architecture and skill acceleration platform for developers and engineers. It moves beyond static roadmaps and hardcoded career guides by treating learning as a dynamic, reactive control loop:
- **Diagnose**: Evaluates competencies through objective 5-question technical diagnostic tests.
- **Analyze**: Continuously plots skills on a 4-quadrant Skill DNA matrix (Core Strengths, Growth Edge, Hidden Potential, and Overconfidence Risks).
- **Match**: Calculates weighted, penalty-adjusted career readiness across target engineering tracks (Full Stack Developer, Data Analyst, AI/ML Engineer).
- **Mutate**: Automatically rewires the student's learning roadmap in real-time based on test scores—injecting first-principles revision lessons for low scores (<50%), targeted code drills for mid-tier scores (50–79%), and verifying credentials to unlock advanced phases for high scores (≥80%).

---

## 2. Technology Stack & Design System

### Core Frontend Stack
- **Framework**: React 19 + Vite 6
- **Language**: Modern ES6+ / JSX
- **Styling**: Pure semantic CSS with modern design tokens (no bulky UI frameworks or bloated CSS dependencies)
- **Icons**: Lucide React
- **Persistence**: Reactive `localStorage` serialization with versioning and fail-safe demo fallbacks
- **Testing**: Zero-dependency Node.js ESM test runners covering validation, career matching algorithms, dynamic roadmap mutations, and assessment grading

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

## 3. Implemented Features & System Capabilities

### 3.1. Landing Page & Seamless Onboarding Flow
- **Branded Hero**: Tagline *"Your Skills. Your Future. Your AI."*, feature grid, curriculum highlights, and metrics.
- **Dual Entry**: Instant `Try Demo` button to launch Alex Rivera's live baseline dashboard, alongside `Get Started` and `Sign In` paths.
- **Authentication UI**: Polished Dark Navy/Purple sign-in and sign-up interfaces with instant client-side validation, password confirmation matching, visibility toggles, and clear labeling indicating production provider connection requirements.
- **3-Step Onboarding Wizard**:
  - *Step 1*: Personal identity, education background, primary interests.
  - *Step 2*: Existing technical skills, proficiency ratings (0–100), and self-rated confidence.
  - *Step 3*: Target career selection (Full Stack, Data Analyst, AI/ML), study hours commitment, and preferred AI Mentor coaching persona.

### 3.2. Pure Career Intelligence Engine (`src/utils/careerEngine.js`)
- **Structured Requirements Matrix**: Defined explicit industry skill requirements, weights (1–3), and minimum proficiency thresholds for:
  - **Full Stack Developer**: JavaScript (ES6+), React Ecosystem, Node.js & Express, Python, SQL & Databases, HTML5/CSS3, Git.
  - **Data Analyst**: SQL & Analytical Querying, Python (Pandas & NumPy), Data Visualization & BI, Statistics & Probability, Advanced Excel, Git.
  - **AI/ML Engineer**: Python & Scientific Stack, Machine Learning (Scikit-Learn), Deep Learning (PyTorch), Vector Databases & RAG, Model Deployment & FastAPI, Math & Linear Algebra.
- **Deterministic Career Readiness Formula**:
  - Earned score is weighted by requirement importance.
  - **Verification Factor**: Unverified self-reported skills are discounted by `0.75x`. Passing a diagnostic assessment (≥80%) or presenting project proof elevates the multiplier to `1.0x`.
  - Missing skills contribute 0% and highlight critical priority gaps.
- **Transferable Skills Detection**: Identifies skills in the learner's profile that provide cross-domain leverage when pivoting between career tracks (e.g., Python and SQL transferring from Full Stack to Data Analyst).

### 3.3. Skill DNA Analyzer (`src/modules/SkillDNA.jsx`)
- **4-Quadrant Competency Matrix**:
  1. *Core Strengths*: High proficiency, high confidence, verified credentials.
  2. *Growth Edge*: Medium-high proficiency, moderate confidence.
  3. *Hidden Potential*: Competent execution with low self-confidence (imposter syndrome detection).
  4. *Overconfidence Risk*: High self-rating with low assessment or project verification (flags unverified assumptions for immediate diagnostic testing).
- **Automated Insights**: Generates specific remediation advice, bridge recommendations, and superpower highlights based on the student's live DNA.

### 3.4. Smart Assessments & Adaptive Learning Engine (`src/modules/Assessments.jsx`, `src/data/assessmentData.js`)
- **Four 5-Question Technical Diagnostics**:
  1. *JavaScript Core & Asynchronous Runtime Diagnostic*: Event loop, microtasks, closures, lexical `this`, immutability, `Promise.all` fail-fast.
  2. *React 19 Component & State Lifecycle Diagnostic*: Fiber hook ordering, `useEffect` stale closures, reconciliation keys, `useMemo` cost-benefit, automatic state batching.
  3. *Python Data Structures & Asynchronous I/O Diagnostic*: Dict time complexity, generator memory efficiency, `asyncio` event loop, GIL behavior, mutable default arguments.
  4. *SQL Analytical Querying & Performance Diagnostic*: `EXPLAIN ANALYZE` index scans, window functions (`ROW_NUMBER` vs `RANK`), CTEs, NULL behavior in `IN()` vs `EXISTS()`, ACID isolation levels.
- **Real Answer Grading**: Evaluates actual selected options against verified keys; zero hardcoded scores.
- **Three Adaptive Learning Bands**:
  - **`< 50%` (Remediation)**: Identifies specific topic tags missed; automatically prepends *Beginner Revision Lessons* and *Remedial Practice Labs* into Phase 1 of the learning roadmap; delivers supportive encouragement focused on building core mental models from first principles.
  - **`50% – 79%` (Reinforcement)**: Identifies edge-case weaknesses; prepends *Targeted Practice Drills* and a *Reassessment Challenge* to the roadmap; delivers constructive reinforcement feedback.
  - **`≥ 80%` (Verified Mastery)**: Upgrades skill to `verified: true`; raises proficiency score; awards verified badge; unlocks advanced curriculum phases (e.g., Phase 2 for JavaScript).
- **Developer Demo Fixture**: Built-in, clearly labeled testing fixture to test arbitrary score thresholds—specifically simulating the **35% remediation band** separately from 5-question 20% steps.
- **Assessment History & Audit Log**: Records past attempts with scores, timestamps, weak topic tags, and adaptive outcomes.

### 3.5. Dynamic AI Roadmap (`src/modules/Roadmap.jsx`)
- **Before-and-After Adaptive Changes Card**: Displays a transparent log of curriculum adjustments made in response to diagnostic scores.
- **Adaptive Task Badging**: Injected remediation and practice tasks are badged with `⚡ Adaptive: Beginner Revision` or `⚡ Adaptive: Targeted Practice`.
- **Milestone State Preservation**: Marking tasks complete or mutating the curriculum strictly preserves previously completed task IDs.

### 3.6. Robust Local Persistence Architecture (`src/utils/storage.js`)
- Saves learner profile, skills, verified statuses, completed milestones, assessment attempts, injected adaptive tasks, and unlocked phases to `localStorage`.
- Includes fallback to Alex Rivera demo baseline and one-click data reset utility.

---

## 4. Codebase Architecture & File Structure

```text
skillpilot-ai/
├── .gitignore                      # Excludes node_modules, dist, .env, logs, secrets
├── index.html                      # HTML entry with Inter/JetBrains fonts & metadata
├── package.json                    # Scripts (dev, build, preview, test) & dependencies
├── vite.config.js                  # Vite configuration with React plugin
├── PROJECT_CONTEXT.md              # Project architectural documentation
├── README.md                       # High-level overview & setup guide
├── src/
│   ├── main.jsx                    # React 19 root bootstrap
│   ├── App.jsx                     # Central controller, routing & state orchestrator
│   ├── index.css                   # Global Linear/Vercel SaaS design system
│   ├── components/
│   │   ├── AuthPages.jsx           # Sign In & Sign Up dark forms with validation
│   │   ├── Header.jsx              # Top bar with readiness chip, search & user profile
│   │   ├── LandingPage.jsx         # Hero landing page with feature cards & CTA
│   │   ├── OnboardingWizard.jsx    # 3-step student onboarding wizard
│   │   ├── Sidebar.jsx             # 240px minimal dark navigation sidebar
│   │   └── Toast.jsx               # Floating event notification toasts
│   ├── data/
│   │   ├── assessmentData.js       # 4 technical MCQ diagnostic quizzes (5 questions each)
│   │   └── mockData.js             # Initial student baseline (Alex Rivera), projects, agents
│   ├── modules/
│   │   ├── Dashboard.jsx           # Linear-style summary cards, gap chart & mentor note
│   │   ├── Profile.jsx             # Skill management (add, edit, remove) & goals
│   │   ├── SkillDNA.jsx            # 4-quadrant skill analyzer & gap detector
│   │   ├── CareerExplorer.jsx      # Multi-career comparison & target switcher
│   │   ├── Roadmap.jsx             # Dynamic AI roadmap with adaptive before-after log
│   │   ├── Assessments.jsx         # Interactive quiz runner, dev fixture & history
│   │   ├── AgentRoom.jsx           # Multi-agent AI collaboration room
│   │   ├── CareerTimeMachine.jsx   # Timeline trajectory comparison
│   │   ├── AIMentor.jsx            # Contextual AI mentor coaching interface
│   │   └── SkillPassport.jsx       # Verified project & credential evidence ledger
│   └── utils/
│       ├── careerEngine.js         # Pure career intelligence, Skill DNA & adaptive engine
│       ├── storage.js              # LocalStorage manager with versioning & reset
│       ├── testScenario.js         # Unit test: Alex Rivera baseline & career switching
│       ├── testAuthOnboarding.js   # Unit test: Auth validation & onboarding wizard
│       └── testSmartAssessments.js # Unit test: Quiz grading, 35% fixture & adaptive bands
```

---

## 5. Verification & Test Suite Summary

The project includes an automated test pipeline executed via `npm test`:

| Test Suite | Purpose | Status |
| :--- | :--- | :---: |
| `testScenario.js` | Baseline Alex Rivera profile, missing skill detection (JS, React, Node), skill addition, career switching to Data Analyst, and transferable skill preservation. | **PASSED** |
| `testAuthOnboarding.js` | Form validation (empty fields, regex email, password strength, password confirmation) and 3-step onboarding pipeline integration. | **PASSED** |
| `testSmartAssessments.js` | 4 quizzes validation (5 questions, topic tags, explanations), real answer grading, 35% & 40% remediation band, 60% practice band, ≥80% passing & Phase 2 unlock, completed tasks preservation, and Data Analyst career switching. | **PASSED** |
| `npm run build` | Full production bundle compilation with Vite 6. | **PASSED (0 warnings)** |

---

## 6. Remaining Tasks & Future Roadmap

When extending SkillPilot AI in subsequent phases, prioritize the following milestones:

1. **FastAPI Backend Services**:
   - Transition from `localStorage` to a lightweight FastAPI REST backend with PostgreSQL / SQLite.
   - Endpoints for user authentication (JWT), learner profile persistence, assessment submissions, and adaptive roadmap sync.
2. **Real LLM / Agent Orchestration**:
   - Connect the AI Mentor and Agent Room (Architect, Codex, Velocity, Compass) to live LLM streaming endpoints (e.g., Gemini API / Anthropic / OpenAI).
   - Dynamic prompt synthesis utilizing the student's live Skill DNA and recent diagnostic mistakes.
3. **Skill Passport Cryptographic Proofs**:
   - Implement verifiable credential export (JSON-LD / cryptographic hashes) for completed diagnostics and evaluated GitHub repositories.
4. **Interactive Coding Sandbox**:
   - Supplement multiple-choice diagnostics with in-browser live code execution sandboxes (WebContainers or sandboxed execution APIs).
