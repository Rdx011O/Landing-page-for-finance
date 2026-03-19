import React from 'react';
import { useRealTimeStock } from '../hooks/useRealTimeStock';
import TerminalPanel from './TerminalPanel';
import './MarketOverview.css';

const MarketOverview = () => {
  const { marketData } = useRealTimeStock();
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });

  const renderRow = (data) => {
    const isUp = data.change >= 0;
    const colorClass = isUp ? 'text-up' : 'text-down';
    
    // Simulate bid/ask based on current price for terminal realism
    const spread = data.price * 0.0005; 
    const bid = (data.price - spread).toFixed(2);
    const ask = (data.price + spread).toFixed(2);
    const volume = Math.floor(Math.random() * 50000) + 10000;

    return (
      <tr key={data.symbol}>
        <td className="sym">{data.symbol}</td>
        <td className={colorClass}>{data.price.toFixed(2)}</td>
        <td className={colorClass}>{data.change > 0 ? '+' : ''}{data.change.toFixed(2)}</td>
        <td className={colorClass}>{data.change > 0 ? '+' : ''}{data.percentChange.toFixed(2)}%</td>
        <td>{bid}</td>
        <td>{ask}</td>
        <td>{volume.toLocaleString()}</td>
        <td className="text-muted">{timeStr}</td>
      </tr>
    );
  };

  return (
    <TerminalPanel title="EQIY: MAJOR INDICES" extraHeader="PG 1/1">
      <div className="terminal-table-wrapper">
        <table className="terminal-table">
          <thead>
            <tr>
              <th>SECURITY</th>
              <th>LAST</th>
              <th>CHG</th>
              <th>%CHG</th>
              <th>BID</th>
              <th>ASK</th>
              <th>VOLUME</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {renderRow(marketData.nifty)}
            {renderRow(marketData.sensex)}
            {renderRow(marketData.banknifty)}
            {marketData.stocks && marketData.stocks.map(stock => renderRow(stock))}
          </tbody>
        </table>
      </div>

      <div className="terminal-stats-grid">
        <div className="stat-box">
          <div className="stat-label">ADVANCES</div>
          <div className="stat-value text-up">1,402</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">DECLINES</div>
          <div className="stat-value text-down">684</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">UNCHANGED</div>
          <div className="stat-value text-warning">112</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">MARKET STATUS</div>
          <div className="stat-value text-up blink">OPEN</div>
        </div>
      </div>
    </TerminalPanel>
  );
};

export default MarketOverview;
