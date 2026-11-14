import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Award, 
  FolderGit2, 
  Plus, 
  CheckCircle2, 
  ExternalLink, 
  Code2, 
  Edit3,
  Trash2,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  X
} from 'lucide-react';
import { isSkillVerified } from '../utils/careerEngine';

export default function Profile({ 
  studentData, 
  setStudentData, 
  onAddSkill,
  onEditSkill,
  onRemoveSkill,
  assessments,
  onResetData,
  onTriggerToast 
}) {
  const [activeTab, setActiveTab] = useState('skills');
  const [newGoalText, setNewGoalText] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(studentData.bio);

  // Skill Modal State (for Add or Edit)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 60,
    confidence: 65
  });

  const handleOpenAddSkill = () => {
    setEditingSkillId(null);
    setSkillForm({
      name: '',
      category: 'Frontend',
      proficiency: 60,
      confidence: 65
    });
    setIsSkillModalOpen(true);
  };

  const handleOpenEditSkill = (skill) => {
    setEditingSkillId(skill.id);
    setSkillForm({
      name: skill.name,
      category: skill.category || 'Frontend',
      proficiency: skill.proficiency,
      confidence: skill.confidence || skill.proficiency
    });
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    if (editingSkillId) {
      onEditSkill({
        id: editingSkillId,
        name: skillForm.name.trim(),
        category: skillForm.category,
        proficiency: Number(skillForm.proficiency),
        confidence: Number(skillForm.confidence),
        verified: studentData.skills.find(s => s.id === editingSkillId)?.verified || false
      });
    } else {
      onAddSkill({
        name: skillForm.name.trim(),
        category: skillForm.category,
        proficiency: Number(skillForm.proficiency),
        confidence: Number(skillForm.confidence),
        verified: false
      });
    }

    setIsSkillModalOpen(false);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const newGoal = {
      id: `g${Date.now()}`,
      text: newGoalText.trim(),
      targetDate: "Next 3 Months",
      status: "Active Focus"
    };
    setStudentData(prev => ({
      ...prev,
      careerGoals: [...prev.careerGoals, newGoal]
    }));
    setNewGoalText('');
    onTriggerToast("Milestone added to your plan.");
  };

  const handleToggleGoal = (id) => {
    setStudentData(prev => ({
      ...prev,
      careerGoals: prev.careerGoals.map(g => {
        if (g.id === id) {
          const nextStatus = g.status === "Completed" ? "Active Focus" : "Completed";
          return { ...g, status: nextStatus };
        }
        return g;
      })
    }));
  };

  const handleSaveBio = () => {
    setStudentData(prev => ({ ...prev, bio: bioText }));
    setIsEditingBio(false);
    onTriggerToast("Profile updated.");
  };

  return (
    <div className="profile-redesign">
      {/* Header Profile Card */}
      <div className="saas-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img 
            src={studentData.avatar} 
            alt={studentData.name}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid #272734'
            }}
          />

          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#F8FAFC' }}>{studentData.name}</h1>
              <span className="badge-clean primary">{studentData.handle}</span>
              <span className="badge-clean secondary">{studentData.targetRole} Candidate</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: '#94A3B8', fontSize: '0.8rem', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={13} color="#64748B" /> {studentData.currentRole}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="#64748B" /> {studentData.location}
              </span>
            </div>

            {isEditingBio ? (
              <div style={{ marginTop: '8px' }}>
                <textarea 
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    background: '#101017',
                    border: '1px solid #272734',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#F8FAFC',
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <button className="btn-saas btn-saas-primary btn-saas-sm" onClick={handleSaveBio}>Save</button>
                  <button className="btn-saas btn-saas-secondary btn-saas-sm" onClick={() => setIsEditingBio(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ color: '#94A3B8', fontSize: '0.82rem', maxWidth: '720px' }}>
                  {studentData.bio}
                </p>
                <button 
                  onClick={() => setIsEditingBio(true)}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 2 }}
                >
                  <Edit3 size={13} />
                </button>
              </div>
            )}
          </div>

          <div>
            <button 
              className="btn-saas btn-saas-secondary btn-saas-sm"
              onClick={onResetData}
              title="Reset state to initial test baseline (Python, SQL, Basic HTML)"
            >
              <RotateCcw size={13} />
              <span>Reset Baseline</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '20px', borderTop: '1px solid #272734', paddingTop: '14px' }}>
          {[
            { id: 'skills', label: 'Skills & Proficiencies', icon: Code2, count: studentData.skills.length },
            { id: 'projects', label: 'Verified Projects', icon: FolderGit2, count: studentData.projects.length },
            { id: 'certifications', label: 'Certifications', icon: Award, count: studentData.certifications.length },
            { id: 'goals', label: 'Milestones & Goals', icon: CheckCircle2, count: studentData.careerGoals.length },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(139, 92, 246, 0.3)' : 'transparent'}`,
                  color: isActive ? '#F8FAFC' : '#94A3B8',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                <Icon size={14} color={isActive ? '#8B5CF6' : '#64748B'} />
                <span>{tab.label}</span>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>({tab.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Skills Inventory with Add/Edit/Remove */}
      {activeTab === 'skills' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F8FAFC' }}>
                Skills Inventory ({studentData.skills.length})
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                Verified via assessment/projects or self-reported. Self-reported skills are weighted at 75% until assessed.
              </p>
            </div>

            <button 
              className="btn-saas btn-saas-primary btn-saas-sm"
              onClick={handleOpenAddSkill}
            >
              <Plus size={14} />
              <span>Add Skill</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {studentData.skills.map(skill => {
              const verified = isSkillVerified(skill, assessments, studentData.projects);

              return (
                <div key={skill.id} className="saas-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC' }}>
                        {skill.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        {skill.category || 'General'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`badge-clean ${verified ? 'success' : 'neutral'}`} style={{ fontSize: '0.68rem' }}>
                        {verified ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <ShieldCheck size={11} /> Verified
                          </span>
                        ) : (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <AlertCircle size={11} /> Self-Reported
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px' }}>
                    <span>Proficiency</span>
                    <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{skill.proficiency}%</span>
                  </div>
                  <div className="clean-progress">
                    <div 
                      className="clean-progress-fill" 
                      style={{ 
                        width: `${skill.proficiency}%`,
                        background: skill.proficiency >= 70 ? '#10B981' : skill.proficiency >= 50 ? '#38BDF8' : '#F59E0B'
                      }}
                    ></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #272734' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      Confidence: <strong style={{ color: '#F8FAFC' }}>{skill.confidence || skill.proficiency}%</strong>
                    </span>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => handleOpenEditSkill(skill)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}
                        title="Edit skill"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button 
                        onClick={() => onRemoveSkill(skill.id)}
                        style={{ background: 'none', border: 'none', color: '#FB7185', cursor: 'pointer', padding: 4 }}
                        title="Remove skill"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Projects */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {studentData.projects.map(project => (
            <div key={project.id} className="saas-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: '#F8FAFC', fontWeight: 600 }}>{project.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="badge-clean primary">{t}</span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#10B981' }}>
                    {project.verifiedScore} / 100
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Codex Audit Score</div>
                </div>
              </div>

              <p style={{ color: '#94A3B8', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '12px' }}>
                {project.description}
              </p>

              <div style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid #272734', 
                borderRadius: '6px', 
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem'
              }}>
                <span style={{ color: '#C084FC' }}><strong>Impact:</strong> {project.impact}</span>
                <span style={{ color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{project.github}</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Certifications */}
      {activeTab === 'certifications' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {studentData.certifications.map(cert => (
            <div key={cert.id} className="saas-card">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '6px', 
                  background: 'rgba(139, 92, 246, 0.1)', 
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8B5CF6'
                }}>
                  <Award size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', color: '#F8FAFC', fontWeight: 600 }}>{cert.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{cert.issuer} • {cert.date}</div>
                </div>
              </div>

              <div style={{ 
                background: '#101017', 
                padding: '8px 12px', 
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                border: '1px solid #272734'
              }}>
                <span style={{ color: '#64748B' }}>ID: {cert.credentialId}</span>
                <span style={{ color: '#10B981', fontWeight: 500 }}>{cert.grade}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Goals */}
      {activeTab === 'goals' && (
        <div>
          <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder="Add a new milestone..."
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              style={{
                flex: 1,
                background: '#101017',
                border: '1px solid #272734',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#F8FAFC',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-saas btn-saas-primary btn-saas-sm">
              <Plus size={14} />
              <span>Add</span>
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {studentData.careerGoals.map((goal) => {
              const isCompleted = goal.status === "Completed";
              return (
                <div 
                  key={goal.id} 
                  className="saas-card" 
                  style={{ 
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleToggleGoal(goal.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: 18, 
                      height: 18, 
                      borderRadius: '4px', 
                      border: `1px solid ${isCompleted ? '#10B981' : '#475569'}`,
                      background: isCompleted ? '#10B981' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isCompleted && <CheckCircle2 size={14} color="#09090F" />}
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 500, 
                        color: isCompleted ? '#64748B' : '#F8FAFC',
                        textDecoration: isCompleted ? 'line-through' : 'none'
                      }}>
                        {goal.text}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Target: {goal.targetDate}</div>
                    </div>
                  </div>

                  <span className={`badge-clean ${isCompleted ? 'success' : 'primary'}`}>
                    {goal.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Skill */}
      {isSkillModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px'
        }}>
          <div className="saas-card" style={{ width: '100%', maxWidth: '440px', background: '#16161F', border: '1px solid #38384D', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F8FAFC' }}>
                {editingSkillId ? 'Edit Tracked Skill' : 'Add New Skill'}
              </h3>
              <button 
                onClick={() => setIsSkillModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>
                  Skill Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. JavaScript, React, Tableau..."
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: '#101017',
                    border: '1px solid #272734',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#F8FAFC',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>
                  Category
                </label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#101017',
                    border: '1px solid #272734',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#F8FAFC',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend / API</option>
                  <option value="Database">Database & SQL</option>
                  <option value="Data Science">Data Science / Analytics</option>
                  <option value="Machine Learning">Machine Learning / AI</option>
                  <option value="DevOps">DevOps & Cloud</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>
                  <span>Demonstrated Proficiency</span>
                  <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{skillForm.proficiency}%</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value })}
                  style={{ width: '100%', accentColor: '#8B5CF6' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>
                  <span>Self-Rated Confidence</span>
                  <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{skillForm.confidence}%</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="100"
                  value={skillForm.confidence}
                  onChange={(e) => setSkillForm({ ...skillForm, confidence: e.target.value })}
                  style={{ width: '100%', accentColor: '#38BDF8' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  className="btn-saas btn-saas-secondary btn-saas-sm"
                  onClick={() => setIsSkillModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-saas btn-saas-primary btn-saas-sm"
                >
                  {editingSkillId ? 'Update Skill' : 'Add to Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
