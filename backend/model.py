from llama_index import SimpleDirectoryReader

API_KEY = ""

with open("./backend/API_KEY.txt", "r") as f:
    API_KEY = f.read()
