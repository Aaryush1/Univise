import requests
import time

url = "https://api.univise.org"
local_server = "http://localhost:5000"

print(requests.post(f"{local_server}/init/s24_clean/gpt-3.5-turbo").json(), end="\n\n")

time.sleep(2)


def get_stream():
    s = requests.Session()
    with s.get(
        f"{local_server}/get_response_stream",
        params={
            "query": "I just took CS540, what class should I take next if I'm interested in AI?"
        },
        stream=True,
    ) as r:
        for token in r.iter_lines():
            print(token.decode("utf-8"))


# Get Response Example
print(
    requests.get(
        f"{local_server}/get_response",
        params={
            "query": "What classes can I take as a freshman in CS? I want to learn about AI."
        },
    ).text
)

# time.sleep(2)

# Streaming Response Example
# print(get_stream())
