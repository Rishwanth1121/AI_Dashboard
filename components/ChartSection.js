// components/ChartSection.js
import React from 'react';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';

export default function ChartSection() {
  return (
    <div>
      <h2>Analytics</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <LineChart />
        </div>
        <div style={{ flex: 1 }}>
          <PieChart />
        </div>
        <div style={{ flex: 1 }}>
          <BarChart /> {/* ✅ Add this */}
        </div>
      </div>
    </div>
  );
}
