import React from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.profile}>
        <Image 
          src="/profile.jpg" // Make sure you have profile.jpg in the public folder
          alt="User Profile"
          width={60}
          height={60}
          className={styles.avatar}
        />
        <div>
          <p className={styles.name}>Rishwanth M</p>
          <p className={styles.role}>Analyst</p>
        </div>
      </div>

      <h2 className={styles.logo}>ADmyBRAND</h2>

      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Dashboard</Link>
        <Link href="/reports">
  <div className="sidebar-item">
    <i className="icon-report" /> Reports
  </div>
</Link>
        <Link href="/analytics" className={styles.link}>Analytics</Link>
        <Link href="/settings" className={styles.link}>Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
