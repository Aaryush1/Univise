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

from llama_index.core import VectorStoreIndex, Document
from llama_index.core import StorageContext
from llama_index.vector_stores.pinecone import PineconeVectorStore

client = OpenAI()


def create_embeddings(data, dataset):
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


def create_index(dataset):
    # TODO: Add metadata
    # TODO: Update to embedding-3-small
    index_name = dataset.lower().replace("_", "-")

    documents = [
        Document(
            text=str(course),
            metadata={
                "course": list(course.keys())[0],
                "school": course[list(course.keys())[0]]["school"],
                "credits": course[list(course.keys())[0]]["credits"],
            },
        )
        for course in json.load(open(f"./data/{dataset}.json", "r"))
    ]
    pc.delete_index(index_name)
    pc.create_index(
        name=index_name,
        dimension=1536,
        metric="euclidean",
        spec=ServerlessSpec(cloud="aws", region="us-west-2"),
    )
    pc_index = pc.Index(name=index_name)
    vector_store = PineconeVectorStore(pc_index)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    index = VectorStoreIndex.from_documents(
        documents, storage_context=storage_context, show_progress=True
    )


if __name__ == "__main__":
    """
    if len(sys.argv) < 2:
        print("Usage: python generate_index.py <dataset>")
        sys.exit(1)
    create_index(sys.argv[1], True)
    """
    create_index("s24_clean")
