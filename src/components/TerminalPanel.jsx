import React from 'react';
import './TerminalPanel.css';

const TerminalPanel = ({ title, extraHeader, children, fullWidth = false, noPadding = false }) => {
  return (
    <div className={`terminal-panel ${fullWidth ? 'full-width' : ''}`}>
      <div className="panel-header">
        <span className="panel-title">{title}</span>
        {extraHeader && <span className="panel-extra">{extraHeader}</span>}
      </div>
      <div className={`panel-content ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default TerminalPanel;
