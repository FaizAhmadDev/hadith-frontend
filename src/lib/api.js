const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function queryAPI(queryText) {  // Removed includeArabic param
  try {
    console.log('🔍 Querying:', queryText);
    
    const response = await fetch(`${API_URL}/run/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [queryText]  // Single parameter
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result && result.data && result.data[0]) {
      const jsonString = result.data[0];
      return JSON.parse(jsonString);
    }

    throw new Error('Invalid response');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}