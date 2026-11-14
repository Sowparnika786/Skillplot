import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Download, 
  Code2, 
  Database, 
  GitBranch, 
  Layout, 
  Zap,
  Lock,
  Award
} from 'lucide-react';
import { skillPassportData } from '../data/mockData';
import { isSkillVerified } from '../utils/careerEngine';

export default function SkillPassport({ 
  studentData, 
  careerMatch,
  assessments,
  onTriggerToast 
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(`https://skillpilot.ai/verify/${skillPassportData.passportId}`);
    setCopiedLink(true);
    onTriggerToast("Passport verification URL copied.");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportPdf = () => {
    onTriggerToast("Generating verified PDF export...");
  };

  const getBadgeIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('python') || n.includes('js') || n.includes('code')) return Code2;
    if (n.includes('sql') || n.includes('data')) return Database;
    if (n.includes('git')) return GitBranch;
    if (n.includes('html') || n.includes('dom')) return Layout;
    return Zap;
  };

  const verifiedSkillsCount = studentData.skills.filter(s => isSkillVerified(s, assessments, studentData.projects)).length;

  return (
    <div className="skill-passport-redesign">
      <div className="compact-page-header">
        <div>
          <h1 className="compact-title">Skill Passport — Verified Talent Record</h1>
          <p className="compact-subtitle">
            Cryptographically authenticated evidence validating competence in Python, SQL, and target engineering disciplines.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn-saas btn-saas-secondary btn-saas-sm"
            onClick={handleCopyLink}
          >
            <Share2 size={13} />
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
          <button 
            className="btn-saas btn-saas-primary btn-saas-sm"
            onClick={handleExportPdf}
          >
            <Download size={13} />
            <span>Export Record</span>
          </button>
        </div>
      </div>

      {/* Clean Verified Passport Card */}
      <div className="saas-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <img 
              src={studentData.avatar} 
              alt={studentData.name} 
              style={{ 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '1px solid #272734'
              }} 
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge-clean success">VERIFIED</span>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>ID: {skillPassportData.passportId}</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC', marginTop: '2px' }}>{studentData.name}</h2>
              <div style={{ fontSize: '0.78rem', color: '#8B5CF6' }}>
                Target: {careerMatch.career.title} • {verifiedSkillsCount} of {studentData.skills.length} Skills Verified
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#101017', 
            border: '1px solid #272734', 
            borderRadius: '6px', 
            padding: '10px 14px',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Ledger Verification Hash</div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', marginTop: '2px' }}>
              {skillPassportData.verificationHash}
            </div>
          </div>
        </div>

        {/* Authenticated Badges */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748B', marginBottom: '10px' }}>
            Demonstrated Skills ({studentData.skills.length} Skills Tracked)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {studentData.skills.map(s => {
              const verified = isSkillVerified(s, assessments, studentData.projects);
              const Icon = getBadgeIcon(s.name);

              return (
                <div 
                  key={s.id}
                  style={{
                    background: '#101017',
                    border: '1px solid #272734',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div style={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '4px', 
                    background: verified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: verified ? '#10B981' : '#94A3B8'
                  }}>
                    <Icon size={14} />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#F8FAFC' }}>{s.name}</div>
                    <div style={{ fontSize: '0.68rem', color: verified ? '#10B981' : '#64748B' }}>
                      {verified ? 'Verified' : 'Self-Reported'} • {s.proficiency}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Evidence */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '12px' }}>
          Demonstrated Codebase Evidence
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {skillPassportData.demonstratedEvidence.map(ev => (
            <div key={ev.id} className="saas-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <span className="badge-clean primary" style={{ marginBottom: '4px' }}>{ev.type}</span>
                  <h4 style={{ fontSize: '0.98rem', color: '#F8FAFC', fontWeight: 600 }}>{ev.title}</h4>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>{ev.codeHash}</span>
              </div>

              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '8px 0' }}>
                {ev.skillsValidated.map((skill, sIdx) => (
                  <span key={sIdx} className="badge-clean secondary">{skill}</span>
                ))}
              </div>

              <div style={{ 
                background: '#101017', 
                border: '1px solid #272734', 
                borderRadius: '4px',
                padding: '8px 10px',
                fontSize: '0.75rem',
                color: '#94A3B8',
                lineHeight: 1.4
              }}>
                {ev.verificationNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter API Box */}
      <div className="saas-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} color="#10B981" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>Verification API Endpoint</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Third-party hiring systems can verify this record via <code>/v1/verify/{skillPassportData.passportId}</code>
            </div>
          </div>
        </div>

        <button 
          className="btn-saas btn-saas-secondary btn-saas-sm"
          onClick={() => onTriggerToast("API key endpoint copied.")}
        >
          Copy Endpoint
        </button>
      </div>
    </div>
  );
}
