import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Dna, 
  Compass, 
  Milestone, 
  GraduationCap, 
  Bot, 
  Clock, 
  Sparkles, 
  ShieldCheck,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  activeModule, 
  setActiveModule, 
  studentData, 
  readinessScore,
  onExitToLanding 
}) {
  const navSections = [
    {
      title: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "profile", label: "My Profile", icon: User },
        { id: "skill-dna", label: "Skill DNA", icon: Dna },
        { id: "career-explorer", label: "Career Explorer", icon: Compass },
      ]
    },
    {
      title: "Learning",
      items: [
        { id: "roadmap", label: "AI Roadmap", icon: Milestone },
        { id: "assessments", label: "Assessments", icon: GraduationCap },
        { id: "skill-passport", label: "Skill Passport", icon: ShieldCheck },
      ]
    },
    {
      title: "AI Architect",
      items: [
        { id: "agent-room", label: "AI Agent Room", icon: Bot },
        { id: "time-machine", label: "Time Machine", icon: Clock },
        { id: "ai-mentor", label: "AI Mentor", icon: Sparkles },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div 
          onClick={() => setActiveModule('dashboard')} 
          className="brand-badge"
        >
          <div className="brand-icon">
            <Sparkles size={16} />
          </div>
          <span className="brand-title">SkillPilot</span>
          <span className="brand-tag">AI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <div className="nav-section-title">{section.title}</div>
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-item-left">
                    <Icon className="nav-icon" />
                    <span className="nav-title-text">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div 
            className="user-compact"
            onClick={() => setActiveModule('profile')}
            title="View profile"
            style={{ flex: 1, minWidth: 0 }}
          >
            <img 
              src={studentData.avatar} 
              alt={studentData.name} 
              className="user-avatar-sm" 
            />
            <div className="user-info-text" style={{ minWidth: 0 }}>
              <div className="user-name-sm">{studentData.name}</div>
              <div className="user-sub-sm">
                {readinessScore !== undefined ? `${readinessScore}% Match` : 'Career Path'}
              </div>
            </div>
          </div>

          {onExitToLanding && (
            <button 
              onClick={onExitToLanding}
              title="Exit to Landing Page"
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 4 }}
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
