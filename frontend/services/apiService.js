// apiService.js
export const initModel = async (modelName, GPT_name) => {
  try {
    const response = await fetch(`http://localhost:5000/init/${modelName}/${GPT_name}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to initialize model');
    }

    const data = await response.json();
    console.log(data); // Log the response from initialization
  } catch (error) {
    console.error('Error during model initialization:', error);
  }
};

export const getResponse = async (query) => {
  try {
    const url = new URL(`http://localhost:5000/get_response`);
    url.search = new URLSearchParams({ query }).toString();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = JSON.parse(await response.text());

    // Log the response text for debugging
    console.log("Response from API:", responseText);

    return responseText.response;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

