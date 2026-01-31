'use client';

import { useState, useRef, useEffect } from 'react';
import { queryAPI } from '../lib/api';
import HadithDisplay from './HadithDisplay';
import styles from './ChatInterface.module.css';

export default function ChatInterface({ showArabic }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setLoading(true);
    
    try {
      const response = await queryAPI(userMessage, showArabic);
      
      // Add bot response
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: {
          status: 'error',
          message: 'Failed to get response. Please try again.'
        }
      }]);
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    "What does Islam say about intentions?",
    "Bukhari 1",
    "Tell me about charity",
    "Muslim 5"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {messages.length === 0 && (
          <div className={styles.welcome}>
            <h2>Welcome to Hadith Explanation System</h2>
            <p>Search by keywords or hadith number (e.g., "Bukhari 1")</p>
            
            <div className={styles.examples}>
              <p className={styles.examplesTitle}>Try these examples:</p>
              {exampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  className={styles.exampleBtn}
                  onClick={() => setInput(query)}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
            {msg.role === 'user' ? (
              <div className={styles.userMessage}>
                <span className={styles.avatar}>👤</span>
                <p>{msg.content}</p>
              </div>
            ) : (
              <div className={styles.assistantMessage}>
                <span className={styles.avatar}>🤖</span>
                <HadithDisplay data={msg.content} showArabic={showArabic} />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.assistantMessage}>
              <span className={styles.avatar}>🤖</span>
              <div className={styles.loading}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any hadith or search by number..."
          className={styles.input}
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={loading || !input.trim()}
        >
          {loading ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  );
}