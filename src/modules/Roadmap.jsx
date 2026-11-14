import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Milestone,
  Layers,
  AlertTriangle,
  BookOpen,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Roadmap({ 
  studentData, 
  careerMatch,
  roadmapPhases,
  onToggleTask,
  setActiveModule,
  onTriggerToast 
}) {
  const [expandedPhase, setExpandedPhase] = useState(1);

  const totalTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const overallRoadmapProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const adaptiveLog = studentData?.adaptiveLog || [];
  const adaptiveTasks = studentData?.adaptiveTasks || [];

  return (
    <div className="roadmap-redesign">
      <div className="compact-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="compact-title">AI Learning Roadmap — {careerMatch.career.title}</h1>
            <span className="badge-clean primary" style={{ fontSize: '0.7rem' }}>
              Adaptive Curriculum
            </span>
          </div>
          <p className="compact-subtitle">
            Calibrated based on your current skills ({studentData.skills.length}) and smart diagnostic performance to address high-priority gaps for <strong style={{ color: '#F8FAFC' }}>{careerMatch.career.title}</strong>.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC' }}>
            {completedTasks} / {totalTasks} Tasks
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{overallRoadmapProgress}% Total Progress</div>
        </div>
      </div>

      {/* Adaptive Learning Adjustments (Before & After) Card */}
      <div className="saas-card" style={{ marginBottom: '24px', borderLeft: '4px solid #8B5CF6' }}>
        <div className="saas-card-header" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#8B5CF6" />
            <h3 className="saas-card-title">Adaptive Learning Adjustments (Before &amp; After Log)</h3>
          </div>
          <span className="badge-clean primary">
            {adaptiveLog.length > 0 ? `${adaptiveLog.length} Adaptive Adjustments` : "Adaptive Engine Active"}
          </span>
        </div>

        {adaptiveLog.length === 0 ? (
          <div style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
            <p style={{ marginBottom: '8px' }}>
              Your curriculum automatically mutates based on smart diagnostic tests. Take an assessment to see real-time adaptations:
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.75rem', color: '#64748B' }}>
              <span>• <strong>&lt; 50%</strong>: Injects foundational revision lessons &amp; remedial labs</span>
              <span>• <strong>50%–79%</strong>: Injects targeted code drills &amp; reassessment</span>
              <span>• <strong>&ge; 80%</strong>: Verifies credential &amp; unlocks advanced phases</span>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '14px' }}>
              Recent dynamic curriculum mutations triggered by diagnostic results:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {adaptiveLog.slice(0, 4).map((entry) => {
                const isPassed = entry.band === "passed";
                const isRemediation = entry.band === "remediation";

                return (
                  <div 
                    key={entry.id}
                    style={{
                      background: '#101017',
                      border: '1px solid #272734',
                      borderRadius: '8px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge-clean ${isPassed ? 'success' : isRemediation ? 'danger' : 'warning'}`} style={{ fontSize: '0.7rem' }}>
                          Score: {entry.score}%
                        </span>
                        <strong style={{ fontSize: '0.84rem', color: '#F8FAFC' }}>
                          {entry.quizTitle}
                        </strong>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        {entry.timestamp}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '6px' }}>
                      <strong>Adjustment:</strong> {entry.headline}
                    </div>

                    {entry.tasksAdded && entry.tasksAdded.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#8B5CF6', fontWeight: 600 }}>Injected into Phase 1 Sprint:</span>
                        {entry.tasksAdded.map((t, idx) => (
                          <div key={idx} style={{ fontSize: '0.74rem', color: '#C084FC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>↳</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {entry.unlockedPhase && (
                      <div style={{ fontSize: '0.74rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <ShieldCheck size={13} color="#10B981" />
                        <span>{entry.unlockedPhase} unlocked in curriculum hierarchy</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Curriculum Progress Overview */}
      <div className="saas-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Curriculum Progress ({careerMatch.career.title})</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#8B5CF6' }}>{overallRoadmapProgress}%</span>
        </div>
        <div className="clean-progress">
          <div className="clean-progress-fill" style={{ width: `${overallRoadmapProgress}%` }}></div>
        </div>

        {/* Dynamic Phase Quick Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${roadmapPhases.length}, 1fr)`, gap: '10px', marginTop: '14px' }}>
          {roadmapPhases.map((p) => {
            const isExpanded = expandedPhase === p.phase;
            return (
              <div 
                key={p.phase}
                onClick={() => setExpandedPhase(p.phase)}
                style={{
                  background: isExpanded ? 'rgba(139, 92, 246, 0.1)' : '#101017',
                  border: `1px solid ${isExpanded ? 'var(--accent-primary)' : '#272734'}`,
                  borderRadius: '6px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#8B5CF6' }}>
                    PHASE {p.phase}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{p.progress}%</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title.split(':')[1] || p.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic List of Phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {roadmapPhases.map((phase) => {
          const isExpanded = expandedPhase === phase.phase;
          const isLocked = phase.status.includes("Locked");

          return (
            <div 
              key={phase.phase} 
              className="saas-card"
              style={{
                borderColor: isExpanded ? 'var(--border-hover)' : 'var(--border-color)',
                padding: '20px',
                opacity: isLocked ? 0.75 : 1
              }}
            >
              {/* Header */}
              <div 
                onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  cursor: 'pointer' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '6px', 
                    background: phase.status === 'Active Sprint' ? 'rgba(139, 92, 246, 0.15)' : '#101017',
                    border: '1px solid #272734',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: phase.status === 'Active Sprint' ? '#8B5CF6' : '#94A3B8',
                    fontSize: '0.85rem'
                  }}>
                    {phase.phase}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#F8FAFC' }}>{phase.title}</h3>
                      <span className={`badge-clean ${phase.status === 'Mastered' || phase.status.includes('Mastered') ? 'success' : phase.status === 'Active Sprint' || phase.status.includes('Active') ? 'primary' : 'neutral'}`}>
                        {phase.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                      {phase.duration} • Focus: <strong style={{ color: '#F8FAFC' }}>{phase.focusSkill}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#8B5CF6' }}>{phase.progress}%</span>
                  {isExpanded ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </div>
              </div>

              {/* Tasks and Resources Body */}
              {isExpanded && (
                <div style={{ marginTop: '18px', borderTop: '1px solid #272734', paddingTop: '16px' }}>
                  
                  {/* Tasks */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748B' }}>
                        Actionable Milestones ({phase.tasks.filter(t => t.completed).length}/{phase.tasks.length} Completed)
                      </div>
                      {phase.tasks.some(t => t.isAdaptive) && (
                        <span className="badge-clean primary" style={{ fontSize: '0.68rem' }}>
                          Adaptive Tasks Injected
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {phase.tasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => onToggleTask(task.id)}
                          style={{
                            background: task.completed 
                              ? 'rgba(16, 185, 129, 0.03)' 
                              : task.isAdaptive 
                                ? 'rgba(139, 92, 246, 0.06)' 
                                : '#101017',
                            border: `1px solid ${
                              task.completed 
                                ? 'rgba(16, 185, 129, 0.2)' 
                                : task.isAdaptive 
                                  ? 'rgba(139, 92, 246, 0.35)' 
                                  : '#272734'
                            }`,
                            borderRadius: '6px',
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'all 150ms ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {task.completed ? (
                              <CheckCircle2 size={16} color="#10B981" />
                            ) : (
                              <Circle size={16} color={task.isAdaptive ? "#8B5CF6" : "#475569"} />
                            )}
                            <div>
                              <span style={{ 
                                fontSize: '0.82rem', 
                                color: task.completed ? '#64748B' : '#F8FAFC',
                                textDecoration: task.completed ? 'line-through' : 'none',
                                marginRight: '8px'
                              }}>
                                {task.title}
                              </span>
                              {task.isAdaptive && (
                                <span 
                                  className="badge-clean primary" 
                                  style={{ 
                                    fontSize: '0.65rem',
                                    background: task.adaptiveType?.includes("Revision") ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                    color: task.adaptiveType?.includes("Revision") ? '#FB7185' : '#FCD34D',
                                    border: `1px solid ${task.adaptiveType?.includes("Revision") ? '#F43F5E40' : '#F59E0B40'}`
                                  }}
                                >
                                  ⚡ {task.adaptiveType || "Adaptive Task"}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="badge-clean primary">+{task.points} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curated Resources */}
                  {phase.resources && phase.resources.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>
                        Recommended Materials for this Sprint
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                        {phase.resources.map(res => (
                          <div 
                            key={res.id}
                            style={{
                              background: '#101017',
                              border: '1px solid #272734',
                              borderRadius: '6px',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <span className="badge-clean secondary">{res.type}</span>
                                <span style={{ fontSize: '0.72rem', color: '#F59E0B' }}>★ {res.rating}</span>
                              </div>
                              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#F8FAFC', marginBottom: '6px' }}>
                                {res.title}
                              </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #272734', paddingTop: '8px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                                <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                                {res.duration}
                              </span>
                              <button 
                                className="btn-saas btn-saas-secondary btn-saas-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTriggerToast(`Opened: ${res.title}`);
                                }}
                              >
                                <span>Study</span>
                                <ExternalLink size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
