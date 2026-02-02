import styles from './Header.module.css';

export default function Header() {  // Removed props
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.icon}>🕌</span>
          <h1>Hadith Explanation System</h1>
        </div>
      </div>
      
      <div className={styles.subtitle}>
        <p>Search and understand hadiths from Sahih al-Bukhari and Sahih Muslim</p>
      </div>
    </header>
  );
}