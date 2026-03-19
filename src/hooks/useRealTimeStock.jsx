import React, { createContext, useContext, useState, useEffect } from 'react';

const initialData = {
  nifty: { symbol: 'NIFTY 50', price: 22145.30, change: 0, percentChange: 0, trend: 'up', history: [] },
  sensex: { symbol: 'SENSEX', price: 72831.94, change: 0, percentChange: 0, trend: 'up', history: [] },
  banknifty: { symbol: 'BANK NIFTY', price: 46789.20, change: 0, percentChange: 0, trend: 'up', history: [] },
  active: { symbol: '', price: 0, change: 0, percentChange: 0, trend: 'up', history: [] },
  stocks: [] // New huge list
};

const EXTRA_STOCKS = [
  'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'BHARTIARTL.NS',
  'SBIN.NS', 'INFY.NS', 'LICINDIA.NS', 'ITC.NS', 'HINDUNILVR.NS',
  'LT.NS', 'BAJFINANCE.NS', 'HCLTECH.NS', 'MARUTI.NS', 'SUNPHARMA.NS',
  'TATAMOTORS.NS', 'KOTAKBANK.NS', 'ONGC.NS', 'TITAN.NS', 'NTPC.NS',
  'AXISBANK.NS', 'BAJAJFINSV.NS', 'ASIANPAINT.NS', 'WIPRO.NS', 'TATASTEEL.NS',
  'RELIANCE.BO', 'TCS.BO', 'HDFCBANK.BO', 'ICICIBANK.BO', 'INFY.BO', 'ZOMATO.NS',
  'PAYTM.NS', 'NYKAA.NS', 'POLICYBZR.NS', 'DELHIVERY.NS', 'ADANIENT.NS', 'ADANIPORTS.NS',
  'COALINDIA.NS', 'HDFCLIFE.NS', 'ULTRACEMCO.NS', 'GRASIM.NS', 'TECHM.NS', 'CIPLA.NS'
];

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(initialData);
  const [activeSymbol, setActiveSymbol] = useState('^NSEI');

  const fetchAndSetData = async () => {
    try {
      const symbols = { nifty: '^NSEI', sensex: '^BSESN', banknifty: '^NSEBANK', active: activeSymbol };
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

      // Now fetch quotes for the huge list
      if (EXTRA_STOCKS.length > 0) {
        const batchSymbols = EXTRA_STOCKS.join(',');
        const quoteResponse = await fetch(`/api/finance/v7/finance/quote?symbols=${batchSymbols}`);
        if(quoteResponse.ok) {
          const json = await quoteResponse.json();
          const results = json.quoteResponse?.result || [];
          
          const newStocks = results.map(r => {
            const currentPrice = r.regularMarketPrice || 0;
            const change = r.regularMarketChange || 0;
            const percentChange = r.regularMarketChangePercent || 0;
            return {
              symbol: r.symbol,
              price: currentPrice,
              change: change,
              percentChange: percentChange,
              trend: change > 0 ? 'up' : change < 0 ? 'down' : ''
            };
          });

          setMarketData(prev => ({ ...prev, stocks: newStocks }));
        }
      }

    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setMarketData(prev => ({
      ...prev,
      active: { ...prev.active, history: [], symbol: activeSymbol } // reset history for new symbol
    }));
    
    fetchAndSetData();
    const interval = setInterval(() => {
      fetchAndSetData();
    }, 10000); // 10s fetch

    return () => clearInterval(interval);
  }, [activeSymbol]);

  return (
    <StockContext.Provider value={{ marketData, activeSymbol, setActiveSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => useContext(StockContext);

// Backwards compatibility for existing components not updated yet
export const useRealTimeStock = useStockContext;

export const tickerNews = [
  "BSE SENSEX CROSSES 73000 MARK IN EARLY TRADE",
  "NIFTY BANK SHOWS STRONG RESISTANCE AT 46000",
  "RBI MPC MAINTAINS REPO RATE AT 6.5%",
  "FII NET BUYING RS 2400 CR YESTERDAY",
  "RELIANCE IND ANNOUNCES NEW GREEN ENERGY CAPEX"
];
