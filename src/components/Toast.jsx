import React from 'react';
import { Sparkles, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container-subtle">
      {toasts.map(toast => (
        <div key={toast.id} className="toast-subtle">
          <Sparkles size={14} color="#8B5CF6" />
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button 
            onClick={() => onDismiss(toast.id)}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
