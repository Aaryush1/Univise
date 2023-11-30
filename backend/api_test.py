import requests

url = "http://127.0.0.1:5000"

requests.post(f"{url}/init/model_150/gpt-3.5-turbo")


def get_stream():
    s = requests.Session()
    with s.get(
        f"{url}/get_response_stream",
        params={"query": "Tell me about some classes I can take as a freshman"},
        stream=True,
    ) as r:
        for token in r.iter_lines():
            print(token.decode("utf-8"))

print("API_TEST RUNNING")

# Get Response Example
# print(
#     requests.get(
#         f"{url}/get_response",
#         params={"query": "What do you know about biology classes?"},
#     ).text
# )

# Streaming Response Example
print(get_stream())


