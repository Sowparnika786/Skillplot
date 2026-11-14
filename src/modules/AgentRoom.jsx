import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Radar, 
  Sparkles, 
  Compass, 
  RefreshCw
} from 'lucide-react';
import { aiAgents as initialAgents, agentRoomLogs as initialLogs } from '../data/mockData';

export default function AgentRoom({ onTriggerToast }) {
  const [agents, setAgents] = useState(initialAgents);
  const [logs, setLogs] = useState(initialLogs);
  const [selectedAgent, setSelectedAgent] = useState(initialAgents[0]);
  const [isAuditing, setIsAuditing] = useState(false);

  const getAgentIcon = (avatarName) => {
    switch (avatarName) {
      case 'Compass': return Compass;
      case 'Terminal': return Terminal;
      case 'Radar': return Radar;
      case 'Sparkles': return Sparkles;
      default: return Bot;
    }
  };

  const handleTriggerAudit = () => {
    setIsAuditing(true);
    onTriggerToast("Autonomous multi-agent consensus initiated...");

    setTimeout(() => {
      const newLog1 = {
        id: Date.now(),
        sender: "Scout",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Scout indexed 140 new tech postings: PostgreSQL query optimization is present in 68% of Mid-Level roles."
      };
      const newLog2 = {
        id: Date.now() + 1,
        sender: "Archie",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Cross-referenced with Alex's 72% SQL score. Recommending Alex feature a Postgres indexing study in portfolio."
      };

      setLogs(prev => [...prev, newLog1, newLog2]);
      setIsAuditing(false);
      onTriggerToast("Agent consensus logged.");
    }, 1000);
  };

  return (
    <div className="agent-room-redesign">
      <div className="compact-page-header">
        <div>
          <h1 className="compact-title">AI Agent Collaboration Room</h1>
          <p className="compact-subtitle">
            Autonomous multi-agent consensus engine auditing and guiding your career progression.
          </p>
        </div>

        <button 
          className="btn-saas btn-saas-primary btn-saas-sm"
          onClick={handleTriggerAudit}
          disabled={isAuditing}
        >
          <RefreshCw size={13} className={isAuditing ? 'spin' : ''} />
          <span>{isAuditing ? 'Deliberating...' : 'Trigger Multi-Agent Audit'}</span>
        </button>
      </div>

      {/* 4 Agent Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {agents.map(agent => {
          const Icon = getAgentIcon(agent.avatar);
          const isSelected = selectedAgent.id === agent.id;

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className="saas-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                background: isSelected ? '#1A1A26' : 'var(--bg-card)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '6px', 
                  background: `${agent.color}15`,
                  border: `1px solid ${agent.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: agent.color
                }}>
                  <Icon size={16} />
                </div>

                <span className="badge-clean success" style={{ fontSize: '0.68rem' }}>
                  {agent.status}
                </span>
              </div>

              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC' }}>
                {agent.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '8px' }}>
                {agent.role}
              </div>

              <div style={{ 
                background: '#101017', 
                border: '1px solid #272734', 
                padding: '6px 8px', 
                borderRadius: '4px',
                fontSize: '0.72rem',
                color: '#94A3B8',
                lineHeight: 1.4
              }}>
                {agent.currentTask}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Consensus Stream (8 cols) vs Agent Dossier (4 cols) */}
      <div className="grid-12">
        <div className="col-8">
          <div className="saas-card">
            <div className="saas-card-header">
              <div>
                <h2 className="saas-card-title">Inter-Agent Consensus Log</h2>
                <p className="saas-card-subtitle">Real-time reasoning stream between agents.</p>
              </div>
              <span className="badge-clean primary">4 Synced</span>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px', 
              maxHeight: '440px', 
              overflowY: 'auto'
            }}>
              {logs.map(log => {
                const matchedAgent = agents.find(a => a.name === log.sender) || agents[0];
                const Icon = getAgentIcon(matchedAgent.avatar);

                return (
                  <div 
                    key={log.id}
                    style={{
                      background: '#101017',
                      border: '1px solid #272734',
                      borderRadius: '6px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}
                  >
                    <div style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '4px', 
                      background: `${matchedAgent.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: matchedAgent.color,
                      flexShrink: 0
                    }}>
                      <Icon size={12} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: matchedAgent.color }}>
                          {log.sender}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{log.time}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4 }}>
                        {log.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Agent Dossier */}
        <div className="col-4">
          <div className="saas-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: '6px', 
                background: `${selectedAgent.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: selectedAgent.color
              }}>
                {React.createElement(getAgentIcon(selectedAgent.avatar), { size: 18 })}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F8FAFC' }}>{selectedAgent.name}</h3>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{selectedAgent.role}</div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                Directive & Philosophy:
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', fontStyle: 'italic', lineHeight: 1.5 }}>
                "{selectedAgent.dialogue}"
              </p>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Telemetry:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {Object.entries(selectedAgent.metrics).map(([key, val]) => (
                  <div key={key} style={{ background: '#101017', border: '1px solid #272734', padding: '6px 8px', borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'capitalize' }}>{key}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Recent Activities:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedAgent.recentActions.map((ra, idx) => (
                  <div key={idx} style={{ fontSize: '0.72rem', borderLeft: `2px solid ${selectedAgent.color}`, paddingLeft: '6px' }}>
                    <div style={{ color: '#64748B' }}>{ra.time}</div>
                    <div style={{ color: '#94A3B8' }}>{ra.action}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
