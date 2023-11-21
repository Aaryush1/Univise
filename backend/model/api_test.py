from model_api import init_model, get_response_stream, get_response
import requests

init_model()
print(get_response("What are good freshman bio classes?"))
for token in get_response_stream():
    print(token, end="")


# TODO: Add API calls
