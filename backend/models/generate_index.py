import os
import json
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI

openAI_API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = openAI_API_KEY

pinecone_API_KEY = ""
with open("./PINECONE_API_KEY.txt", "r") as f:
    pinecone_API_KEY = f.read()
pc = Pinecone(api_key=pinecone_API_KEY)

from llama_index import (
    Document,
    VectorStoreIndex,
)
from llama_index.node_parser import SimpleNodeParser

client = OpenAI()


def create_embeddings(dataset):
    # TODO: TESTING
    embedded_data = []
    for data in enumerate(dataset):
        embedding = client.embeddings.create(
            model="text-embedding-3-small", input=[str(data)]
        )
        embedded_data.append(
            {
                "id": list(data.keys())[0],
                "embedding": embedding,
            }
        )
    return embedded_data  # Format should be {id: abc, embedding: [1,2,3...,14,15,16]}


def create_index(dataset, pinecone):
    if pinecone:
        data = create_embeddings(dataset)
        pc.create_index(
            name={dataset},
            dimension=1536,
            metric="euclidean",
            spec=ServerlessSpec(cloud="aws", region="us-west-2"),
        )
        index = pc.index(name=dataset)
        index.upsert(items=data)
    else:
        documents = [
            Document(text=str(course))
            for course in json.load(open(f"./data/{dataset}.json", "r"))
        ]
        parser = SimpleNodeParser.from_defaults()
        nodes = parser.get_nodes_from_documents(documents)
        index = VectorStoreIndex(nodes, show_progress=True)
        index.storage_context.persist(persist_dir=f"./models/{dataset}_persist")


create_index("s24_clean", True)
