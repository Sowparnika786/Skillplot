import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  Flame, 
  Code2
} from 'lucide-react';
import { mentorChatHistory } from '../data/mockData';

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

  const handleSendMessage = (textToSend) => {
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

    setTimeout(() => {
      let aiReplyText = "";

      if (query.toLowerCase().includes("dict") || query.toLowerCase().includes("map")) {
        aiReplyText = `In Python, dictionaries accept any hashable key (tuples, integers, strings):\n\n\`d = {(1, 2): 'coords', 'key': 'val'}\`\n\nIn standard JavaScript objects, property keys are coerced to strings. If you need non-string keys, use the ES6 \`Map\` class:\n\n\`const map = new Map(); map.set({ id: 1 }, 'user');\``;
      } else if (query.toLowerCase().includes("project") || query.toLowerCase().includes("portfolio")) {
        aiReplyText = `Recommended flagship project for your stack:\n\n**"AlphaStream: Algorithmic Market Sentiment Radar"**\n- **Backend**: Python FastAPI service utilizing your ETL pipeline.\n- **Frontend**: Modern React 19 dashboard with live metrics and filter controls.\n- **Database**: PostgreSQL storing historical data.\n\nThis reinforces your proven data depth while proving client-side reactivity to hiring teams.`;
      } else if (query.toLowerCase().includes("pep") || query.toLowerCase().includes("streak") || query.toLowerCase().includes("encourag")) {
        aiReplyText = `Alex, you've maintained a 14-day streak, scored 80% on ES6 diagnostics, and have 2 verified Python projects. Transitioning to Full Stack is not starting from zero; you are building on a rock-solid algorithmic base. Keep showing up daily!`;
      } else {
        aiReplyText = `Great question! Your Python baseline gives you an advantage: memory management, loops, and server architecture are already second nature. For this topic, focus on how the client issues asynchronous fetch requests to your backend endpoints.`;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        agent: "Archie",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiReplyText
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      onTriggerToast("Archie responded.");
    }, 800);
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
                        <span>{isAi ? 'Archie' : 'Alex'}</span>
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
