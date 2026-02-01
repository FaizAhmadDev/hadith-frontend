const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function queryAPI(queryText, includeArabic = false) {
  try {
    // Use Gradio's client endpoint
    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [queryText, includeArabic],
        fn_index: 0 // First function in interface
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('API Response:', result);

    // Gradio returns: { data: ["json_string"] }
    if (result && result.data && result.data[0]) {
      const jsonString = result.data[0];
      const parsed = JSON.parse(jsonString);
      return parsed;
    }

    throw new Error('Invalid response format');
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}