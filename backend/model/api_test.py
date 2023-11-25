from model_api import init_model, get_response_stream, get_response
import requests

init_model(model_name="model_150", GPT_model="gpt-3.5-turbo")
print(get_response("What are good freshman bio classes?\n"))
for token in get_response_stream("Explain Bio 101 to me."):
    print(token, end="")


# TODO: Add API calls
