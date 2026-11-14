import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  BrainCircuit,
  Zap,
  Target,
  Sparkles,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { CAREER_REQUIREMENTS } from '../utils/careerEngine';

export default function SkillDNA({ 
  studentData, 
  careerMatch, 
  skillDna, 
  onSelectCareer, 
  setActiveModule,
  onTriggerToast 
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCompetencies = skillDna.dnaCompetencies.filter(item => {
    if (activeFilter === 'strengths') return item.status === 'Strength';
    if (activeFilter === 'missing') return item.status === 'Missing';
    if (activeFilter === 'weaknesses') return item.status === 'Weakness';
    if (activeFilter === 'risks') return item.quadrant === 'Overconfidence Risk';
    return true;
  });

  return (
    <div className="skill-dna-redesign">
      {/* Page Header */}
      <div className="compact-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="compact-title">Skill DNA — Cognitive Architecture & Gap Detector</h1>
            <span className="badge-clean primary" style={{ fontSize: '0.7rem' }}>
              Confidence vs. Demonstrated
            </span>
          </div>
          <p className="compact-subtitle">
            Evaluating your actual competence against the benchmark for <strong style={{ color: '#F8FAFC' }}>{careerMatch.career.title}</strong>.
          </p>
        </div>

        {/* Quick Career Target Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Target Career:</span>
          {Object.values(CAREER_REQUIREMENTS).map(career => {
            const isSelected = career.id === careerMatch.career.id;
            return (
              <button
                key={career.id}
                onClick={() => onSelectCareer(career.id)}
                style={{
                  background: isSelected ? 'var(--accent-primary)' : '#101017',
                  border: `1px solid ${isSelected ? 'var(--accent-primary)' : '#272734'}`,
                  color: isSelected ? '#fff' : '#94A3B8',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 600 : 400
                }}
              >
                {career.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="summary-grid-4">
        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Target Readiness</span>
            <BrainCircuit size={16} color="#8B5CF6" />
          </div>
          <div>
            <div className="summary-value">{careerMatch.readinessScore}%</div>
            <div className="summary-subtext">Weighted score for {careerMatch.career.title}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Validated Strengths</span>
            <ShieldCheck size={16} color="#10B981" />
          </div>
          <div>
            <div className="summary-value" style={{ color: '#10B981' }}>{careerMatch.strengths.length}</div>
            <div className="summary-subtext">Meets required benchmark threshold</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Missing Skills</span>
            <AlertTriangle size={16} color="#F43F5E" />
          </div>
          <div>
            <div className="summary-value" style={{ color: '#FB7185' }}>{careerMatch.missingSkills.length}</div>
            <div className="summary-subtext">Required by this career track</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Transferable Skills</span>
            <Zap size={16} color="#38BDF8" />
          </div>
          <div>
            <div className="summary-value" style={{ color: '#38BDF8' }}>{careerMatch.transferableSkills.length}</div>
            <div className="summary-subtext">High leverage across disciplines</div>
          </div>
        </div>
      </div>

      {/* Confidence vs Demonstrated Gap Detector */}
      <div className="saas-card" style={{ marginBottom: '24px' }}>
        <div className="saas-card-header" style={{ marginBottom: '14px' }}>
          <div>
            <h3 className="saas-card-title">Confidence-versus-Assessment Gap Detector</h3>
            <p className="saas-card-subtitle">
              Identifies discrepancies between self-rated confidence and verified demonstrated performance.
            </p>
          </div>

          <span className="badge-clean primary">
            {skillDna.quadrants.overconfidenceRisk.length} Verification Risks Flagged
          </span>
        </div>

        {/* 4 Quadrants Visual Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {/* 1. Calibrated Strength */}
          <div style={{ background: '#101017', border: '1px solid #272734', borderTop: '3px solid #10B981', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#10B981', marginBottom: '4px' }}>
              Calibrated Strength ({skillDna.quadrants.calibratedStrength.length})
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '8px' }}>
              High proficiency & high verified confidence.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {skillDna.quadrants.calibratedStrength.map(s => (
                <div key={s.id || s.name} style={{ fontSize: '0.75rem', color: '#F8FAFC', background: 'rgba(16, 185, 129, 0.08)', padding: '3px 6px', borderRadius: '3px' }}>
                  {s.name} ({s.userProficiency}%)
                </div>
              ))}
              {skillDna.quadrants.calibratedStrength.length === 0 && (
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>None currently</span>
              )}
            </div>
          </div>

          {/* 2. Overconfidence Risk */}
          <div style={{ background: '#101017', border: '1px solid #272734', borderTop: '3px solid #F59E0B', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#F59E0B', marginBottom: '4px' }}>
              Overconfidence Risk ({skillDna.quadrants.overconfidenceRisk.length})
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '8px' }}>
              High confidence but unverified or low score.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {skillDna.quadrants.overconfidenceRisk.map(s => (
                <div key={s.id || s.name} style={{ fontSize: '0.75rem', color: '#FCD34D', background: 'rgba(245, 158, 11, 0.08)', padding: '3px 6px', borderRadius: '3px' }}>
                  {s.name} ({s.userConfidence}% conf)
                </div>
              ))}
              {skillDna.quadrants.overconfidenceRisk.length === 0 && (
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>No blindspots</span>
              )}
            </div>
          </div>

          {/* 3. Imposter Syndrome */}
          <div style={{ background: '#101017', border: '1px solid #272734', borderTop: '3px solid #38BDF8', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#38BDF8', marginBottom: '4px' }}>
              Imposter Syndrome ({skillDna.quadrants.imposterSyndrome.length})
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '8px' }}>
              High tested score but low self-rating.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {skillDna.quadrants.imposterSyndrome.map(s => (
                <div key={s.id || s.name} style={{ fontSize: '0.75rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.08)', padding: '3px 6px', borderRadius: '3px' }}>
                  {s.name}
                </div>
              ))}
              {skillDna.quadrants.imposterSyndrome.length === 0 && (
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Well calibrated</span>
              )}
            </div>
          </div>

          {/* 4. Growth Zone */}
          <div style={{ background: '#101017', border: '1px solid #272734', borderTop: '3px solid #FB7185', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FB7185', marginBottom: '4px' }}>
              Growth Zone ({skillDna.quadrants.growthZone.length})
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '8px' }}>
              Emerging or missing skills to be developed.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {skillDna.quadrants.growthZone.slice(0, 3).map(s => (
                <div key={s.id || s.name} style={{ fontSize: '0.75rem', color: '#FB7185', background: 'rgba(244, 63, 94, 0.08)', padding: '3px 6px', borderRadius: '3px' }}>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Detailed Competency Breakdown (Col 8) vs AI Insights (Col 4) */}
      <div className="grid-12">
        <div className="col-8">
          <div className="saas-card">
            <div className="saas-card-header">
              <div>
                <h3 className="saas-card-title">Competency vs Industry Benchmark</h3>
                <p className="saas-card-subtitle">
                  {careerMatch.career.title} core requirement breakdown.
                </p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {[
                  { id: 'all', label: `All (${skillDna.dnaCompetencies.length})` },
                  { id: 'strengths', label: `Strengths (${careerMatch.strengths.length})` },
                  { id: 'weaknesses', label: `Weaknesses (${careerMatch.weaknesses.length})` },
                  { id: 'missing', label: `Missing (${careerMatch.missingSkills.length})` },
                  { id: 'risks', label: `Risks (${skillDna.quadrants.overconfidenceRisk.length})` }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      background: activeFilter === f.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                      border: `1px solid ${activeFilter === f.id ? 'rgba(139, 92, 246, 0.4)' : '#272734'}`,
                      color: activeFilter === f.id ? '#F8FAFC' : '#94A3B8',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredCompetencies.map((item, idx) => {
                const isStrength = item.status === 'Strength';
                const isMissing = item.status === 'Missing';

                return (
                  <div key={idx} style={{ background: '#101017', border: '1px solid #272734', borderRadius: '6px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F8FAFC' }}>{item.name}</span>
                        {item.isVerified && (
                          <span title="Verified by assessment/project">
                            <ShieldCheck size={13} color="#10B981" />
                          </span>
                        )}
                        <span className={`badge-clean ${isStrength ? 'success' : isMissing ? 'danger' : 'warning'}`}>
                          {item.status}
                        </span>
                        <span className="badge-clean primary" style={{ fontSize: '0.65rem' }}>
                          Weight: {item.weight}/3
                        </span>
                      </div>

                      <div style={{ fontSize: '0.78rem' }}>
                        <span style={{ color: isStrength ? '#10B981' : isMissing ? '#FB7185' : '#38BDF8', fontWeight: 600 }}>
                          {item.userProficiency}%
                        </span>
                        <span style={{ color: '#64748B' }}> / {item.minProficiency}% req</span>
                      </div>
                    </div>

                    <div style={{ position: 'relative', height: 6, background: '#272734', borderRadius: 9999, margin: '6px 0', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          width: `${item.userProficiency}%`,
                          background: isStrength ? '#10B981' : isMissing ? '#F43F5E' : '#38BDF8',
                          borderRadius: 9999
                        }}
                      ></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                      <span>{item.description}</span>
                      <span style={{ color: item.quadrantColor }}>
                        {item.quadrant}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Transferable Skills */}
        <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="saas-card">
            <h3 className="saas-card-title" style={{ marginBottom: '14px' }}>
              Dynamic Skill DNA Insights
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skillDna.insights.map((insight, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#101017',
                    border: '1px solid #272734',
                    borderRadius: '6px',
                    padding: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span className={`badge-clean ${insight.type === 'Superpower' ? 'success' : insight.type === 'Risk' ? 'warning' : 'primary'}`}>
                      {insight.type}
                    </span>
                    <strong style={{ fontSize: '0.8rem', color: '#F8FAFC' }}>{insight.title}</strong>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.5 }}>
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>

            <button 
              className="btn-saas btn-saas-primary btn-saas-sm" 
              style={{ width: '100%', marginTop: '14px' }}
              onClick={() => setActiveModule('roadmap')}
            >
              Update Learning Roadmap
            </button>
          </div>

          {/* Transferable Skills Highlight */}
          <div className="saas-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Zap size={15} color="#38BDF8" />
              <h3 className="saas-card-title">Transferable Capital</h3>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '10px' }}>
              When switching between Full Stack, Data Analyst, or AI/ML, these core skills retain full value:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {careerMatch.transferableSkills.map(t => (
                <div key={t.id || t.name} style={{ background: '#101017', border: '1px solid #272734', padding: '6px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F8FAFC', fontWeight: 500 }}>
                    <span>{t.name}</span>
                    <span style={{ color: '#10B981' }}>{t.proficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
