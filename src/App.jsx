import React from 'react';
import Header from './components/Header';
import TickerQueue from './components/TickerQueue';
import TerminalChart from './components/TerminalChart';
import MarketOverview from './components/MarketOverview';
import TerminalNews from './components/TerminalNews';
import TerminalPanel from './components/TerminalPanel';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <TickerQueue />
      
      <main className="main-content">
        <div className="col-left" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ flex: '1.5' }}>
            <TerminalChart />
          </div>
          <div style={{ flex: '1' }}>
            <MarketOverview />
          </div>
        </div>
        
        <div className="col-right" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ flex: '2' }}>
            <TerminalNews />
          </div>
          <div style={{ flex: '1' }}>
             <TerminalPanel title="HELP & SUPPORT" extraHeader="F8 TO CALL">
               <ul style={{ color: 'var(--text-secondary)' }}>
                 <li><span style={{ color: 'var(--text-muted)'}}>PHONE:</span> +91 (123) 456-7890</li>
                 <li><span style={{ color: 'var(--text-muted)'}}>EMAIL:</span> info@financialnews.com</li>
                 <li><span style={{ color: 'var(--text-muted)'}}>LOC:</span> 123 Finance Avenue, Moneytown, IN 110001</li>
                 <li style={{ marginTop: '16px', color: 'var(--text-primary)'}}>SYSTEM STATUS: ONLINE</li>
                 <li style={{ color: 'var(--status-up)'}}>CONNECTION: SECURE SSL</li>
               </ul>
             </TerminalPanel>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
