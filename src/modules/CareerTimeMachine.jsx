import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sliders
} from 'lucide-react';
import { timeMachineScenarios } from '../data/mockData';

export default function CareerTimeMachine({ 
  studentData, 
  careerMatch,
  onSelectCareer,
  setActiveModule, 
  onTriggerToast 
}) {
  const [selectedPathId, setSelectedPathId] = useState('fullstack-fast');
  const [timelinePeriod, setTimelinePeriod] = useState(2);

  const selectedScenario = timeMachineScenarios.find(s => s.id === selectedPathId) || timeMachineScenarios[0];
  const currentMilestone = selectedScenario.milestones[timelinePeriod] || selectedScenario.milestones[0];

  const timePeriods = ["Month 2", "Month 4", "Month 6", "Year 2"];

  const handleAdoptPath = () => {
    if (selectedScenario.id === 'fullstack-fast') {
      onSelectCareer('fullstack');
    } else if (selectedScenario.id === 'ai-engineer') {
      onSelectCareer('ai-ml');
    } else {
      onSelectCareer('data-analyst');
    }
    onTriggerToast(`Adopted ${selectedScenario.name}. Roadmap updated.`);
    setActiveModule('roadmap');
  };

  return (
    <div className="time-machine-redesign">
      <div className="compact-page-header">
        <div>
          <h1 className="compact-title">Career Time Machine — Future Path Simulator</h1>
          <p className="compact-subtitle">
            Simulate how your current Python & SQL skill stack ({studentData.skills.length} tracked skills) diverges across engineering pathways.
          </p>
        </div>
      </div>

      {/* 3 Trajectory Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {timeMachineScenarios.map(path => {
          const isSelected = selectedPathId === path.id;

          return (
            <div
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className="saas-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                background: isSelected ? '#1A1A26' : 'var(--bg-card)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge-clean primary">{path.difficulty}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#10B981' }}>
                  {path.targetSalary}
                </span>
              </div>

              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '2px' }}>
                {path.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '10px' }}>
                {path.subtitle}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', borderTop: '1px solid #272734', paddingTop: '8px' }}>
                <span>{path.durationMonths} Months</span>
                <span>{path.effortHoursPerWeek} hrs/week</span>
                <span>{path.placementRate} rate</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Scrubbing */}
      <div className="saas-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={15} color="#8B5CF6" />
            <h3 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC' }}>Timeline Horizon</h3>
          </div>
          <span className="badge-clean primary">
            Simulating: {timePeriods[timelinePeriod]}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {timePeriods.map((tp, idx) => (
            <button
              key={idx}
              onClick={() => setTimelinePeriod(idx)}
              style={{
                background: timelinePeriod === idx ? 'var(--accent-primary)' : '#101017',
                border: `1px solid ${timelinePeriod === idx ? 'var(--accent-primary)' : '#272734'}`,
                color: '#fff',
                padding: '8px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: timelinePeriod === idx ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Projection Summary Card */}
      <div className="saas-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <span className="badge-clean secondary" style={{ marginBottom: '6px' }}>
              Milestone at {currentMilestone.period}
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC' }}>
              {currentMilestone.title}
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.82rem', maxWidth: '640px', marginTop: '4px' }}>
              {selectedScenario.summary}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 600, color: '#10B981' }}>
              {currentMilestone.salaryEst}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8B5CF6' }}>Readiness: {currentMilestone.readiness}</div>
          </div>
        </div>

        {/* Milestone Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {selectedScenario.milestones.map((m, idx) => {
            const isCurrent = idx === timelinePeriod;
            return (
              <div 
                key={idx}
                onClick={() => setTimelinePeriod(idx)}
                style={{
                  background: isCurrent ? 'rgba(139, 92, 246, 0.1)' : '#101017',
                  border: `1px solid ${isCurrent ? 'var(--accent-primary)' : '#272734'}`,
                  borderRadius: '6px',
                  padding: '10px 12px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '2px' }}>
                  <span style={{ color: isCurrent ? '#8B5CF6' : '#64748B', fontWeight: 600 }}>{m.period}</span>
                  <span style={{ color: '#10B981' }}>{m.salaryEst}</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#F8FAFC' }}>
                  {m.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pros & Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: '6px', padding: '14px' }}>
            <div style={{ color: '#10B981', fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> Advantages
            </div>
            <ul style={{ paddingLeft: '16px', color: '#94A3B8', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {selectedScenario.pros.map((pro, idx) => (
                <li key={idx}>{pro}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: '6px', padding: '14px' }}>
            <div style={{ color: '#FB7185', fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> Trade-offs
            </div>
            <ul style={{ paddingLeft: '16px', color: '#94A3B8', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {selectedScenario.cons.map((con, idx) => (
                <li key={idx}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn-saas btn-saas-primary btn-saas-sm"
            onClick={handleAdoptPath}
          >
            <span>Adopt This Path in Roadmap</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
