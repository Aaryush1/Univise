// apiService.js
export const getResponse = async (query) => {
    try {
      const url = new URL(`https://univise-backend.vercel.app/get_response`);
      url.search = new URLSearchParams({ query }).toString();
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.text();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  