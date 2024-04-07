import requests
import time

base_url = "https://aaryush.pythonanywhere.com"


def get_response(query):
    try:
        url = f"{base_url}/get_response"
        params = {"query": query}

        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises a HTTPError if the status code is 4xx or 5xx

        response_text = response.json()
        print("Response from API:", response_text)

        return response_text["response"]

    except requests.exceptions.RequestException as error:
        print("There was a problem with the request:", error)


def init_model(model_name, gpt_name):
    try:
        url = f"{base_url}/init/{model_name}/{gpt_name}"

        response = requests.post(url)
        response.raise_for_status()  # Raises a HTTPError if the status code is 4xx or 5xx

        print("Model initialized successfully")

    except requests.exceptions.RequestException as error:
        print("There was a problem with the request:", error)


# Test the API with sample model and GPT names
model_name = "s25_clean"
gpt_name = "gpt-4-turbo-preview"
init_model(model_name, gpt_name)

time.sleep(2)

query = "What can you do?"
while query != "exit":
    response = get_response(query)
    print("Response:", response)
    query = input("Enter your query: ")
