import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  GraduationCap, 
  Code2, 
  Target, 
  Clock, 
  Bot, 
  Plus, 
  Trash2,
  Play
} from 'lucide-react';
import { CAREER_REQUIREMENTS } from '../utils/careerEngine';

export default function OnboardingWizard({ 
  initialUser, 
  onComplete, 
  onSkipToDemo 
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State: Background & Interests
  const [name, setName] = useState(initialUser?.name || '');
  const [education, setEducation] = useState('Computer Science Student');
  const [selectedInterests, setSelectedInterests] = useState(['Full Stack Web', 'Artificial Intelligence & LLMs']);

  // Step 2 State: Existing Skills
  const [skills, setSkills] = useState([
    { id: 's1', name: 'Python', category: 'Backend / Scripting', proficiency: 80, confidence: 85, verified: false },
    { id: 's2', name: 'SQL', category: 'Database', proficiency: 70, confidence: 75, verified: false },
    { id: 's3', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 50, confidence: 60, verified: false }
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');

  // Step 3 State: Career Target & Preferences
  const [targetCareerId, setTargetCareerId] = useState('fullstack');
  const [weeklyHours, setWeeklyHours] = useState(18);
  const [mentorPersona, setMentorPersona] = useState('Archie');

  // Validation errors
  const [error, setError] = useState('');

  const interestOptions = [
    'Full Stack Web',
    'Data Analysis & BI',
    'Artificial Intelligence & LLMs',
    'Cloud & DevOps',
    'Backend Microservices',
    'Database Engineering'
  ];

  const educationOptions = [
    'Computer Science Student',
    'Self-Taught Developer',
    'Bootcamp Graduate',
    'Working Professional / Data Analyst',
    'Career Changer'
  ];

  const mentorOptions = [
    {
      name: 'Archie',
      role: 'Lead Career Architect',
      desc: 'Strategic, milestone-focused, tracks labor market requirements.'
    },
    {
      name: 'Socrates',
      role: 'Cognitive & Mindset Coach',
      desc: 'Socratic questioning, reduces imposter syndrome, builds persistence.'
    },
    {
      name: 'Codex',
      role: 'Code & Architecture Reviewer',
      desc: 'Rigorous technical audits, code efficiency, algorithmic focus.'
    }
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setSkills([
      ...skills,
      {
        id: `s-${Date.now()}`,
        name: newSkillName.trim(),
        category: newSkillCategory,
        proficiency: 60,
        confidence: 65,
        verified: false
      }
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const updateSkillValue = (id, field, value) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: Number(value) } : s));
  };

  const handleNext = () => {
    setError('');
    if (currentStep === 1) {
      if (!name.trim()) {
        setError('Please enter your full name to personalize your architecture.');
        return;
      }
      if (selectedInterests.length === 0) {
        setError('Please select at least one primary interest area.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (skills.length === 0) {
        setError('Please add at least one existing skill or baseline.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Build final student object and complete onboarding
      const selectedCareer = CAREER_REQUIREMENTS[targetCareerId] || CAREER_REQUIREMENTS['fullstack'];

      const finalStudent = {
        name: name.trim(),
        handle: `@${name.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || 'coder'}`,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        currentRole: education,
        targetRole: selectedCareer.title,
        targetCareerId: targetCareerId,
        location: "Remote / Hybrid",
        bio: `${education} aiming for ${selectedCareer.title}. Focus areas: ${selectedInterests.join(', ')}. Mentored by ${mentorPersona}.`,
        weeklyStudyHours: weeklyHours,
        streakDays: 1,
        completedTaskIds: ["fs-t101"],
        skills: skills.map(s => ({ ...s, verified: false })), // newly self-reported
        mentorPersona: mentorPersona
      };

      onComplete(finalStudent);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '32px 16px'
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 6,
          background: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}>
          <Sparkles size={16} />
        </div>
        <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F8FAFC' }}>SkillPilot AI</span>
        <span className="badge-clean primary" style={{ marginLeft: 4 }}>Student Onboarding</span>
      </div>

      {/* Main Wizard Card */}
      <div className="saas-card" style={{ width: '100%', maxWidth: 580, padding: 32, background: 'var(--bg-card)' }}>
        
        {/* Step Indicator Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Step {currentStep} of 3
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {currentStep === 1 ? 'Background & Interests' : currentStep === 2 ? 'Existing Skills' : 'Career Target & Mentor'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="clean-progress" style={{ height: 4, marginBottom: 24 }}>
          <div 
            className="clean-progress-fill" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 6,
            padding: '8px 12px',
            fontSize: '0.78rem',
            color: '#FB7185',
            marginBottom: 16
          }}>
            {error}
          </div>
        )}

        {/* ================= STEP 1: Background & Interests ================= */}
        {currentStep === 1 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
              Tell us about yourself
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 20 }}>
              Archie will calibrate your initial learning pace based on your background.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
                  Full Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Jordan Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    padding: '8px 12px',
                    color: '#F8FAFC',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
                  Current Education / Background
                </label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    padding: '8px 12px',
                    color: '#F8FAFC',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                >
                  {educationOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 8 }}>
                  Primary Technical Interests (Select all that apply)
                </label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {interestOptions.map((interest, idx) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        style={{
                          background: isSelected ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-input)',
                          border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                          color: isSelected ? '#F8FAFC' : '#94A3B8',
                          padding: '6px 12px',
                          borderRadius: 6,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        {isSelected && <Check size={12} color="#8B5CF6" />}
                        <span>{interest}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: Existing Skills & Confidence ================= */}
        {currentStep === 2 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
              Your current skill baseline
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 18 }}>
              Tune your existing proficiency and confidence. Self-reported skills will be flagged for diagnostic verification.
            </p>

            {/* List of Skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 250, overflowY: 'auto', marginBottom: 18, paddingRight: 4 }}>
              {skills.map((skill) => (
                <div key={skill.id} style={{ background: '#101017', border: '1px solid #272734', borderRadius: 6, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>{skill.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', marginLeft: 8 }}>({skill.category})</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveSkill(skill.id)}
                      style={{ background: 'none', border: 'none', color: '#FB7185', cursor: 'pointer', padding: 2 }}
                      title="Remove skill"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginBottom: 2 }}>
                        <span>Proficiency</span>
                        <span style={{ color: '#10B981', fontWeight: 600 }}>{skill.proficiency}%</span>
                      </div>
                      <input 
                        type="range"
                        min="5"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) => updateSkillValue(skill.id, 'proficiency', e.target.value)}
                        style={{ width: '100%', accentColor: '#10B981' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginBottom: 2 }}>
                        <span>Confidence</span>
                        <span style={{ color: '#38BDF8', fontWeight: 600 }}>{skill.confidence}%</span>
                      </div>
                      <input 
                        type="range"
                        min="5"
                        max="100"
                        value={skill.confidence}
                        onChange={(e) => updateSkillValue(skill.id, 'confidence', e.target.value)}
                        style={{ width: '100%', accentColor: '#38BDF8' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Custom Skill */}
            <form onSubmit={handleAddCustomSkill} style={{ display: 'flex', gap: 8 }}>
              <input 
                type="text"
                placeholder="Add another skill (e.g. Git, Docker, Pandas)..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '6px 10px',
                  color: '#F8FAFC',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-saas btn-saas-secondary btn-saas-sm">
                <Plus size={13} />
                <span>Add</span>
              </button>
            </form>
          </div>
        )}

        {/* ================= STEP 3: Career Target & Mentor ================= */}
        {currentStep === 3 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
              Choose your target career track
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 16 }}>
              The roadmap generator will immediately target gaps for this specific discipline.
            </p>

            {/* 3 Career Choices */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
              {Object.values(CAREER_REQUIREMENTS).map((career) => {
                const isSelected = targetCareerId === career.id;
                return (
                  <div
                    key={career.id}
                    onClick={() => setTargetCareerId(career.id)}
                    style={{
                      background: isSelected ? 'rgba(139, 92, 246, 0.12)' : '#101017',
                      border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      borderRadius: 8,
                      padding: '12px 10px',
                      cursor: 'pointer',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isSelected ? '#F8FAFC' : '#94A3B8', marginBottom: 2 }}>
                      {career.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                      {career.difficulty} • {career.estimatedWeeks}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Weekly Study Hours */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
                <span>Weekly Study Commitment</span>
                <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{weeklyHours} hrs / week</span>
              </div>
              <input 
                type="range"
                min="5"
                max="40"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#8B5CF6' }}
              />
            </div>

            {/* Preferred Mentor Personality */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 8 }}>
                Select AI Mentor Personality
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {mentorOptions.map((m) => {
                  const isSelected = mentorPersona === m.name;
                  return (
                    <div
                      key={m.name}
                      onClick={() => setMentorPersona(m.name)}
                      style={{
                        background: isSelected ? 'rgba(139, 92, 246, 0.12)' : '#101017',
                        border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        borderRadius: 6,
                        padding: '10px 8px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F8FAFC' }}>
                        {m.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: 2 }}>
                        {m.role}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
          <div>
            {currentStep > 1 ? (
              <button 
                type="button" 
                className="btn-saas btn-saas-secondary btn-saas-sm"
                onClick={handleBack}
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            ) : (
              <button 
                type="button" 
                onClick={onSkipToDemo}
                style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Skip to Demo
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              type="button" 
              className="btn-saas btn-saas-primary"
              onClick={handleNext}
            >
              <span>{currentStep === 3 ? 'Launch My Career Dashboard' : 'Continue'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
