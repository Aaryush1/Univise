import os
import json
import sys
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI

openAI_API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    openAI_API_KEY = f.read()
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


def create_embeddings(data, dataset):
    # TODO: TESTING
    embedded_data = []
    for item in data:
        print(f"Embedding: {list(item.keys())[0]}")
        embedding = client.embeddings.create(
            model="text-embedding-3-small", input=[str(item)]
        )
        embedded_data.append(
            {
                "id": list(item.keys())[0],
                "values": embedding.data[0].embedding,
            }
        )
    with open(f"./models/embeddings/{dataset}_embeddings.json", "w") as f:
        json.dump(embedded_data, f)
    return embedded_data


def create_index(dataset, pinecone):
    if pinecone:
        # TODO: Add metadata
        index_name = dataset.lower().replace("_", "-")
        data = json.load(open(f"./data/{dataset}.json", "r"))
        if not os.path.exists(f"./models/embeddings/{dataset}_embeddings.json"):
            print("Creating embeddings...")
            embedded_data = create_embeddings(data, dataset)
        embedded_data = json.load(
            open(f"./models/embeddings/{dataset}_embeddings.json", "r")
        )
        pc.delete_index(index_name)
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="euclidean",
            spec=ServerlessSpec(cloud="aws", region="us-west-2"),
        )
        index = pc.Index(name=index_name)
        for i in range(0, len(embedded_data), 200):
            print(
                f"Upserting {i} to {min(i+200, len(embedded_data) - 1)}, Start: {embedded_data[i]['id']} End:{embedded_data[min(i+200, len(embedded_data) - 1)]['id']}"
            )
            index.upsert(
                vectors=embedded_data[i : min(i + 200, len(embedded_data)) - 1]
            )

    else:
        documents = [
            Document(text=str(course))
            for course in json.load(open(f"./data/{dataset}.json", "r"))
        ]
        parser = SimpleNodeParser.from_defaults()
        nodes = parser.get_nodes_from_documents(documents)
        index = VectorStoreIndex(nodes, show_progress=True)
        index.storage_context.persist(persist_dir=f"./models/{dataset}_persist")


if __name__ == "__main__":
    """
    if len(sys.argv) < 2:
        print("Usage: python generate_index.py <dataset>")
        sys.exit(1)
    create_index(sys.argv[1], True)
    """
    create_index("s24_clean", True)
