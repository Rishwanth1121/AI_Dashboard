// components/charts/LineChart.js
'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 7000 },
  { month: 'Feb', revenue: 14000 },
  { month: 'Mar', revenue: 21000 },
  { month: 'Apr', revenue: 28000 },
  { month: 'May', revenue: 35000 },
  { month: 'Jun', revenue: 42000 },
];

export default function CustomLineChart() {
  return (
    <div className="chart-container" style={{
      background: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      marginBottom: '24px'
    }}>
      <div className="chart-header">
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
          margin: '0'
        }}>Monthly Revenue</h3>
        <div style={{
          fontSize: '14px',
          color: '#64748b',
          marginTop: '4px'
        }}>Last 6 months performance</div>
      </div>

      <div style={{ marginTop: '8px', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f0f0f0" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 5,
                stroke: '#3b82f6',
                strokeWidth: 2,
                fill: '#ffffff'
              }}
              activeDot={{
                r: 7,
                stroke: '#ffffff',
                strokeWidth: 2,
                fill: '#1d4ed8'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}