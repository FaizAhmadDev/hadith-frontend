import styles from './Header.module.css';

export default function Header({ showArabic, setShowArabic }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.icon}>🕌</span>
          <h1>Hadith Explanation System</h1>
        </div>
        
        <div className={styles.controls}>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={showArabic}
              onChange={(e) => setShowArabic(e.target.checked)}
            />
            <span>Show Arabic Text</span>
          </label>
        </div>
      </div>
      
      <div className={styles.subtitle}>
        <p>Search and understand hadiths from Sahih al-Bukhari and Sahih Muslim</p>
      </div>
    </header>
  );
}