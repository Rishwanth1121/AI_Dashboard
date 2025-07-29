'use client';
import { useState } from 'react';
import styles from '../../styles/reports.module.css';

export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([]);

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        type: reportType,
        dateGenerated: new Date().toISOString().split('T')[0],
        dateRange: `${startDate} to ${endDate}`,
        status: 'ready'
      };
      
      setGeneratedReports([newReport, ...generatedReports]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleDownload = (reportId) => {
    // Simulate download
    const report = generatedReports.find(r => r.id === reportId);
    alert(`Downloading ${report.name} (${report.dateRange})`);
    // In a real app, you would trigger a file download here
  };

  const reportHistory = [
    {
      id: 1,
      name: 'Weekly Activity Summary',
      type: 'summary',
      dateGenerated: '2025-07-27',
      dateRange: '2025-07-20 to 2025-07-27'
    },
    {
      id: 2,
      name: 'Monthly Usage Stats',
      type: 'usage',
      dateGenerated: '2025-07-01',
      dateRange: '2025-06-01 to 2025-06-30'
    },
    {
      id: 3,
      name: 'Custom Engagement Report',
      type: 'custom',
      dateGenerated: '2025-06-30',
      dateRange: '2025-06-01 to 2025-06-30'
    }
  ];

  const allReports = [...generatedReports, ...reportHistory];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics Reports</h1>
        <p className={styles.subtitle}>Generate and download detailed reports of your marketing performance</p>
      </div>

      {/* Report Generation Section */}
      <div className={styles.generationCard}>
        <h2 className={styles.sectionTitle}>Create New Report</h2>
        
        <div className={styles.reportFilters}>
          <div className={styles.filterGroup}>
            <label htmlFor="reportType">Report Type</label>
            <select 
              id="reportType" 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="summary">Summary Report</option>
              <option value="usage">Usage Analytics</option>
              <option value="activity">User Activity</option>
              <option value="custom">Custom Report</option>
              <option value="performance">Campaign Performance</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input 
              type="date" 
              id="startDate" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate || new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="endDate">End Date</label>
            <input 
              type="date" 
              id="endDate" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button 
            className={styles.generateBtn}
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className={styles.spinner}></span>
                Generating...
              </>
            ) : 'Generate Report'}
          </button>
        </div>
      </div>

      {/* Report Templates Section */}
      <div className={styles.templatesSection}>
        <h2 className={styles.sectionTitle}>Quick Report Templates</h2>
        <div className={styles.templateGrid}>
          <div className={styles.templateCard}>
            <h3>Weekly Summary</h3>
            <p>Key metrics from the past 7 days</p>
            <button 
              className={styles.secondaryBtn}
              onClick={() => {
                const today = new Date();
                const lastWeek = new Date(today);
                lastWeek.setDate(today.getDate() - 7);
                setStartDate(lastWeek.toISOString().split('T')[0]);
                setEndDate(today.toISOString().split('T')[0]);
                setReportType('summary');
              }}
            >
              Use Template
            </button>
          </div>
          <div className={styles.templateCard}>
            <h3>Monthly Performance</h3>
            <p>Complete overview of the last month</p>
            <button 
              className={styles.secondaryBtn}
              onClick={() => {
                const today = new Date();
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);
                setStartDate(lastMonth.toISOString().split('T')[0]);
                setEndDate(today.toISOString().split('T')[0]);
                setReportType('performance');
              }}
            >
              Use Template
            </button>
          </div>
          <div className={styles.templateCard}>
            <h3>Quarterly Review</h3>
            <p>Complete quarter analysis</p>
            <button 
              className={styles.secondaryBtn}
              onClick={() => {
                const today = new Date();
                const lastQuarter = new Date(today);
                lastQuarter.setMonth(today.getMonth() - 3);
                setStartDate(lastQuarter.toISOString().split('T')[0]);
                setEndDate(today.toISOString().split('T')[0]);
                setReportType('custom');
              }}
            >
              Use Template
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className={styles.reportsSection}>
        <h2 className={styles.sectionTitle}>Your Reports</h2>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Date Range</th>
                <th>Generated On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.name}</td>
                  <td>
                    <span className={`${styles.reportBadge} ${styles[report.type]}`}>
                      {report.type}
                    </span>
                  </td>
                  <td>{report.dateRange}</td>
                  <td>{report.dateGenerated}</td>
                  <td>
                    <button 
                      onClick={() => handleDownload(report.id)}
                      className={styles.downloadBtn}
                    >
                      Download
                    </button>
                    <button className={styles.secondaryBtnSmall}>
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}