import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useRealTimeStock } from '../hooks/useRealTimeStock';
import TerminalPanel from './TerminalPanel';

const TerminalChart = () => {
  const { marketData } = useRealTimeStock();
  
  // Nifty 50 is our target for the chart
  const data = marketData.nifty.history;
  const currentPrice = marketData.nifty.price;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#000', border: '1px solid #00e5ff', padding: '4px', fontSize: '12px', color: '#ffeb3b' }}>
          <p>{`TIME: ${label}`}</p>
          <p style={{ color: '#00ff00' }}>{`VAL : ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <TerminalPanel title="G 1 <GO> : NIFTY 50 INTRADAY" extraHeader={`${currentPrice.toFixed(2)}`}>
      <div style={{ width: '100%', height: '300px', backgroundColor: '#000' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis 
                dataKey="time" 
                stroke="#004488" 
                tick={{ fill: '#888888', fontSize: 10 }}
                tickLine={false}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#004488"
                tick={{ fill: '#00e5ff', fontSize: 10 }}
                orientation="right"
                tickFormatter={(val) => val.toFixed(0)}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={data[0]?.price} stroke="#ffeb3b" strokeDasharray="3 3" />
              <Line 
                type="stepAfter" 
                dataKey="price" 
                stroke="#00ff00" 
                strokeWidth={1.5} 
                dot={false}
                isAnimationActive={false} // Terminal charts are instant
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            ACQUIRING DATA...
          </div>
        )}
      </div>
    </TerminalPanel>
  );
};

export default TerminalChart;
