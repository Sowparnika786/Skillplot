import React from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck,
  Target,
  LogOut,
  Home
} from 'lucide-react';

export default function Header({ 
  studentData, 
  targetCareerTitle,
  readinessScore,
  setActiveModule, 
  searchQuery, 
  setSearchQuery,
  onExitToLanding 
}) {
  return (
    <header className="header-bar">
      <div className="header-left">
        <div className="header-search">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search skills, roadmap..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dynamic Target Career Chip */}
        <div 
          className="header-goal-chip"
          onClick={() => setActiveModule('career-explorer')}
          title="Click to switch or explore careers"
        >
          <Target size={13} color="#8B5CF6" />
          <span>Goal: <strong>{targetCareerTitle || studentData.targetRole}</strong></span>
          <span className="badge-clean primary" style={{ marginLeft: 6, fontSize: '0.7rem' }}>
            {readinessScore}% Match
          </span>
        </div>
      </div>

      <div className="header-right">
        <button 
          className="btn-header-cta"
          onClick={() => setActiveModule('ai-mentor')}
        >
          <Sparkles size={13} />
          <span>Ask Mentor</span>
        </button>

        <button 
          className="btn-header-secondary"
          onClick={() => setActiveModule('skill-passport')}
        >
          <ShieldCheck size={14} />
          <span>Passport</span>
        </button>

        {/* Return to Landing / Auth Flow */}
        {onExitToLanding && (
          <button 
            className="btn-header-secondary"
            onClick={onExitToLanding}
            title="Return to Landing Page & Auth Flow"
          >
            <Home size={13} />
            <span>Landing</span>
          </button>
        )}
      </div>
    </header>
  );
}
