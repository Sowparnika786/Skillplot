import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Dna, 
  Compass, 
  Milestone, 
  CheckCircle2, 
  Play, 
  Lock, 
  Layers,
  Cpu,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function LandingPage({ 
  onTryDemo, 
  onGetStarted, 
  onSignIn 
}) {
  return (
    <div className="landing-container" style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-main)' }}>
      {/* Top Navbar */}
      <nav style={{
        height: 64,
        borderBottom: '1px solid var(--border-color)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(9, 9, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <span style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#F8FAFC' }}>SkillPilot</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-primary)', marginLeft: 4, background: 'rgba(139, 92, 246, 0.15)', padding: '2px 5px', borderRadius: 4 }}>AI</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button 
            className="btn-saas btn-saas-secondary btn-saas-sm"
            onClick={onSignIn}
          >
            Sign In
          </button>
          <button 
            className="btn-saas btn-saas-subtle btn-saas-sm"
            onClick={onTryDemo}
            title="Explore full Alex Rivera interactive dashboard"
          >
            <Play size={12} fill="#8B5CF6" />
            <span>Try Demo</span>
          </button>
          <button 
            className="btn-saas btn-saas-primary btn-saas-sm"
            onClick={onGetStarted}
          >
            <span>Get Started</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '72px 24px 56px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', borderRadius: 9999, marginBottom: 24 }}>
          <Sparkles size={14} color="#8B5CF6" />
          <span style={{ fontSize: '0.8rem', color: '#C084FC', fontWeight: 500 }}>
            Autonomous AI Career Architect & Skill DNA Engine
          </span>
        </div>

        <h1 style={{
          fontSize: '3.4rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: '#F8FAFC',
          marginBottom: 20
        }}>
          Your Skills. Your Future. <span style={{ color: 'var(--accent-primary)' }}>Your AI.</span>
        </h1>

        <p style={{
          fontSize: '1.12rem',
          color: '#94A3B8',
          maxWidth: 720,
          margin: '0 auto 36px auto',
          lineHeight: 1.6
        }}>
          Bridge the gap from where you are to where top tech teams hire. SkillPilot AI analyzes your Skill DNA, pinpoints critical gaps, and architects a personalized dynamic roadmap with verifiable proof.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
          <button 
            className="btn-saas btn-saas-primary"
            style={{ padding: '12px 26px', fontSize: '0.95rem' }}
            onClick={onGetStarted}
          >
            <span>Get Started Free</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn-saas btn-saas-secondary"
            style={{ padding: '12px 24px', fontSize: '0.95rem', background: '#16161F' }}
            onClick={onTryDemo}
          >
            <Play size={14} fill="#8B5CF6" />
            <span>Try Live Demo (Alex Rivera)</span>
          </button>
        </div>

        {/* Live Interactive Teaser Card */}
        <div className="saas-card" style={{ maxWidth: 960, margin: '0 auto', textAlign: 'left', padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F8FAFC' }}>
                Live Architectural Simulation: Student Profile
              </span>
            </div>
            <span className="badge-clean primary">Full Stack Developer Track</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Target Career Match</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#8B5CF6', marginTop: 4 }}>58% Readiness</div>
              <div style={{ fontSize: '0.74rem', color: '#10B981', marginTop: 2 }}>+6% gains this sprint</div>
            </div>

            <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Strengths Baseline</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#10B981', marginTop: 4 }}>Python & SQL</div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: 2 }}>High transferable leverage</div>
            </div>

            <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Active Priority Gaps</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#FB7185', marginTop: 4 }}>JS, React, Node</div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: 2 }}>Phase 1 targeting JS async</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 24px 80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
            Built for Technical Precision and Clarity
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: 6 }}>
            Every score, gap, and recommendation is calculated purely from your validated state.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div className="saas-card" style={{ padding: 22 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', marginBottom: 14 }}>
              <Dna size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 6 }}>
              Skill DNA Analyzer
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
              4-quadrant cognitive gap detector contrasting self-rated confidence with tested proficiency to surface blindspots and imposter syndrome.
            </p>
          </div>

          <div className="saas-card" style={{ padding: 22 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', marginBottom: 14 }}>
              <Compass size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 6 }}>
              Multi-Career Modeling
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Instant benchmarking across Full Stack Developer, Data Analyst, and AI/ML Engineer with preservation of transferable skills.
            </p>
          </div>

          <div className="saas-card" style={{ padding: 22 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', marginBottom: 14 }}>
              <Milestone size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 6 }}>
              Dynamic AI Roadmap
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Curriculums that automatically re-architect the moment you add, update, or verify skills, prioritizing high-impact missing milestones.
            </p>
          </div>

          <div className="saas-card" style={{ padding: 22 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', marginBottom: 14 }}>
              <ShieldCheck size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 6 }}>
              Skill Passport
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Cryptographically signed evidence ledger verifying code repositories and assessment diagnostics for recruiter transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: '0.78rem', color: '#64748B' }}>
        <div>
          © 2026 SkillPilot AI — Your Personal Career Architect.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={onSignIn} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 'inherit' }}>Sign In</button>
          <button onClick={onGetStarted} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 'inherit' }}>Sign Up</button>
          <button onClick={onTryDemo} style={{ background: 'none', border: 'none', color: '#8B5CF6', cursor: 'pointer', fontSize: 'inherit', fontWeight: 500 }}>Demo Dashboard</button>
        </div>
      </footer>
    </div>
  );
}
