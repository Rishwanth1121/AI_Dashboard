// components/charts/PieChart.js
'use client';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label
} from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Organic', value: 400, color: '#00C49F' },
  { name: 'Paid Ads', value: 300, color: '#0088FE' },
  { name: 'Referral', value: 300, color: '#FFBB28' },
  { name: 'Social', value: 200, color: '#FF8042' },
];

export default function CustomPieChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Traffic Sources</h3>
        <div className="chart-subtitle">Last 30 Days</div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              animationDuration={1000}
              animationEasing="ease-out"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              labelLine={false}
              label={({ name, percent }) => (
                activeIndex === null ? `${(percent * 100).toFixed(0)}%` : ''
              )}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#ffffff"
                  strokeWidth={2}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                />
              ))}
              <Label 
                value="Total Traffic" 
                position="center" 
                className="pie-center-label" 
              />
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none',
                padding: '8px 12px'
              }}
              formatter={(value, name, props) => [
                `${name}: ${value} visits`,
                `${(props.payload.percent * 100).toFixed(1)}%`
              ]}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              height={40}
              wrapperStyle={{
                paddingTop: '16px'
              }}
              formatter={(value) => (
                <span style={{ color: '#64748b', fontSize: '12px' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
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
        :global(.pie-center-label) {
          font-size: 14px;
          font-weight: 500;
          fill: #64748b;
        }
      `}</style>
    </div>
  );
}