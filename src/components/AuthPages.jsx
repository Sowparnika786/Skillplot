import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert,
  Play
} from 'lucide-react';

export function SignInPage({ 
  onSignInSuccess, 
  onSwitchToSignUp, 
  onTryDemo, 
  onBackToLanding 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email format.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // UI-only validation demonstration
    onSignInSuccess({
      email,
      name: email.split('@')[0] || "Learner"
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 16px'
    }}>
      {/* Brand Header */}
      <div 
        onClick={onBackToLanding}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, cursor: 'pointer' }}
      >
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
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F8FAFC' }}>SkillPilot AI</span>
      </div>

      {/* Sign In Card */}
      <div className="saas-card" style={{ width: '100%', maxWidth: 400, padding: 28, background: 'var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
          Welcome back
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 20 }}>
          Enter your email and password to access your career dashboard.
        </p>

        {/* Auth Provider Notice */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 6,
          padding: '10px 12px',
          marginBottom: 18,
          fontSize: '0.74rem',
          color: '#38BDF8',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          lineHeight: 1.4
        }}>
          <ShieldAlert size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            <strong>UI Preview Mode:</strong> Real authentication requires a configured provider (Supabase / Firebase / Auth0). Passwords are not saved or sent to a backend.
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={14} color="#64748B" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: `1px solid ${errors.email ? '#F43F5E' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 12px 8px 32px',
                  color: '#F8FAFC',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
            {errors.email && (
              <span style={{ fontSize: '0.72rem', color: '#FB7185', marginTop: 3, display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                Password
              </label>
              <button 
                type="button" 
                onClick={() => alert("Password reset demonstration. In production, this dispatches a secure token link.")}
                style={{ background: 'none', border: 'none', color: '#8B5CF6', fontSize: '0.72rem', cursor: 'pointer' }}
              >
                Forgot?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={14} color="#64748B" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: `1px solid ${errors.password ? '#F43F5E' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 36px 8px 32px',
                  color: '#F8FAFC',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <span style={{ fontSize: '0.72rem', color: '#FB7185', marginTop: 3, display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-saas btn-saas-primary"
            style={{ width: '100%', marginTop: 6 }}
          >
            <span>Sign In</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignUp}
              style={{ background: 'none', border: 'none', color: '#8B5CF6', fontWeight: 500, cursor: 'pointer' }}
            >
              Sign Up
            </button>
          </div>

          <button 
            className="btn-saas btn-saas-secondary btn-saas-sm"
            onClick={onTryDemo}
            style={{ width: '100%', background: '#101017' }}
          >
            <Play size={12} fill="#8B5CF6" />
            <span>Skip to Live Demo (Alex Rivera)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function SignUpPage({ 
  onSignUpSuccess, 
  onSwitchToSignIn, 
  onTryDemo, 
  onBackToLanding 
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = "Full name is required.";
    }

    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email format.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Proceed directly to the 3-Step Student Onboarding Wizard
    onSignUpSuccess({
      name: name.trim(),
      email: email.trim()
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 16px'
    }}>
      {/* Brand Header */}
      <div 
        onClick={onBackToLanding}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, cursor: 'pointer' }}
      >
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
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F8FAFC' }}>SkillPilot AI</span>
      </div>

      {/* Sign Up Card */}
      <div className="saas-card" style={{ width: '100%', maxWidth: 420, padding: 28, background: 'var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
          Create your account
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 18 }}>
          Begin architecting your personalized career path with AI.
        </p>

        {/* Notice */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: 6,
          padding: '10px 12px',
          marginBottom: 16,
          fontSize: '0.74rem',
          color: '#C084FC',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          lineHeight: 1.4
        }}>
          <ShieldAlert size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            <strong>UI Form:</strong> Passwords are never saved locally. Completing this step transitions directly into the 3-step Student Onboarding Wizard.
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
              Full name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={14} color="#64748B" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="e.g. Jordan Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: `1px solid ${errors.name ? '#F43F5E' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 12px 8px 32px',
                  color: '#F8FAFC',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
            {errors.name && (
              <span style={{ fontSize: '0.72rem', color: '#FB7185', marginTop: 3, display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={14} color="#64748B" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: `1px solid ${errors.email ? '#F43F5E' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 12px 8px 32px',
                  color: '#F8FAFC',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
            {errors.email && (
              <span style={{ fontSize: '0.72rem', color: '#FB7185', marginTop: 3, display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
              Password (min. 8 characters)
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} color="#64748B" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: `1px solid ${errors.password ? '#F43F5E' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 36px 8px 32px',
                  color: '#F8FAFC',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <span style={{ fontSize: '0.72rem', color: '#FB7185', marginTop: 3, display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: 4 }}>
              Confirm password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} color="#64748B" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: `1px solid ${errors.confirmPassword ? '#F43F5E' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 12px 8px 32px',
                  color: '#F8FAFC',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
            {errors.confirmPassword && (
              <span style={{ fontSize: '0.72rem', color: '#FB7185', marginTop: 3, display: 'block' }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-saas btn-saas-primary"
            style={{ width: '100%', marginTop: 8 }}
          >
            <span>Continue to Onboarding</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
            Already have an account?{' '}
            <button 
              onClick={onSwitchToSignIn}
              style={{ background: 'none', border: 'none', color: '#8B5CF6', fontWeight: 500, cursor: 'pointer' }}
            >
              Sign In
            </button>
          </div>

          <button 
            className="btn-saas btn-saas-secondary btn-saas-sm"
            onClick={onTryDemo}
            style={{ width: '100%', background: '#101017' }}
          >
            <Play size={12} fill="#8B5CF6" />
            <span>Try Live Demo (Alex Rivera)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
