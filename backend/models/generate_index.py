import os
import json

API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

from llama_index import (
    Document,
    VectorStoreIndex,
)
from llama_index.node_parser import SimpleNodeParser


def create_index(dataset):
    documents = [
        Document(text=str(course))
        for course in json.load(open(f"./data/{dataset}.json", "r"))
    ]
    parser = SimpleNodeParser.from_defaults()
    nodes = parser.get_nodes_from_documents(documents)
    index = VectorStoreIndex(nodes, show_progress=True)
    index.storage_context.persist(persist_dir=f"./models/{dataset}_persist")


create_index("s24_clean")
