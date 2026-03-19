import React, { useState } from 'react';
import TerminalPanel from './TerminalPanel';
import './TerminalNews.css';

const MOCK_NEWS = [
  { time: "11:42", source: "RTRS", title: "Global Markets Rally as Tech Giants Report Record Earnings", isAlert: true },
  { time: "11:30", source: "BBG", title: "Central Bank Indicates Potential Rate Cuts in Q4", isAlert: false },
  { time: "11:15", source: "DJ", title: "New Regulations Proposed for Cryptocurrency Exchanges", isAlert: false },
  { time: "10:55", source: "RTRS", title: "Oil Prices Surge Following Middle East Tensions", isAlert: true },
  { time: "10:30", source: "BBG", title: "European Indices open higher; DAX up 0.4%", isAlert: false },
  { time: "10:05", source: "FT", title: "Tech IPO Pipeline strengthen heading into H2", isAlert: false },
  { time: "09:45", source: "RTRS", title: "Retail Sales Exceed Expectations by 1.2% Month-over-Month", isAlert: false },
  { time: "09:00", source: "BBG", title: "MARKET OPEN: Asian markets mixed on early trading", isAlert: false },
];

const TerminalNews = () => {
  const [filter, setFilter] = useState('');

  return (
    <TerminalPanel title="TOP News" extraHeader="F1 FOR MORE">
      <div className="news-controls">
        <label>SEARCH: </label>
        <input 
          type="text" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value.toUpperCase())} 
          className="news-filter-input"
        />
      </div>
      <ul className="terminal-news-list">
        {MOCK_NEWS.filter(n => n.title.toUpperCase().includes(filter)).map((news, idx) => (
          <li key={idx} className={`news-item ${news.isAlert ? 'news-alert' : ''}`}>
            <span className="news-time">{news.time}</span>
            <span className="news-source">{news.source}</span>
            <span className="news-title">{news.title}</span>
          </li>
        ))}
      </ul>
    </TerminalPanel>
  );
};

export default TerminalNews;
