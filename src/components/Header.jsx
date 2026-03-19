import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [cmd, setCmd] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e) => {
    e.preventDefault();
    if (cmd.trim().toUpperCase() === 'HELP') {
      alert("Terminal Commands: \nNIFTY <GO>\nSENSEX <GO>\nNEWS <GO>");
    }
    setCmd('');
  };

  return (
    <header className="terminal-header">
      <div className="header-top">
        <div className="sys-info">
          <span>FNZP CORE SYS V4.2</span>
          <span className="separator">|</span>
          <span className="text-cyan">UID: TRADER_01</span>
        </div>
        <div className="sys-clock">
          <span>{date}</span>
          <span className="text-magenta" style={{ marginLeft: '10px' }}>{time}</span>
        </div>
      </div>
      
      <div className="header-cmd">
        <span className="prompt">{'>'}</span>
        <form onSubmit={handleCommand} style={{ display: 'inline', width: '100%' }}>
          <input 
            type="text" 
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="ENTER COMMAND OR TICKER <GO>"
            className="cmd-input"
            autoFocus
          />
        </form>
        <span className="cursor-blink">_</span>
      </div>

      <nav className="header-nav">
        <a href="#market">1) MRKT</a>
        <a href="#chart">2) CRV</a>
        <a href="#news">3) NEWS</a>
        <a href="#alert">4) ALRT</a>
        <a href="#help">5) HELP</a>
      </nav>
    </header>
  );
};

export default Header;
