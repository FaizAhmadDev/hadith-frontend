const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function queryAPI(queryText, includeArabic = false) {
  try {
    console.log('🔍 Querying API:', API_URL);
    console.log('📝 Query:', queryText, '| Arabic:', includeArabic);
    
    // Correct Gradio endpoint is /api/predict (NOT /call/query)
    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [queryText, includeArabic]
      }),
      // NO timeout here - let browser handle it
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ API Response:', result);

    // Gradio returns: { data: ["json_string"], durations: [...] }
    if (result && result.data && result.data[0]) {
      const jsonString = result.data[0];
      
      console.log('📦 Parsing JSON...');
      const parsed = JSON.parse(jsonString);
      
      console.log('✅ Parsed result:', parsed);
      return parsed;
    }

    throw new Error('Invalid response format from API');
    
  } catch (error) {
    console.error('❌ API Error:', error);
    
    // Provide user-friendly error messages
    if (error.message.includes('404')) {
      throw new Error('API endpoint not found. Please check backend deployment.');
    }
    
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to API. Please check your internet connection.');
    }
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. The backend might be starting up, please try again.');
    }
    
    throw new Error(error.message || 'Failed to get response from API');
  }
}