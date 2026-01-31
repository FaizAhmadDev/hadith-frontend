'use client';

import { useState } from 'react';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import styles from './page.module.css';

export default function Home() {
  const [showArabic, setShowArabic] = useState(false);

  return (
    <div className={styles.container}>
      <Header showArabic={showArabic} setShowArabic={setShowArabic} />
      <main className={styles.main}>
        <ChatInterface showArabic={showArabic} />
      </main>
      <footer className={styles.footer}>
        <p>
          📚 Database: 14,372 authentic hadiths from Bukhari & Muslim
          <br />
          ⚠️ For religious rulings, consult qualified scholars
        </p>
      </footer>
    </div>
  );
}