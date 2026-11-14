import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Terminal, 
  Radar, 
  Sparkles, 
  Compass, 
  RefreshCw,
  Cpu,
  Layers,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Activity
} from 'lucide-react';
import { 
  checkBackendHealth, 
  fetchOrchestratorEvents, 
  runProfileAuditWithOrchestrator 
} from '../services/api';

const DEFAULT_AGENTS = [
  {
    id: "skill_analyzer",
    name: "Skill Analyzer",
    role: "Skill Verification & Competency Analyst",
    avatar: "Radar",
    color: "#38BDF8",
    badge: "Verification Engine",
    status: "Active & Listening",
    directive: "Audit reported skills against empirical assessment and project evidence to detect confidence gaps and unverified assumptions.",
    metrics: { skillsAudited: 18, verificationRate: "66%", riskFlags: 1 }
  },
  {
    id: "career_matcher",
    name: "Career Matcher",
    role: "Labor Market Alignment & Gap Specialist",
    avatar: "Compass",
    color: "#8B5CF6",
    badge: "Labor Market Feed",
    status: "Active & Listening",
    directive: "Calculate weighted readiness against real industry requirements, penalize unverified skills, and identify high-leverage missing capabilities.",
    metrics: { rolesMapped: 3, readinessAvg: "42%", matchConfidence: "99.2%" }
  },
  {
    id: "roadmap_planner",
    name: "Roadmap Planner",
    role: "Dynamic Curriculum Architect",
    avatar: "Compass",
    color: "#10B981",
    badge: "Curriculum Mutator",
    status: "Active & Listening",
    directive: "Dynamically re-architect learning milestones in response to diagnostic scores, injecting remedial lessons for misconceptions and unlocking advanced sprints upon mastery.",
    metrics: { mutationsLogged: 12, tasksInjected: 6, phasesUnlocked: 2 }
  },
  {
    id: "assessment_evaluator",
    name: "Assessment Evaluator",
    role: "Diagnostic Grading & Weakness Interpreter",
    avatar: "Terminal",
    color: "#F43F5E",
    badge: "Diagnostic Evaluator",
    status: "Active & Listening",
    directive: "Evaluate actual submitted answers, detect core conceptual misconceptions, categorize score bands, and instruct the curriculum planner to adapt.",
    metrics: { quizzesGraded: 24, weakTopicsFound: 8, avgAccuracy: "100%" }
  },
  {
    id: "ai_mentor",
    name: "AI Mentor",
    role: "Pedagogical Coach & Socratic Explainer",
    avatar: "Sparkles",
    color: "#EC4899",
    badge: "Coaching & Explanations",
    status: "Active & Listening",
    directive: "Provide empathetic, technically sound explanations for why curriculum adjustments occur, dispel imposter syndrome, and guide learners toward mastery.",
    metrics: { adviceSynthesized: 36, socraticDrills: 14, sentimentScore: "9.8/10" }
  }
];

