// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import DataTable from '../components/DataTable';
import ChartSection from '../components/ChartSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setData({
          metrics: {
            impressions: '1.2M',
            clicks: '45.6K',
            conversions: '3.8K',
            revenue: '$52.4K'
          },
          lastUpdated: new Date().toLocaleTimeString(),
          tableData: [
            { name: 'Campaign Alpha', email: 'alpha@brand.com', revenue: '$10.2K', status: 'Active' },
            { name: 'Campaign Beta', email: 'beta@brand.com', revenue: '$8.9K', status: 'Paused' },
            { name: 'Campaign Gamma', email: 'gamma@brand.com', revenue: '$12.4K', status: 'Completed' },
            { name: 'Campaign Delta', email: 'delta@brand.com', revenue: '$6.5K', status: 'Active' },
          ]
        });
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      <Head>
        <title>ADmyBRAND Insights</title>
        <meta name="description" content="Real-time marketing analytics dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      <div className={styles.mainContent}>
        <Header refreshTime={data?.lastUpdated} />

        <main className={styles.dashboard}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className={styles.headerSection}>
                <div className={styles.headerText}>
                  <h1 className={styles.title}>Welcome to ADmyBRAND Insights</h1>
                  <p className={styles.subtitle}>
                    Your complete marketing performance dashboard
                    <span className={styles.lastUpdated}>Last updated: {data.lastUpdated}</span>
                  </p>
                </div>
                <div className={styles.quickActions}>
                  <button className={styles.exportButton}>Export Report</button>
                </div>
              </div>

              <div className={styles.metricGrid}>
                <MetricCard 
                  title="Impressions" 
                  value={data.metrics.impressions}
                  trend="up" 
                  change="12%"
                  icon="👁️"
                />
                <MetricCard 
                  title="Clicks" 
                  value={data.metrics.clicks}
                  trend="up" 
                  change="8%"
                  icon="🖱️"
                />
                <MetricCard 
                  title="Conversions" 
                  value={data.metrics.conversions}
                  trend="down" 
                  change="3%"
                  icon="🔄"
                />
                <MetricCard 
                  title="Revenue" 
                  value={data.metrics.revenue}
                  trend="up" 
                  change="15%"
                  icon="💰"
                />
              </div>

              <div className={`${styles.chartContainer} ${styles.fadeIn}`}>
                <ChartSection theme={theme} />
              </div>

              <div className={`${styles.tableContainer} ${styles.fadeIn}`}>
                <div className={styles.tableHeader}>
                  <h2 className={styles.sectionTitle}>Recent Campaign Performance</h2>
                  <div className={styles.tableActions}>
                    <select className={styles.filterDropdown}>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last quarter</option>
                    </select>
                  </div>
                </div>
                <DataTable theme={theme} data={data.tableData} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
