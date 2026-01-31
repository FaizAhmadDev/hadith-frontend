import styles from './HadithDisplay.module.css';

export default function HadithDisplay({ data, showArabic }) {
  if (!data) {
    return <div className={styles.error}>No data available</div>;
  }

  if (data.status === 'error') {
    return (
      <div className={styles.error}>
        <p>❌ {data.message}</p>
      </div>
    );
  }

  if (data.status === 'no_results' || data.status === 'not_found') {
    return (
      <div className={styles.noResults}>
        <p>🔍 {data.message}</p>
        <p className={styles.hint}>Try different keywords or check the hadith number.</p>
      </div>
    );
  }

  const hadith = data.main_hadith || data.hadith;
  
  if (!hadith) {
    return <div className={styles.error}>Invalid response format</div>;
  }

  return (
    <div className={styles.container}>
      {/* Summary */}
      {data.summary && (
        <div className={styles.summary}>
          <h3>📝 Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}

      {/* Main Hadith */}
      <div className={styles.hadithCard}>
        <div className={styles.header}>
          <span className={styles.reference}>{hadith.reference_short}</span>
          <span className={styles.collection}>{hadith.collection}</span>
        </div>

        {hadith.book && (
          <div className={styles.book}>
            📖 Book: {hadith.book}
          </div>
        )}

        <div className={styles.text}>
          <p>{hadith.hadith_text_en}</p>
        </div>

        {/* Arabic Text (if requested and available) */}
        {showArabic && hadith.has_arabic && hadith.hadith_text_ar && (
          <div className={styles.arabic}>
            <h4>النص العربي</h4>
            <p className={styles.arabicText}>{hadith.hadith_text_ar}</p>
          </div>
        )}

        {hadith.similarity_score && (
          <div className={styles.similarity}>
            🎯 Relevance: {hadith.similarity_score}%
          </div>
        )}
      </div>

      {/* Explanation */}
      {data.explanation && (
        <div className={styles.explanation}>
          <h3>💡 Explanation</h3>
          <p>{data.explanation}</p>
        </div>
      )}

      {/* Authentication Note */}
      {data.authentication_note && (
        <div className={styles.authNote}>
          <p>ℹ️ {data.authentication_note}</p>
        </div>
      )}

      {/* Related Hadiths */}
      {data.related_hadiths && data.related_hadiths.length > 0 && (
        <div className={styles.related}>
          <h3>🔗 Related Hadiths</h3>
          <div className={styles.relatedList}>
            {data.related_hadiths.map((related, idx) => (
              <div key={idx} className={styles.relatedItem}>
                <div className={styles.relatedHeader}>
                  <span className={styles.relatedRef}>{related.reference_short}</span>
                  <span className={styles.relatedScore}>{related.similarity_score}%</span>
                </div>
                <p className={styles.relatedText}>
                  {related.hadith_text_en.substring(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}