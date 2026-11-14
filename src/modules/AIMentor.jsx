import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  Flame, 
  Code2
} from 'lucide-react';
import { mentorChatHistory } from '../data/mockData';
import { sendMentorChatMessage } from '../services/api';

export default function AIMentor({ 
  studentData, 
  onTriggerToast 
}) {
  const [messages, setMessages] = useState(mentorChatHistory);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "Python dicts vs JavaScript Objects/Maps",
    "Weekend portfolio project for Python + React",
    "Explain JS Event Loop simply with an analogy",
    "Encouraging words on my 14-day study streak"
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const activePersonality = localStorage.getItem("skillpilot_pip_personality") || "genz";
      const studentSkills = studentData?.skills ? studentData.skills.map(s => s.name) : ["Python", "SQL"];

      const res = await sendMentorChatMessage({
        message: query.trim(),
        studentName: studentData?.name || "Alex Rivera",
        targetCareer: studentData?.targetRole || "Full Stack Developer",
        skills: studentSkills,
        personality: activePersonality
      });

      let aiReplyText = "";
      let agentLabel = "Archie";
      let isLlm = false;

      if (res && res.reply) {
        aiReplyText = res.reply;
        agentLabel = res.agent || (res.is_llm_powered ? "Archie (Ollama)" : "Archie");
        isLlm = !!res.is_llm_powered;
      } else {
        // Semantic, accurately attributed client fallback if backend is offline
        const q = query.trim().toLowerCase();
        const isJava = /\bjava\b/.test(q) && !q.includes("javascript");

        if (isJava) {
          if (q.includes("don't like") || q.includes("dislike") || q.includes("hate") || q.includes("not like")) {
            aiReplyText = "That's completely fine! Java's verbose boilerplate and strict class hierarchies aren't for everyone. The good news: you do not need Java for modern full-stack or web engineering. You can build complete systems using Python (FastAPI/Django) or Node.js/TypeScript, completely Java-free.";
          } else {
            aiReplyText = "Java is a statically-typed, object-oriented language compiled to bytecode on the JVM. Keep in mind: Java is completely distinct from JavaScript (the language of the web). If Java doesn't fit your preferences, Python and TypeScript are top-tier modern alternatives.";
          }
        } else if (q.includes("sql")) {
          aiReplyText = "SQL (Structured Query Language) is the standard declarative language for interacting with relational databases like PostgreSQL, MySQL, and SQLite. You use it to query (`SELECT`), insert, update, and define schemas for structured tabular data.";
        } else if (q.includes("promise") || q.includes("promises")) {
          aiReplyText = "A JavaScript Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It transitions between Pending, Fulfilled (with a value), and Rejected (with an error), and is consumed via `.then()`, `.catch()`, or modern `async/await`.";
        } else if (q.includes("event loop")) {
          aiReplyText = "The JavaScript Event Loop orchestrates non-blocking concurrency: synchronous code runs immediately on the Call Stack, while asynchronous callbacks wait in task queues until the Call Stack clears.";
        } else if (q.includes("dict") || q.includes("map")) {
          aiReplyText = "In Python, dictionaries accept any hashable key (`d = {(1, 2): 'coords'}`). Standard JavaScript objects coerce keys to strings; use ES6 `Map` (`const map = new Map()`) for arbitrary key types.";
        } else if (q.includes("project") || q.includes("portfolio")) {
          aiReplyText = "Recommended flagship project for your stack:\n\n**\"AlphaStream: Algorithmic Market Sentiment Radar\"**\n- **Backend**: Python FastAPI service utilizing your ETL pipeline.\n- **Frontend**: Modern React 19 dashboard with live metrics and filter controls.\n- **Database**: PostgreSQL storing historical data.\n\nThis reinforces your proven data depth while proving client-side reactivity to hiring teams.";
        } else {
          aiReplyText = `Thanks for asking, ${studentData?.name ? studentData.name.split(' ')[0] : 'Alex'}! Regarding '${query.trim()}', in your ${studentData?.targetRole || 'Full Stack'} journey, focus on breaking down core concepts into first principles and applying them in hands-on code.`;
        }
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        agent: agentLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiReplyText,
        isLlmPowered: isLlm
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      onTriggerToast(isLlm ? "Archie (Ollama llama3.2:1b) responded." : "Archie responded.");
    } catch (e) {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-mentor-redesign">
      <div className="compact-page-header">
        <div>
          <h1 className="compact-title">AI Mentor — Interactive Guidance</h1>
          <p className="compact-subtitle">
            Ask any question about your curriculum, transition from Python to JavaScript, or portfolio architecture.
          </p>
        </div>
      </div>

      <div className="grid-12">
        {/* Main Chat (8 cols) */}
        <div className="col-8">
          <div className="saas-card" style={{ display: 'flex', flexDirection: 'column', height: '580px', padding: 0 }}>
            
            {/* Chat Header */}
            <div style={{ 
              padding: '12px 18px', 
              borderBottom: '1px solid #272734', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              background: '#101017'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 24, height: 24, borderRadius: '4px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={14} color="#8B5CF6" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>Archie (Lead Career Architect)</div>
                  <div style={{ fontSize: '0.68rem', color: '#10B981' }}>Synced with Alex's profile</div>
                </div>
              </div>

              <span className="badge-clean primary">Socratic Mode</span>
            </div>

            {/* Chat Body */}
            <div style={{ 
              flex: 1, 
              padding: '16px', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}>
              {messages.map(msg => {
                const isAi = msg.sender === 'ai';

                return (
                  <div 
                    key={msg.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      alignSelf: isAi ? 'flex-start' : 'flex-end',
                      maxWidth: '85%'
                    }}
                  >
                    {isAi && (
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '4px', 
                        background: '#101017', 
                        border: '1px solid #272734',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#8B5CF6',
                        flexShrink: 0
                      }}>
                        <Bot size={13} />
                      </div>
                    )}

                    <div style={{
                      background: isAi ? '#101017' : 'var(--accent-primary)',
                      border: `1px solid ${isAi ? '#272734' : 'var(--accent-primary)'}`,
                      borderRadius: '6px',
                      padding: '10px 14px',
                      color: '#F8FAFC'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px', fontSize: '0.68rem', color: isAi ? '#64748B' : 'rgba(255, 255, 255, 0.7)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>{isAi ? (msg.agent || 'Archie') : (studentData?.name ? studentData.name.split(' ')[0] : 'Alex')}</span>
                          {msg.isLlmPowered && (
                            <span className="badge-clean emerald" style={{ fontSize: '0.6rem', padding: '1px 4px' }}>
                              ✨ Ollama
                            </span>
                          )}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div style={{ fontSize: '0.82rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.75rem' }}>
                  <Bot size={13} color="#8B5CF6" />
                  <span>Archie is formulating a response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div style={{ padding: '8px 12px', borderTop: '1px solid #272734', background: '#101017', display: 'flex', gap: '6px', overflowX: 'auto' }}>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  style={{
                    background: '#16161F',
                    border: '1px solid #272734',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    color: '#94A3B8',
                    fontSize: '0.72rem',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              style={{ 
                padding: '10px 14px', 
                borderTop: '1px solid #272734', 
                display: 'flex', 
                gap: '8px',
                background: '#09090F'
              }}
            >
              <input 
                type="text" 
                placeholder="Ask Archie about full stack architecture, skills..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
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
              <button 
                type="submit" 
                className="btn-saas btn-saas-primary btn-saas-sm"
                disabled={!inputText.trim()}
              >
                <Send size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Pane: Mindset & Cheat Sheet (4 cols) */}
        <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="saas-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Flame size={15} color="#F59E0B" />
              <h3 className="saas-card-title">Daily Mindset Note</h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '8px' }}>
              "Python taught you computational thinking; JavaScript is just another syntax for logic. You already have the foundation."
            </p>
            <div style={{ fontSize: '0.7rem', color: '#64748B', textAlign: 'right' }}>
              — Socrates, Cognitive Coach
            </div>
          </div>

          <div className="saas-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Code2 size={15} color="#38BDF8" />
              <h3 className="saas-card-title">Python vs JS Mental Model</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
              <div style={{ background: '#101017', border: '1px solid #272734', padding: '6px 8px', borderRadius: '4px' }}>
                <div style={{ color: '#64748B' }}>List Comprehension vs map()</div>
                <div style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  py: <code>[x*2 for x in nums]</code><br/>
                  js: <code>nums.map(x =&gt; x*2)</code>
                </div>
              </div>

              <div style={{ background: '#101017', border: '1px solid #272734', padding: '6px 8px', borderRadius: '4px' }}>
                <div style={{ color: '#64748B' }}>None vs Null/Undefined</div>
                <div style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  py: <code>x is None</code><br/>
                  js: <code>x == null</code>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
