// components/MetricCard.js
import React from 'react';
import styles from '../styles/Home.module.css';
import { FaDollarSign, FaShareAlt, FaThumbsUp, FaStar } from 'react-icons/fa';

const iconMap = {
  Impressions: <FaShareAlt />,
  Clicks: <FaThumbsUp />,
  Conversions: <FaStar />,
  Revenue: <FaDollarSign />
};

export default function MetricCard({ title, value }) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.metricIcon}>{iconMap[title]}</div>
      <div className={styles.metricTitle}>{title}</div>
      <div className={styles.metricValue}>{value}</div>
    </div>
  );
}
