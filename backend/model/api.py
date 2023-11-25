import os
import flask

API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

from llama_index import (
    ServiceContext,
    set_global_service_context,
    StorageContext,
    load_index_from_storage,
)
from llama_index.node_parser import SimpleNodeParser
from llama_index.llms import OpenAI
from llama_index.memory import ChatMemoryBuffer

chat_engine = None

# TODO: Generate as API


def init_model(model_name="model_150", GPT_model="gpt-3.5-turbo"):
    global chat_engine
    llm = OpenAI(model=GPT_model, temperature=0, max_tokens=512)
    service_context = ServiceContext.from_defaults(llm=llm)
    set_global_service_context(service_context)
    memory = ChatMemoryBuffer.from_defaults(token_limit=2500)
    storage_context = StorageContext.from_defaults(
        persist_dir=f"./{model_name}_persist"
    )
    index = load_index_from_storage(storage_context)
    chat_engine = index.as_chat_engine(
        chat_mode="context",
        memory=memory,
        system_prompt="You are an academic advisor for students at UW-Madison, understanding their needs and interests and recommending courses for them to take. Understand the student's query based on the data you have available and answer their questions.",
    )


def get_response_stream(query):
    global chat_engine
    response = chat_engine.stream_chat(query)
    return response.response_gen


def get_response(query):
    global chat_engine
    response = chat_engine.chat(query)
    return response.response


# TODO: Index model?
