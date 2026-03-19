import { useState, useEffect } from 'react';

const initialData = {
  nifty: { symbol: 'NIFTY 50', price: 22145.30, change: 0, percentChange: 0, trend: 'up', history: [] },
  sensex: { symbol: 'SENSEX', price: 72831.94, change: 0, percentChange: 0, trend: 'up', history: [] },
  banknifty: { symbol: 'BANK NIFTY', price: 46789.20, change: 0, percentChange: 0, trend: 'up', history: [] },
};

export const useRealTimeStock = () => {
  const [marketData, setMarketData] = useState(initialData);

  const fetchLiveMarketData = async () => {
    try {
      const symbols = { nifty: '^NSEI', sensex: '^BSESN', banknifty: '^NSEBANK' };
      
      setMarketData(prev => {
        const newData = { ...prev };
        
        // This is async inside a sync updater, which is bad practice. 
        // We will fetch first, then update state.
        return newData;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAndSetData = async () => {
    try {
      const symbols = { nifty: '^NSEI', sensex: '^BSESN', banknifty: '^NSEBANK' };
      const updates = {};
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });

      for (const [key, symbol] of Object.entries(symbols)) {
        const response = await fetch(`/api/finance/v8/finance/chart/${symbol}?interval=1m&range=1d`);
        if (response.ok) {
          const json = await response.json();
          const result = json.chart.result[0];
          const meta = result.meta;
          const currentPrice = meta.regularMarketPrice;
          const previousClose = meta.previousClose;
          const change = currentPrice - previousClose;
          const trend = change > 0 ? 'up' : change < 0 ? 'down' : '';

          updates[key] = {
            price: currentPrice,
            change: change,
            percentChange: (change / previousClose) * 100,
            trend
          };
        }
      }

      setMarketData(prev => {
        const next = { ...prev };
        for (const [key, data] of Object.entries(updates)) {
          // Keep only last 30 data points for charting
          const newHistory = [...next[key].history, { time: timeStr, price: data.price }].slice(-30);
          next[key] = {
            ...next[key],
            ...data,
            history: newHistory
          };
        }
        return next;
      });

    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAndSetData();
    const interval = setInterval(() => {
      fetchAndSetData();
    }, 10000); // 10s fetch

    return () => clearInterval(interval);
  }, []);

  return { marketData };
};

export const tickerNews = [
  "BSE SENSEX CROSSES 73000 MARK IN EARLY TRADE",
  "NIFTY BANK SHOWS STRONG RESISTANCE AT 46000",
  "RBI MPC MAINTAINS REPO RATE AT 6.5%",
  "FII NET BUYING RS 2400 CR YESTERDAY",
  "RELIANCE IND ANNOUNCES NEW GREEN ENERGY CAPEX"
];
