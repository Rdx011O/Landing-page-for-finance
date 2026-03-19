import React from 'react';
import { tickerNews } from '../hooks/useRealTimeStock';
import './TickerQueue.css';

const TickerQueue = () => {
  return (
    <div className="terminal-ticker-wrapper">
      <div className="ticker-label">
        * MSG *
      </div>
      <div className="ticker-scroll">
        {[...tickerNews, ...tickerNews].map((news, idx) => (
          <span key={idx} className="ticker-item">
            <span className="ticker-time">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span> {news} <span className="ticker-sep">***</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerQueue;