export default function AgentRoom({ studentData, onTriggerToast, liveEvents = [] }) {
  const [agents, setAgents] = useState(DEFAULT_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState(DEFAULT_AGENTS[0]);
  const [events, setEvents] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ online: false, llmLabel: "Detecting backend..." });
  const [expandedEventId, setExpandedEventId] = useState(null);

  // Poll or fetch initial status & events
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      const health = await checkBackendHealth();
      if (!mounted) return;

      if (health.status === "healthy") {
        setBackendStatus({
          online: true,
          llmLabel: health.llm?.label || "Rule-Based Fallback",
          isLlmAvailable: health.llm?.available
        });
        const backendEvents = await fetchOrchestratorEvents(30);
        if (mounted && backendEvents && backendEvents.length > 0) {
          setEvents(backendEvents);
          return;
        }
      } else {
        setBackendStatus({
          online: false,
          llmLabel: "Local Fallback Mode (FastAPI offline)",
          isLlmAvailable: false
        });
      }

      // Default baseline events if none fetched yet
      if (mounted && events.length === 0) {
        setEvents([
          {
            id: "evt-init-1",
            timestamp: "10:14 AM",
            agentName: "Career Matcher",
            agentRole: "Labor Market Alignment Specialist",
            eventType: "decision",
            summary: "Identified JavaScript and React as priority gaps for Alex Rivera (Full Stack track).",
            source: "rule-based-fallback",
            llmUsed: false
          },
          {
            id: "evt-init-2",
            timestamp: "10:15 AM",
            agentName: "Assessment Evaluator",
            agentRole: "Diagnostic Grading Interpreter",
            eventType: "observation",
            summary: "Listening for diagnostic test submissions to detect conceptual misconceptions.",
            source: "rule-based-fallback",
            llmUsed: false
          },
          {
            id: "evt-init-3",
            timestamp: "10:16 AM",
            agentName: "AI Mentor",
            agentRole: "Pedagogical Coach",
            eventType: "consensus",
            summary: "Encouragement ready: Python and SQL provide strong foundations for web development.",
            source: "rule-based-fallback",
            llmUsed: false
          }
        ]);
      }
    }

    loadData();
    return () => { mounted = false; };
  }, []);

  // Merge any live events passed down from assessments
  useEffect(() => {
    if (liveEvents && liveEvents.length > 0) {
      setEvents(prev => {
        const existingIds = new Set(prev.map(e => e.id));
        const newUniques = liveEvents.filter(e => !existingIds.has(e.id));
        return [...newUniques, ...prev];
      });
    }
  }, [liveEvents]);

  const getAgentIcon = (avatarName) => {
    switch (avatarName) {
      case 'Compass': return Compass;
      case 'Terminal': return Terminal;
      case 'Radar': return Radar;
      case 'Sparkles': return Sparkles;
      default: return Bot;
    }
  };

  const handleTriggerAudit = async () => {
    setIsAuditing(true);
    onTriggerToast("Autonomous multi-agent consensus initiated across all 5 agents...");

    const auditPayload = {
      name: studentData?.name || "Alex Rivera",
      targetCareerId: studentData?.targetCareerId || "fullstack",
      targetRole: studentData?.targetRole || "Full Stack Developer",
      skills: studentData?.skills || [],
      projects: studentData?.projects || [],
      completedTaskIds: studentData?.completedTaskIds || []
    };

    const auditRes = await runProfileAuditWithOrchestrator(auditPayload);

    if (auditRes && auditRes.agentEvents && auditRes.agentEvents.length > 0) {
      setEvents(prev => [...auditRes.agentEvents, ...prev]);
      onTriggerToast(`Consensus logged: 5 Agents evaluated ${studentData?.name || 'Alex'}'s readiness at ${auditRes.readinessScore}%.`);
    } else {
      // Local fallback event generation
      const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const localEvents = [
        {
          id: `evt-local-${Date.now()}-1`,
          timestamp: ts,
          agentName: "Skill Analyzer",
          agentRole: "Skill Verification Analyst",
          eventType: "observation",
          summary: `Audited ${studentData?.skills?.length || 3} skills. 2 verified credentials, 1 self-reported.`,
          source: "rule-based-fallback",
          llmUsed: false
        },
        {
          id: `evt-local-${Date.now()}-2`,
          timestamp: ts,
          agentName: "Career Matcher",
          agentRole: "Labor Market Alignment Specialist",
          eventType: "decision",
          summary: `Re-evaluated readiness for Full Stack Developer. JavaScript remains primary missing milestone.`,
          source: "rule-based-fallback",
          llmUsed: false
        },
        {
          id: `evt-local-${Date.now()}-3`,
          timestamp: ts,
          agentName: "Roadmap Planner",
          agentRole: "Dynamic Curriculum Architect",
          eventType: "action",
          summary: `Phase 1 Modern JavaScript Sprint calibrated for current proficiency.`,
          source: "rule-based-fallback",
          llmUsed: false
        },
        {
          id: `evt-local-${Date.now()}-4`,
          timestamp: ts,
          agentName: "Central Orchestrator",
          agentRole: "Multi-Agent Coordinator",
          eventType: "consensus",
          summary: `Consensus achieved: All 5 agents aligned on student acceleration trajectory.`,
          source: "rule-based-fallback",
          llmUsed: false
        }
      ];
      setEvents(prev => [...localEvents, ...prev]);
      onTriggerToast("Multi-agent consensus logged (local fallback).");
    }

    setIsAuditing(false);
  };

  return (
    <div className="agent-room-redesign">
      {/* Page Header */}
      <div className="compact-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="compact-title">AI Agent Collaboration Room</h1>
            <span className="badge-clean primary" style={{ fontSize: '0.7rem' }}>
              5 Specialized Agents
            </span>
            <span 
              className={`badge-clean ${backendStatus.online ? 'success' : 'neutral'}`} 
              style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Activity size={11} />
              {backendStatus.online ? "FastAPI Online :8000" : "Offline Fallback"}
            </span>
          </div>
          <p className="compact-subtitle">
            Autonomous multi-agent consensus engine coordinating skill analysis, career matching, assessment grading, dynamic roadmaps, and AI mentorship.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: '#101017', 
            border: '1px solid #272734', 
            borderRadius: '6px', 
            padding: '6px 10px',
            fontSize: '0.72rem',
            color: '#94A3B8'
          }}>
            <span style={{ color: '#64748B' }}>LLM Engine: </span>
            <strong style={{ color: backendStatus.isLlmAvailable ? '#38BDF8' : '#F59E0B' }}>
              {backendStatus.llmLabel}
            </strong>
          </div>

          <button 
            className="btn-saas btn-saas-primary btn-saas-sm"
            onClick={handleTriggerAudit}
            disabled={isAuditing}
          >
            <RefreshCw size={13} className={isAuditing ? 'spin' : ''} />
            <span>{isAuditing ? 'Agents Deliberating...' : 'Trigger Multi-Agent Deliberation'}</span>
          </button>
        </div>
      </div>

      {/* 5 Specialized Agent Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {agents.map(agent => {
          const Icon = getAgentIcon(agent.avatar);
          const isSelected = selectedAgent.id === agent.id;

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className="saas-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? agent.color : 'var(--border-color)',
                background: isSelected ? '#1A1A26' : 'var(--bg-card)',
                padding: '14px',
                transition: 'all 150ms ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ 
                  width: 30, 
                  height: 30, 
                  borderRadius: '6px', 
                  background: `${agent.color}15`,
                  border: `1px solid ${agent.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: agent.color
                }}>
                  <Icon size={15} />
                </div>

                <span className="badge-clean success" style={{ fontSize: '0.65rem' }}>
                  {agent.badge}
                </span>
              </div>

              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC' }}>
                {agent.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {agent.role}
              </div>

              <div style={{ 
                background: '#101017', 
                border: '1px solid #272734', 
                padding: '6px 8px', 
                borderRadius: '4px',
                fontSize: '0.68rem',
                color: '#94A3B8',
                lineHeight: 1.3,
                maxHeight: '44px',
                overflow: 'hidden'
              }}>
                {agent.directive}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Consensus Stream (8 cols) vs Selected Agent Dossier (4 cols) */}
      <div className="grid-12">
        <div className="col-8">
          <div className="saas-card">
            <div className="saas-card-header" style={{ marginBottom: '14px' }}>
              <div>
                <h2 className="saas-card-title">Inter-Agent Consensus &amp; Execution Stream</h2>
                <p className="saas-card-subtitle">
                  Live trace of agent observations, diagnostic evaluations, curriculum mutations, and mentor syntheses.
                </p>
              </div>
              <span className="badge-clean primary">{events.length} Events Logged</span>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px', 
              maxHeight: '480px', 
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {events.map((evt, idx) => {
                const matchedAgent = agents.find(a => 
                  a.name.toLowerCase() === (evt.agentName || '').toLowerCase()
                ) || {
                  color: "#8B5CF6",
                  avatar: "Bot"
                };
                const Icon = getAgentIcon(matchedAgent.avatar);
                const isExpanded = expandedEventId === (evt.id || idx);
                const isLlm = evt.llmUsed || evt.source === "llm";

                return (
                  <div 
                    key={evt.id || idx}
                    style={{
                      background: '#101017',
                      border: '1px solid #272734',
                      borderRadius: '6px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ 
                        width: 26, 
                        height: 26, 
                        borderRadius: '4px', 
                        background: `${matchedAgent.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: matchedAgent.color,
                        flexShrink: 0
                      }}>
                        <Icon size={13} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px', flexWrap: 'wrap', gap: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: matchedAgent.color }}>
                              {evt.agentName}
                            </span>
                            <span className="badge-clean neutral" style={{ fontSize: '0.62rem' }}>
                              {evt.eventType || "decision"}
                            </span>
                            {isLlm ? (
                              <span className="badge-clean primary" style={{ fontSize: '0.62rem' }}>
                                Gemini LLM
                              </span>
                            ) : (
                              <span className="badge-clean neutral" style={{ fontSize: '0.62rem', border: '1px dashed #64748B' }}>
                                Rule-Based Fallback
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{evt.timestamp}</span>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: '#F8FAFC', lineHeight: 1.45, marginTop: '4px' }}>
                          {evt.summary}
                        </p>
                      </div>
                    </div>

                    {/* Expandable JSON / structured details */}
                    {evt.details && Object.keys(evt.details).length > 0 && (
                      <div style={{ borderTop: '1px solid #1C1C28', paddingTop: '6px', marginTop: '4px' }}>
                        <button
                          onClick={() => setExpandedEventId(isExpanded ? null : (evt.id || idx))}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748B',
                            fontSize: '0.68rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>{isExpanded ? "Hide Execution Payload" : "View Structured Decision Payload"}</span>
                          {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                        </button>

                        {isExpanded && (
                          <pre style={{ 
                            background: '#09090F', 
                            border: '1px solid #272734', 
                            borderRadius: '4px', 
                            padding: '8px', 
                            fontSize: '0.68rem', 
                            color: '#94A3B8',
                            marginTop: '6px',
                            overflowX: 'auto',
                            fontFamily: 'monospace'
                          }}>
                            {JSON.stringify(evt.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Agent Dossier */}
        <div className="col-4">
          <div className="saas-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: '6px', 
                background: `${selectedAgent.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: selectedAgent.color
              }}>
                {React.createElement(getAgentIcon(selectedAgent.avatar), { size: 18 })}
              </div>
              <div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 600, color: '#F8FAFC' }}>{selectedAgent.name}</h3>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{selectedAgent.role}</div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                Agent Directive:
              </div>
              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.45, fontStyle: 'italic' }}>
                "{selectedAgent.directive}"
              </p>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Telemetry &amp; Metrics:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {Object.entries(selectedAgent.metrics || {}).map(([key, val]) => (
                  <div key={key} style={{ background: '#101017', border: '1px solid #272734', padding: '6px 8px', borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.62rem', color: '#64748B', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              background: '#101017', 
              border: '1px solid #272734', 
              borderRadius: '6px', 
              padding: '10px', 
              fontSize: '0.72rem', 
              color: '#94A3B8'
            }}>
              <div style={{ fontWeight: 600, color: '#F8FAFC', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={13} color="#10B981" />
                <span>Deterministic Grading Bound</span>
              </div>
              <span>
                Calculations and quiz scoring remain strictly deterministic. AI LLM reasoning is utilized for pedagogical mentorship and adaptive curriculum explanations.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
