// ==========================================================================
// SKILLPILOT AI — Multi-Agent Backend API Client & Resilient Fallback Service
// ==========================================================================

const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Check backend health and LLM provider status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: "offline",
      service: "Local In-Browser Engine",
      llm: {
        available: false,
        provider: "local-fallback",
        label: "Offline Local Engine"
      },
      agentsCount: 5,
      agents: []
    };
  }
}

/**
 * Fetch registered agents
 */
export async function fetchAgents() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/agents`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.agents || [];
  } catch (err) {
    return null;
  }
}

/**
 * Fetch orchestrator events history
 */
export async function fetchOrchestratorEvents(limit = 50) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orchestrator/events?limit=${limit}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.events || [];
  } catch (err) {
    return [];
  }
}

/**
 * Evaluates an assessment and triggers multi-agent deliberation:
 * Assessment Evaluator Agent -> Roadmap Planner Agent -> AI Mentor Agent.
 */
export async function evaluateAssessmentWithOrchestrator(profile, submission) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orchestrator/assessment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, submission })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend orchestrator call failed, falling back to local engine:", err);
    return null;
  }
}

/**
 * Runs full multi-agent profile audit across all 5 agents
 */
export async function runProfileAuditWithOrchestrator(profile) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orchestrator/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend audit call failed, using local fallback:", err);
    return null;
  }
}

/**
 * Send interactive question to AI Mentor Archie powered by Ollama
 */
export async function sendMentorChatMessage({
  message,
  studentName = "Alex Rivera",
  targetCareer = "Full Stack Developer",
  skills = [],
  personality = "genz"
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/agents/mentor/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        studentName,
        targetCareer,
        skills,
        personality
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend mentor chat failed, using local fallback:", err);
    return null;
  }
}
