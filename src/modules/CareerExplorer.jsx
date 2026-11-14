import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Target,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CAREER_REQUIREMENTS, calculateCareerMatch } from '../utils/careerEngine';

export default function CareerExplorer({ 
  studentData, 
  careerMatch,
  assessments,
  onSelectCareer, 
  setActiveModule, 
  onTriggerToast 
}) {
  const [selectedCareerId, setSelectedCareerId] = useState(studentData.targetCareerId || "fullstack");

  // Calculate dynamic match for the inspected career
  const inspectedMatch = calculateCareerMatch(
    studentData.skills, 
    assessments, 
    studentData.projects, 
    selectedCareerId
  );

  const careersList = Object.values(CAREER_REQUIREMENTS);

  const handleSetTarget = (careerId) => {
    onSelectCareer(careerId);
  };

  return (
    <div className="career-explorer-redesign">
      <div className="compact-page-header">
        <div>
          <h1 className="compact-title">Career Explorer & Role Architect</h1>
          <p className="compact-subtitle">
            Compare your live Python & SQL capabilities against 3 primary engineering disciplines.
          </p>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
          Current Active Target: <strong style={{ color: '#F8FAFC' }}>{careerMatch.career.title}</strong>
        </div>
      </div>

      {/* Select between Full Stack, Data Analyst, AI/ML Engineer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {careersList.map(career => {
          const match = calculateCareerMatch(studentData.skills, assessments, studentData.projects, career.id);
          const isSelected = selectedCareerId === career.id;
          const isCurrentActive = studentData.targetCareerId === career.id;

          return (
            <div
              key={career.id}
              onClick={() => setSelectedCareerId(career.id)}
              className="saas-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-primary)' : isCurrentActive ? '#10B981' : 'var(--border-color)',
                background: isSelected ? '#1A1A26' : 'var(--bg-card)',
                padding: '18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge-clean primary">{career.difficulty}</span>
                {isCurrentActive && (
                  <span className="badge-clean success">Current Active Goal</span>
                )}
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '2px' }}>
                {career.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '8px' }}>
                {career.category}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#8B5CF6' }}>
                  {match.readinessScore}%
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Weighted Readiness</span>
              </div>

              <div className="clean-progress" style={{ marginBottom: '8px' }}>
                <div 
                  className="clean-progress-fill" 
                  style={{ width: `${match.readinessScore}%` }}
                ></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>{match.strengths.length} Strengths</span>
                <span style={{ color: '#FB7185' }}>{match.missingSkills.length} Missing</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Career Deep Dive Details */}
      <div className="saas-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC' }}>
                {inspectedMatch.career.title}
              </h2>
              <span className="badge-clean neutral">{inspectedMatch.career.difficulty}</span>
              <span className="badge-clean secondary">Est. {inspectedMatch.career.estimatedWeeks}</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', maxWidth: '720px', lineHeight: 1.5 }}>
              {inspectedMatch.career.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {studentData.targetCareerId !== inspectedMatch.career.id ? (
              <button 
                className="btn-saas btn-saas-primary btn-saas-sm"
                onClick={() => handleSetTarget(inspectedMatch.career.id)}
              >
                <Target size={14} />
                <span>Switch to {inspectedMatch.career.title}</span>
              </button>
            ) : (
              <button className="btn-saas btn-saas-secondary btn-saas-sm" disabled style={{ color: '#10B981', borderColor: '#10B981' }}>
                <CheckCircle2 size={14} />
                <span>Active Target Career</span>
              </button>
            )}

            <button 
              className="btn-saas btn-saas-secondary btn-saas-sm"
              onClick={() => setActiveModule('roadmap')}
            >
              <span>View Dynamic Roadmap</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Dynamic Skill Requirements Breakdown */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#F8FAFC', fontWeight: 600 }}>
              Skill Requirements & Alex's Match Status
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              {inspectedMatch.strengths.length} Mastered • {inspectedMatch.weaknesses.length} Needs Practice • {inspectedMatch.missingSkills.length} Missing
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {inspectedMatch.requiredMatches.map((req, idx) => {
              const isMissing = req.status === 'Missing';
              const isMastered = req.status === 'Strength';

              return (
                <div 
                  key={idx}
                  style={{
                    background: '#101017',
                    border: '1px solid #272734',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isMastered ? (
                      <CheckCircle2 size={15} color="#10B981" />
                    ) : (
                      <AlertCircle size={15} color={isMissing ? '#F43F5E' : '#F59E0B'} />
                    )}
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 500 }}>
                        {req.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                        Required: {req.minProficiency}% • Weight: {req.weight}/3
                      </div>
                    </div>
                  </div>

                  <span className={`badge-clean ${isMastered ? 'success' : isMissing ? 'danger' : 'warning'}`}>
                    {req.userProficiency}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transferable Skills Section */}
        <div style={{ 
          background: '#101017', 
          border: '1px solid #272734', 
          borderRadius: '6px', 
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#F8FAFC', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} color="#38BDF8" /> Transferable Advantage for {inspectedMatch.career.title}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 2 }}>
              Your existing skills in {studentData.skills.map(s => s.name).join(', ')} transfer directly into this discipline.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {inspectedMatch.career.coreFrameworks.map((fw, i) => (
              <span key={i} className="badge-clean primary">{fw}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
