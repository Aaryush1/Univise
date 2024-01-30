from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from llama_index import (
    ServiceContext,
    set_global_service_context,
    StorageContext,
    load_index_from_storage,
)
from llama_index.llms import OpenAI
from llama_index.memory import ChatMemoryBuffer
import json

# TODO: Parallelize this
# TODO: Add authentication for API usage


app = Flask(__name__)
CORS(app)
chat_engine = None
existing_models = ["model_150", "s24_clean"]
gpt_options = ["gpt-3.5-turbo", "gpt-3.5-turbo-1106", "gpt-4", "gpt-4-1106-preview"]


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
    service_context = ServiceContext.from_defaults(llm=llm)
    set_global_service_context(service_context)
    memory = ChatMemoryBuffer.from_defaults(token_limit=4096)
    storage_context = StorageContext.from_defaults(
        persist_dir=f"./models/{model_name}_persist"
    )
    index = load_index_from_storage(storage_context)
    chat_engine = index.as_chat_engine(
        chat_mode="context",
        memory=memory,
        system_prompt="You are an academic advisor for students at UW-Madison, understanding their needs and interests and recommending courses for them to take. Understand the student's query based on the data you have available and answer their questions.",
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
    response = str(chat_engine.chat(query))
    return response


if __name__ == "__main__":
    app.run()
