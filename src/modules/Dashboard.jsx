import React from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Dashboard({ 
  studentData, 
  careerMatch,
  skillDna,
  roadmapPhases,
  setActiveModule,
  onToggleRoadmapTask
}) {
  const activePhase = roadmapPhases.find(p => p.status === "Active Sprint") || roadmapPhases[0];

  // Derived tasks progress
  const totalTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const curriculumPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard-redesign">
      {/* Compact Clean Header with Dynamic Target */}
      <div className="compact-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="compact-title">Good morning, {studentData.name.split(' ')[0]}</h1>
            <span className="badge-clean primary" style={{ fontSize: '0.7rem' }}>
              Dynamic Skill Engine
            </span>
          </div>
          <p className="compact-subtitle">
            Progression toward <strong style={{ color: '#F8FAFC' }}>{careerMatch.career.title}</strong> based on {studentData.skills.length} tracked skills.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-saas btn-saas-secondary"
            onClick={() => setActiveModule('skill-dna')}
          >
            Skill DNA ({skillDna.strengthsCount} Strengths)
          </button>
          <button 
            className="btn-saas btn-saas-primary"
            onClick={() => setActiveModule('roadmap')}
          >
            <span>Resume {activePhase?.title.split(':')[0] || 'Roadmap'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Clean Summary Cards (All 100% Derived) */}
      <div className="summary-grid-4">
        {/* 1. Career Readiness */}
        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Career Readiness</span>
            <Target className="summary-icon" color="#8B5CF6" />
          </div>
          <div>
            <div className="summary-value">{careerMatch.readinessScore}%</div>
            <div className="clean-progress">
              <div className="clean-progress-fill" style={{ width: `${careerMatch.readinessScore}%` }}></div>
            </div>
            <div className="summary-subtext" style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={12} />
              <span>Weighted across {careerMatch.totalRequirementsCount} requirements</span>
            </div>
          </div>
        </div>

        {/* 2. Skills Mastered */}
        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Skills Mastered</span>
            <CheckCircle2 className="summary-icon" color="#10B981" />
          </div>
          <div>
            <div className="summary-value" style={{ color: '#10B981' }}>{careerMatch.strengths.length}</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              {careerMatch.strengths.slice(0, 3).map(s => (
                <span key={s.id || s.name} className="badge-clean success" style={{ fontSize: '0.68rem' }}>
                  {s.name.split(' ')[0]}
                </span>
              ))}
              {careerMatch.strengths.length === 0 && (
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>None yet for this track</span>
              )}
            </div>
            <div className="summary-subtext" style={{ marginTop: '8px' }}>
              Meets {careerMatch.career.title} standards
            </div>
          </div>
        </div>

        {/* 3. Skills to Learn / Missing */}
        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Missing Skills & Gaps</span>
            <AlertCircle className="summary-icon" color="#F43F5E" />
          </div>
          <div>
            <div className="summary-value" style={{ color: '#FB7185' }}>
              {careerMatch.missingSkills.length + careerMatch.weaknesses.length}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              {careerMatch.missingSkills.slice(0, 3).map(s => (
                <span key={s.id || s.name} className="badge-clean danger" style={{ fontSize: '0.68rem' }}>
                  {s.name.split(' ')[0]}
                </span>
              ))}
            </div>
            <div className="summary-subtext" style={{ marginTop: '8px' }}>
              {careerMatch.missingSkills.length} missing • {careerMatch.weaknesses.length} needs practice
            </div>
          </div>
        </div>

        {/* 4. Learning Progress */}
        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Curriculum Progress</span>
            <BookOpen className="summary-icon" color="#38BDF8" />
          </div>
          <div>
            <div className="summary-value">
              {completedTasks} <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 400 }}>/ {totalTasks}</span>
            </div>
            <div className="clean-progress">
              <div 
                className="clean-progress-fill secondary" 
                style={{ width: `${curriculumPercentage}%` }}
              ></div>
            </div>
            <div className="summary-subtext" style={{ marginTop: '4px' }}>
              {curriculumPercentage}% of generated tasks complete
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Dynamic Roadmap & Gap Analysis (Col 8) + Sidebar Cards (Col 4) */}
      <div className="grid-12">
        {/* Left Column (8 cols): Career Roadmap + Skill Gap Analysis */}
        <div className="col-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Dynamic Active Roadmap Panel */}
          <div className="saas-card">
            <div className="saas-card-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-clean primary">{activePhase?.status || 'Active'}</span>
                  <h3 className="saas-card-title">{activePhase?.title}</h3>
                </div>
                <p className="saas-card-subtitle">
                  Tailored milestone tasks specifically addressing your priority gaps for {careerMatch.career.title}.
                </p>
              </div>

              <button 
                className="btn-saas btn-saas-secondary btn-saas-sm"
                onClick={() => setActiveModule('roadmap')}
              >
                View All {roadmapPhases.length} Phases
              </button>
            </div>

            {/* Checklist tasks from dynamic roadmap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activePhase?.tasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => onToggleRoadmapTask(task.id)}
                  style={{ 
                    background: task.completed ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255, 255, 255, 0.02)', 
                    border: `1px solid ${task.completed ? 'rgba(16, 185, 129, 0.25)' : '#272734'}`, 
                    borderRadius: '8px', 
                    padding: '12px 14px',
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
                      <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #8B5CF6' }}></div>
                    )}
                    <span style={{ 
                      fontSize: '0.85rem', 
                      color: task.completed ? '#64748B' : '#F8FAFC',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      fontWeight: task.completed ? 400 : 500
                    }}>
                      {task.title}
                    </span>
                  </div>
                  <span className={`badge-clean ${task.completed ? 'success' : 'primary'}`}>
                    {task.completed ? 'Done' : `+${task.points} XP`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Skill Gap Analysis Visualization */}
          <div className="saas-card">
            <div className="saas-card-header">
              <div>
                <h3 className="saas-card-title">Skill Gap Analysis ({careerMatch.career.title})</h3>
                <p className="saas-card-subtitle">
                  Demonstrated proficiency versus target benchmark for this career.
                </p>
              </div>

              <button 
                className="btn-saas btn-saas-secondary btn-saas-sm"
                onClick={() => setActiveModule('skill-dna')}
              >
                Deep DNA
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {careerMatch.requiredMatches.map((item, idx) => {
                const isStrength = item.status === 'Strength';
                const isMissing = item.status === 'Missing';
                const isWeakness = item.status === 'Weakness';

                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#F8FAFC', fontWeight: 500 }}>{item.name}</span>
                        {item.isVerified && (
                          <span title="Verified by project/quiz">
                            <ShieldCheck size={13} color="#10B981" />
                          </span>
                        )}
                        <span className={`badge-clean ${isStrength ? 'success' : isMissing ? 'danger' : 'warning'}`} style={{ fontSize: '0.65rem' }}>
                          {item.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: isStrength ? '#10B981' : isMissing ? '#FB7185' : '#FCD34D', fontWeight: 600 }}>
                          {item.userProficiency}%
                        </span>
                        <span style={{ color: '#64748B' }}>/ {item.minProficiency}% req</span>
                      </div>
                    </div>

                    <div style={{ position: 'relative', height: 6, background: '#272734', borderRadius: 9999, overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          width: `${item.userProficiency}%`,
                          background: isStrength ? '#10B981' : isMissing ? '#F43F5E' : '#F59E0B',
                          borderRadius: 9999
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): AI Mentor Insight & Transferable Skills */}
        <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Transferable Skills Card */}
          <div className="saas-card">
            <div className="saas-card-header" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#38BDF8" />
                <h3 className="saas-card-title">Transferable Skills</h3>
              </div>
              <span className="badge-clean secondary">{careerMatch.transferableSkills.length} Identified</span>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '12px' }}>
              High-value capabilities you already possess that accelerate learning across software tracks:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {careerMatch.transferableSkills.map(t => (
                <div key={t.id || t.name} style={{ background: '#101017', border: '1px solid #272734', borderRadius: '6px', padding: '8px 10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F8FAFC' }}>{t.name}</span>
                    <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>{t.proficiency}% Proficient</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.3 }}>
                    {t.transferReason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentor Insight */}
          <div className="saas-card">
            <div className="saas-card-header" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#8B5CF6" />
                <h3 className="saas-card-title">AI Mentor Insight</h3>
              </div>
              <span className="badge-clean primary">Archie</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '16px' }}>
              {skillDna.insights[0]?.text || "Your analytical base provides a direct on-ramp to production architectures."}
            </p>

            <button 
              className="btn-saas btn-saas-secondary btn-saas-sm" 
              style={{ width: '100%' }}
              onClick={() => setActiveModule('ai-mentor')}
            >
              Ask Archie a Question
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
