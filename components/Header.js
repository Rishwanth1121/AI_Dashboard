// components/Header.js
import React from 'react'
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h2>Dashboard</h2>
      <div className={styles.profile}>
        <img
          src="/profile.jpg"
          alt="User Avatar"
          className={styles.avatar}
        />
      </div>
    </header>
  )
}
