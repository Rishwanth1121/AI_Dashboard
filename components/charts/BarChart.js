// components/charts/BarChart.js
'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts';
import { useState } from 'react';

const data = [
  { day: 'Mon', users: 120, fill: '#0088FE' },
  { day: 'Tue', users: 98, fill: '#00C49F' },
  { day: 'Wed', users: 150, fill: '#FFBB28' },
  { day: 'Thu', users: 200, fill: '#FF8042' },
  { day: 'Fri', users: 250, fill: '#8884D8' },
];

export default function CustomBarChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Daily Active Users</h3>
        <div className="chart-subtitle">Last Week Performance</div>
      </div>
      
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f0f0f0" 
            />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none'
              }}
              itemStyle={{ color: '#1e293b' }}
              labelStyle={{ fontWeight: 'bold', color: '#334155' }}
            />
            <Bar 
              dataKey="users" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              onMouseEnter={handleMouseEnter}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={activeIndex === index ? '#3b82f6' : entry.fill}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  stroke="#1d4ed8"
                />
              ))}
              <LabelList 
                dataKey="users" 
                position="top" 
                fill={activeIndex !== null ? '#1e293b' : '#64748b'}
                fontSize={12}
                fontWeight={500}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .chart-container {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        .chart-container:hover {
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .chart-header {
          margin-bottom: 16px;
        }
        .chart-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        .chart-subtitle {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }
        .chart-wrapper {
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}