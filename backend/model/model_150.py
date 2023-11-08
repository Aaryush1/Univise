import os
from embeddings import create_documents

API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

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


llm = OpenAI(model="gpt-3.5-turbo", temperature=0, max_tokens=512)
service_context = ServiceContext.from_defaults(llm=llm)
set_global_service_context(service_context)
memory = ChatMemoryBuffer.from_defaults(token_limit=2500)

# TODO: Figure out how to wrap chat in template
template = (
    "Below is the information about the courses relavent to the student's query. \n"
    "---------------------\n"
    "{context_str}"
    "\n---------------------\n"
    "Given this information, please answer in a way that the student can gain a deeper understanding about their query: {query_str}\n"
)

document_list = create_documents(slice=100)

documents = [Document(text=course) for course in document_list]
parser = SimpleNodeParser.from_defaults()
nodes = parser.get_nodes_from_documents(documents)


# index = VectorStoreIndex(nodes, show_progress=True)
# index.storage_context.persist(persist_dir="./model_150_persist")

storage_context = StorageContext.from_defaults(persist_dir="./model_150_persist")
index = load_index_from_storage(storage_context)

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
