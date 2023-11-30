import requests
import time

url = "https://api.univise.org"
local_server = "http://localhost:5000"

requests.post(f"{url}/init/model_150/gpt-3.5-turbo")

time.sleep(2)


def get_stream():
    s = requests.Session()
    with s.get(
        f"{url}/get_response_stream",
        params={"query": "Tell me about some classes I can take as a freshman"},
        stream=True,
    ) as r:
        for token in r.iter_lines():
            print(token.decode("utf-8"))


# Get Response Example
print(
    requests.get(
        f"{url}/get_response",
        params={"query": "What do you know about biology classes?"},
    ).text
)

# time.sleep(2)

# Streaming Response Example
# print(get_stream())
