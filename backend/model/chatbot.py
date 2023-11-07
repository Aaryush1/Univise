import os
import json

API_KEY = ""
with open("../OPENAI_API_KEY.txt", "r") as f:
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
from llama_index.prompts import (
    ChatMessage,
    ChatPromptTemplate,
    MessageRole,
    PromptTemplate,
)


class DARSModel:
    def __init__(
        self,
        model="gpt-3.5-turbo",
        temperature=0,
        max_tokens=512,
        memory_limit=2500,
        data_dir="../data",
        json_data=True,
        create_index=True,
    ):
        self.llm = OpenAI(model=model, temperature=temperature, max_tokens=max_tokens)
        self.service_context = ServiceContext.from_defaults(llm=self.llm)
        set_global_service_context(self.service_context)
        self.data_dir = data_dir
        self.template = (
            "Below is the information about the courses relavent to the student's query. \n"
            "---------------------\n"
            "{context_str}"
            "\n---------------------\n"
            "Given this information, please answer in a way that the student can gain a deeper understanding about their query: {query_str}\n"
        )
        memory = ChatMemoryBuffer.from_defaults(token_limit=memory_limit)

        nodes = self.create_nodes(json_data)

        if create_index:
            self.create_index(nodes)

        self.get_index()

        self.create_query_engine(chat_mode="context", memory=memory)

    def create_index(self, nodes):
        self.index = VectorStoreIndex(nodes, show_progress=True)
        self.index.storage_context.persist(persist_dir="./persist")

    def get_index(self):
        self.storage_context = StorageContext.from_defaults(persist_dir=self.data_dir)
        self.index = load_index_from_storage(self.storage_context)

    def create_documents(self, json_data=True):
        if json_data:
            all_data = []
            for filename in os.listdir(self.data_dir):
                if filename.endswith(".json"):
                    with open(os.path.join(self.data_dir, filename), "r") as f:
                        data = json.load(f)
                        all_data.append(data)
            return [Document(text=json.dumps(data)) for data in all_data]

        return SimpleDirectoryReader(self.data_dir).load_data()

    def create_nodes(self, json_data=True):
        documents = self.create_documents(self.data_dir, json_data)
        parser = SimpleNodeParser.from_defaults()
        return parser.get_nodes_from_documents(documents)

    def create_query_engine(self, chat_mode, memory, system_prompt):
        self.query_engine = self.index.as_chat_engine(
            chat_mode=chat_mode,
            memory=memory,
            system_prompt=system_prompt,
        )

    def chat(self):
        query = input("Enter query or type 'quit' to exit: ")
        while query.lower() != "quit":
            response = self.query_engine.chat(query)
            print(response)
