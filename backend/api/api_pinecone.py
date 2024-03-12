from flask import Flask, jsonify, request
from flask_cors import CORS
import os

with open("./PINECONE_API_KEY.txt", "r") as f:
    k = f.read()
os.environ["PINECONE_API_KEY"] = k

with open("./OPENAI_API_KEY.txt", "r") as f:
    k = f.read()
os.environ["OPENAI_API_KEY"] = k

from llama_index.core import Settings, VectorStoreIndex
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.llms.openai import OpenAI
from llama_index.vector_stores.pinecone import PineconeVectorStore
from pinecone import Pinecone
import json

app = Flask(__name__)
CORS(app)
chat_engine = None
existing_models = ["model_150", "s24_clean"]
gpt_options = ["gpt-3.5-turbo", "gpt-3.5-turbo-1106", "gpt-4", "gpt-4-1106-preview"]


pc = Pinecone(os.environ["PINECONE_API_KEY"])


@app.route("/")
def index():
    return "Univise API is functional"


@app.route("/init/<string:model_name>/<string:GPT_model>", methods=["POST"])
def init_model(model_name, GPT_model):
    global chat_engine
    if model_name not in existing_models:
        return jsonify({"success": False, "error": "Model not found"})
    if GPT_model not in gpt_options:
        return jsonify({"success": False, "error": "GPT model not found"})

    llm = OpenAI(model=GPT_model, temperature=0, max_tokens=2048)
    Settings.llm = llm

    index_name = pc.Index(model_name.lower().replace("_", "-"))
    vector_store = PineconeVectorStore(index_name)
    memory = ChatMemoryBuffer.from_defaults(token_limit=4096)

    chat_engine = VectorStoreIndex.from_vector_store(vector_store).as_chat_engine(
        chat_mode="context",
        memory=memory,
        system_prompt="You are an academic advisor for students at UW-Madison, understanding their needs and interests and recommending courses for them to take. Understand the student's query based on the data you have available and answer their questions. Be sure to format your response using Markdown.",
    )

    with open(f"./data/{model_name}_subjects.json") as f:
        subjects = json.load(f)

    return jsonify(
        {
            "success": True,
            "model_name": model_name,
            "GPT_model": GPT_model,
            "known_subjects": subjects,
        }
    )


@app.route("/get_response_stream", methods=["GET"])
def get_response_stream():
    global chat_engine
    query = request.args.get("query")
    response_stream = chat_engine.stream_chat(query)

    def read_stream():
        for response in response_stream.response_gen:
            yield response

    return app.response_class(read_stream(), mimetype="text/plain")


@app.route("/get_response", methods=["GET"])
def get_response():
    global chat_engine
    query = request.args.get("query")
    response = chat_engine.chat(query)
    return jsonify({"response": str(response)})


if __name__ == "__main__":
    app.run()
