// apiService.js

// https://api.univise.com
// http://localhost:5000
const base_url = 'https://aaryush.pythonanywhere.com';

export const initModel = async (modelName, GPT_name) => {
  try {
    const response = await fetch(`${base_url}/init/${modelName}/${GPT_name}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to initialize model');
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error during model initialization:', error);
  }
};

export const getResponse = async (query) => {
  try {
    const url = new URL(`${base_url}/get_response`);
    url.search = new URLSearchParams({ query }).toString();

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = JSON.parse(await response.text());

    return responseText.response;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

