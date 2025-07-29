// components/LoadingSkeleton.js
import styles from '../styles/Home.module.css';

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonSubtitle}></div>
      </div>
      
      <div className={styles.skeletonMetricGrid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.skeletonMetricCard}></div>
        ))}
      </div>
      
      <div className={styles.skeletonChart}></div>
      <div className={styles.skeletonTable}></div>
    </div>
  );
}