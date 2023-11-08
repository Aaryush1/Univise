import os
import json

API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

from chatbot import DARSModel

from llama_index import (
    Document,
    SimpleDirectoryReader,
    VectorStoreIndex,
    ServiceContext,
    set_global_service_context,
    StorageContext,
    load_index_from_storage,
)
from llama_index.node_parser import SimpleNodeParser
from llama_index.llms import OpenAI
from llama_index.memory import ChatMemoryBuffer
from llama_index.prompts import (
    ChatMessage,
    ChatPromptTemplate,
    MessageRole,
    PromptTemplate,
)

llm = OpenAI(model="gpt-3.5-turbo", temperature=0, max_tokens=1024)
service_context = ServiceContext.from_defaults(llm=llm)
set_global_service_context(service_context)
memory = ChatMemoryBuffer.from_defaults(token_limit=2500)

# TODO: Pinecone Vector Store
# index =
# index.storage_context.persist(persist_dir="./backend/persist")

storage_context = StorageContext.from_defaults(persist_dir="./persist")
index = load_index_from_storage(storage_context)

# TODO: Pass in index parameters
query_engine = index.as_chat_engine(
    chat_mode="context",
    memory=memory,
    system_prompt="You are an academic advisor for students at UW-Madison, understanding their needs and interests and recommending courses for them to take. Understand the student's query based on the data you have available and answer their questions.",
)

query = input("Enter query or type 'quit' to exit: ")
while query.lower() != "quit":
    response = query_engine.chat(query)
    print(response)
    query = input("\nAsk a follow up or type 'quit' to exit: ")
