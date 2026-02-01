import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function queryAPI(queryText, includeArabic = false) {
  try {
    console.log('API URL:', API_URL);
    console.log('Query:', queryText, 'Arabic:', includeArabic);
    
    // HuggingFace Gradio API endpoint format
    // Endpoint is: /call/query (not /api/query)
    const response = await axios.post(
      `${API_URL}/call/query`,
      {
        data: [queryText, includeArabic]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000 // 60 seconds
      }
    );

    console.log('Response:', response.data);

    // HuggingFace Gradio returns event_id first
    if (response.data && response.data.event_id) {
      const eventId = response.data.event_id;
      
      // Now fetch the actual result
      const resultResponse = await axios.get(
        `${API_URL}/call/query/${eventId}`,
        {
          timeout: 60000
        }
      );

      console.log('Result Response:', resultResponse.data);

      // The result comes in event stream format
      // Look for the "complete" event
      if (resultResponse.data) {
        // Parse the response - it might be a string with newline-separated events
        const lines = resultResponse.data.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonData = JSON.parse(line.substring(6));
            
            if (jsonData[0]) {
              // Parse the JSON string inside
              const result = JSON.parse(jsonData[0]);
              return result;
            }
          }
        }
      }
    }

    throw new Error('Invalid response format from API');
    
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - the model is taking too long to respond');
    }
    
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    }
    
    if (error.message) {
      throw new Error(error.message);
    }
    
    throw new Error('Failed to connect to the API. Please check if the backend is running.');
  }
}