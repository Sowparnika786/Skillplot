import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Minus, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Sliders, 
  ChevronRight,
  ArrowRight,
  Smile,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { getPipDialogue, PERSONALITIES } from '../utils/pipDialogue';

export default function PipCompanion({
  view = "dashboard",
  activeModule = "dashboard",
  studentData = null,
  careerMatch = null,
  latestAssessment = null,
  onboardingStep = 1,
  setActiveModule,
  onTryDemo
}) {
  const [personality, setPersonality] = useState(() => {
    return localStorage.getItem("skillpilot_pip_personality") || "genz";
  });
  const [isMinimized, setIsMinimized] = useState(() => {
    return localStorage.getItem("skillpilot_pip_minimized") === "true";
  });
  const [isHidden, setIsHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem("skillpilot_pip_reduced_motion") === "true";
  });
  const [showPersonalityPicker, setShowPersonalityPicker] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);

  // Save preferences
  useEffect(() => {
    localStorage.setItem("skillpilot_pip_personality", personality);
  }, [personality]);

  useEffect(() => {
    localStorage.setItem("skillpilot_pip_minimized", isMinimized);
  }, [isMinimized]);

  useEffect(() => {
    localStorage.setItem("skillpilot_pip_reduced_motion", reducedMotion);
  }, [reducedMotion]);

  // Wobble whenever dialogue updates
  useEffect(() => {
    if (!reducedMotion) {
      setIsWobbling(true);
      const timer = setTimeout(() => setIsWobbling(false), 600);
      return () => clearTimeout(timer);
    }
  }, [view, activeModule, latestAssessment]);

  // Compute live contextual dialogue
  const dialogue = getPipDialogue({
    personality,
    view,
    activeModule,
    studentData,
    careerMatch,
    latestAssessment,
    onboardingStep
  });

  const state = dialogue.state || "happy";

  const handleActionClick = () => {
    if (dialogue.actionTarget === "demo" && onTryDemo) {
      onTryDemo();
    } else if (dialogue.actionTarget && setActiveModule) {
      if (dialogue.actionTarget === "assessments-fixture") {
        setActiveModule("assessments");
      } else {
        setActiveModule(dialogue.actionTarget);
      }
    }
  };

  const handlePipClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      // Trigger playful squish
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 500);
    }
  };

  // If user fully hid PIP, provide subtle floating pill to revive
  if (isHidden) {
    return (
      <div 
        onClick={() => setIsHidden(false)}
        className="pip-revive-pill"
        title="Summon PIP Companion"
        style={{
          position: 'fixed',
          bottom: '18px',
          right: '18px',
          zIndex: 999,
          background: 'rgba(22, 22, 31, 0.95)',
          border: '1px solid #8B5CF6',
          borderRadius: '9999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(139, 92, 246, 0.25)',
          color: '#C084FC',
          fontSize: '0.75rem',
          fontWeight: 600,
          backdropFilter: 'blur(8px)',
          transition: 'all 200ms ease'
        }}
      >
        <span style={{ fontSize: '1rem' }}>🟣</span>
        <span>Summon PIP</span>
      </div>
    );
  }

  return (
    <div 
      className={`pip-companion-root ${reducedMotion ? 'reduced-motion' : ''}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none'
      }}
    >
      {/* Speech Bubble / Dialogue Card */}
      {!isMinimized && (
        <div 
          className="pip-speech-bubble"
          style={{
            pointerEvents: 'auto',
            width: '340px',
            maxWidth: 'calc(100vw - 40px)',
            background: '#16161F',
            border: '1px solid #8B5CF6',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '10px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            animation: reducedMotion ? 'none' : 'pipCardSlideUp 200ms ease'
          }}
        >
          {/* Top Bar Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #272734', paddingBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge-clean primary" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                PIP {PERSONALITIES[personality]?.emoji} {PERSONALITIES[personality]?.label}
              </span>
              {dialogue.badge && (
                <span className="badge-clean neutral" style={{ fontSize: '0.62rem' }}>
                  {dialogue.badge}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button 
                onClick={() => setShowPersonalityPicker(!showPersonalityPicker)}
                title="Switch Personality"
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px 4px', fontSize: '0.72rem' }}
              >
                <Sliders size={13} />
              </button>

              <button 
                onClick={() => setReducedMotion(!reducedMotion)}
                title={reducedMotion ? "Enable Squish Animations" : "Reduce Motion"}
                style={{ background: 'none', border: 'none', color: reducedMotion ? '#FB7185' : '#94A3B8', cursor: 'pointer', padding: '2px 4px', fontSize: '0.72rem' }}
              >
                <Zap size={13} />
              </button>

              <button 
                onClick={() => setIsMinimized(true)}
                title="Minimize PIP"
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px 4px' }}
              >
                <Minus size={13} />
              </button>

              <button 
                onClick={() => setIsHidden(true)}
                title="Hide PIP"
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px 4px' }}
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Personality Switcher Dropdown */}
          {showPersonalityPicker && (
            <div style={{
              background: '#101017',
              border: '1px solid #272734',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '10px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px'
            }}>
              {Object.values(PERSONALITIES).map(pItem => (
                <button
                  key={pItem.id}
                  onClick={() => {
                    setPersonality(pItem.id);
                    setShowPersonalityPicker(false);
                  }}
                  style={{
                    background: personality === pItem.id ? 'rgba(139, 92, 246, 0.2)' : '#16161F',
                    border: `1px solid ${personality === pItem.id ? '#8B5CF6' : '#272734'}`,
                    borderRadius: '6px',
                    padding: '6px 8px',
                    color: '#F8FAFC',
                    fontSize: '0.72rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{pItem.emoji}</span>
                  <span>{pItem.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Dialogue Content */}
          <div style={{ marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '4px', lineHeight: 1.4 }}>
              {dialogue.headline}
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.45 }}>
              {dialogue.body}
            </p>
          </div>

          {/* Action CTA */}
          {dialogue.actionLabel && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button 
                className="btn-saas btn-saas-primary btn-saas-sm"
                onClick={handleActionClick}
                style={{ fontSize: '0.74rem', padding: '5px 10px' }}
              >
                <span>{dialogue.actionLabel}</span>
                <ArrowRight size={11} />
              </button>
            </div>
          )}

          {/* Speech Bubble Arrow Tail */}
          <div style={{
            position: 'absolute',
            bottom: '-7px',
            right: '34px',
            width: '14px',
            height: '14px',
            background: '#16161F',
            borderRight: '1px solid #8B5CF6',
            borderBottom: '1px solid #8B5CF6',
            transform: 'rotate(45deg)'
          }}></div>
        </div>
      )}

      {/* PIP Mascot Visual Avatar (Interactive Jelly) */}
      <div 
        onClick={handlePipClick}
        title={isMinimized ? "Expand PIP Companion" : "Click PIP to squish!"}
        className={`pip-avatar-container ${isWobbling && !reducedMotion ? 'pip-wobble' : ''}`}
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          position: 'relative',
          width: isMinimized ? '58px' : '78px',
          height: isMinimized ? '58px' : '78px',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'drop-shadow(0 8px 16px rgba(139, 92, 246, 0.3))'
        }}
      >
        <svg 
          viewBox="0 0 160 160" 
          width="100%" 
          height="100%"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Lavender Purple Jelly Gradient */}
            <linearGradient id="pipJellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>

            {/* Inner Jelly Glow Highlight */}
            <linearGradient id="pipHighlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Cheek Glow */}
            <radialGradient id="pipCheekGrad">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Confetti & Celebration Stars (for celebrating state) */}
          {state === "celebrating" && (
            <g className={reducedMotion ? '' : 'pip-confetti-group'}>
              <circle cx="35" cy="15" r="3" fill="#F59E0B" />
              <polygon points="125,12 128,18 134,19 129,24 131,30 125,26 120,30 122,24 117,19 123,18" fill="#38BDF8" />
              <polygon points="40,30 42,34 46,35 43,38 44,42 40,40 37,42 38,38 34,35 38,34" fill="#EC4899" />
              <circle cx="135" cy="35" r="2.5" fill="#10B981" />
            </g>
          )}

          {/* Tiny Left Arm */}
          {state === "celebrating" ? (
            <path d="M 32,75 C 16,56 12,66 26,80" fill="#7C3AED" />
          ) : state === "resting" ? (
            <path d="M 34,88 C 45,95 55,95 58,88" fill="none" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
          ) : (
            <path d="M 28,82 C 16,86 16,96 28,94" fill="#7C3AED" />
          )}

          {/* Tiny Right Arm */}
          {state === "waving" ? (
            <g className={reducedMotion ? '' : 'pip-waving-arm'}>
              <path d="M 130,75 C 146,55 152,65 138,82" fill="#7C3AED" />
              <circle cx="147" cy="58" r="4.5" fill="#8B5CF6" />
            </g>
          ) : state === "celebrating" ? (
            <path d="M 128,75 C 144,56 148,66 134,80" fill="#7C3AED" />
          ) : state === "thinking" ? (
            <path d="M 130,86 C 132,74 112,74 116,84" fill="#7C3AED" />
          ) : state === "resting" ? (
            <path d="M 126,88 C 115,95 105,95 102,88" fill="none" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
          ) : (
            <path d="M 132,82 C 144,86 144,96 132,94" fill="#7C3AED" />
          )}

          {/* Jelly Mascot Body */}
          <path 
            d="M 36,112 C 22,112 18,80 28,54 C 36,30 54,18 80,18 C 106,18 124,30 132,54 C 142,80 138,112 124,112 C 108,122 52,122 36,112 Z" 
            fill="url(#pipJellyGrad)" 
            stroke="#C084FC" 
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'pip-jelly-body'}
          />

          {/* Translucent Soft Jelly Highlight */}
          <ellipse 
            cx="58" 
            cy="42" 
            rx="32" 
            ry="16" 
            fill="url(#pipHighlightGrad)" 
            transform="rotate(-18, 58, 42)" 
          />

          {/* Soft Cheeks */}
          <circle cx="46" cy="74" r="7.5" fill="url(#pipCheekGrad)" />
          <circle cx="114" cy="74" r="7.5" fill="url(#pipCheekGrad)" />

          {/* Subtle Stylish Glasses */}
          <g className="pip-glasses">
            <circle cx="62" cy="63" r="14.5" fill="rgba(255, 255, 255, 0.08)" stroke="#E9D5FF" strokeWidth="2.2" />
            <circle cx="98" cy="63" r="14.5" fill="rgba(255, 255, 255, 0.08)" stroke="#E9D5FF" strokeWidth="2.2" />
            <path d="M 76.5,61 Q 80,57 83.5,61" fill="none" stroke="#E9D5FF" strokeWidth="2.2" />
            <line x1="47.5" y1="61" x2="35" y2="63" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" />
            <line x1="112.5" y1="61" x2="125" y2="63" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Expressive Eyes & Smile Based on State */}
          {state === "celebrating" ? (
            /* Joyful ^‿^ eyes */
            <g>
              <path d="M 54,65 Q 62,56 70,65" stroke="#1E1B4B" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 90,65 Q 98,56 106,65" stroke="#1E1B4B" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Laughing open mouth */}
              <path d="M 72,76 Q 80,91 88,76 Z" fill="#F43F5E" stroke="#1E1B4B" strokeWidth="2" />
              <path d="M 76,83 Q 80,88 84,83" fill="#FDA4AF" />
            </g>
          ) : state === "resting" ? (
            /* Closed peaceful -‿- eyes */
            <g>
              <path d="M 55,63 Q 62,68 69,63" stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 91,63 Q 98,68 105,63" stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 76,78 Q 80,81 84,78" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          ) : state === "thinking" ? (
            /* Looking up with curious side mouth */
            <g>
              <ellipse cx="64" cy="60" rx="6.5" ry="8" fill="#1E1B4B" />
              <circle cx="65.5" cy="57" r="2.8" fill="#FFFFFF" />
              <ellipse cx="100" cy="60" rx="6.5" ry="8" fill="#1E1B4B" />
              <circle cx="101.5" cy="57" r="2.8" fill="#FFFFFF" />
              <path d="M 76,80 Q 81,82 85,78" stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          ) : state === "encouraging" ? (
            /* Empathetic warm eyes & soft smile */
            <g>
              <ellipse cx="62" cy="63" rx="7" ry="8.5" fill="#1E1B4B" />
              <circle cx="60" cy="60" r="3" fill="#FFFFFF" />
              <circle cx="64" cy="66" r="1.5" fill="#FFFFFF" />
              <ellipse cx="98" cy="63" rx="7" ry="8.5" fill="#1E1B4B" />
              <circle cx="96" cy="60" r="3" fill="#FFFFFF" />
              <circle cx="100" cy="66" r="1.5" fill="#FFFFFF" />
              <path d="M 73,78 Q 80,84 87,78" stroke="#1E1B4B" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            /* Happy / Waving wide expressive sparkle eyes */
            <g>
              <ellipse cx="62" cy="63" rx="7" ry="9" fill="#1E1B4B" />
              <circle cx="59.5" cy="59.5" r="3.2" fill="#FFFFFF" />
              <circle cx="64.5" cy="66" r="1.6" fill="#FFFFFF" />
              <ellipse cx="98" cy="63" rx="7" ry="9" fill="#1E1B4B" />
              <circle cx="95.5" cy="59.5" r="3.2" fill="#FFFFFF" />
              <circle cx="100.5" cy="66" r="1.6" fill="#FFFFFF" />
              <path d="M 72,77 Q 80,87 88,77" stroke="#1E1B4B" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* Minimized Mood Indicator Badge */}
        {isMinimized && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#8B5CF6',
            border: '2px solid #16161F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.65rem'
          }}>
            {PERSONALITIES[personality]?.emoji || "✨"}
          </div>
        )}
      </div>
    </div>
  );
}
