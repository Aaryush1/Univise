import os
import pinecone
from embeddings import create_documents

API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

from llama_index import (
    ServiceContext,
    set_global_service_context,
    VectorStoreIndex,
    StorageContext,
    Document,
)
from llama_index.llms import OpenAI
from llama_index.memory import ChatMemoryBuffer
from llama_index.vector_stores import PineconeVectorStore

PINECONE_API_KEY = ""
with open("./PINECONE_API_KEY.txt", "r") as f:
    PINECONE_API_KEY = f.read()

pinecone.init(api_key=PINECONE_API_KEY, environment="us-west4-gcp-free")
# pinecone.create_index("pinecone-model-150", dimension=1536, metric="euclidean", pod_type="p1")
index = pinecone.Index("pinecone-model-150")

llm = OpenAI(model="gpt-3.5-turbo", temperature=0, max_tokens=1024)
service_context = ServiceContext.from_defaults(llm=llm)
set_global_service_context(service_context)
memory = ChatMemoryBuffer.from_defaults(token_limit=2500)

vector_store = PineconeVectorStore(pinecone_index=index)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

document_list = create_documents(slice=100)
documents = [Document(text=course) for course in document_list]

# TODO: Update to get index from VectorStore
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)


chat_engine = index.as_chat_engine(
    chat_mode="context",
    memory=memory,
    system_prompt="You are an academic advisor for students at UW-Madison, understanding their needs and interests and recommending courses for them to take. Understand the student's query based on the data you have available and answer their questions.",
)


query = input("Enter query or type 'quit' to exit: ")
while query.lower() != "quit":
    response = chat_engine.stream_chat(query)
    for token in response.response_gen:
        print(token, end="")

    query = input("\nAsk a follow up or type 'quit' to exit: ")
