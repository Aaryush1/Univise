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
from llama_index.core.base.llms.types import ChatMessage, MessageRole
from llama_index.core.prompts.base import ChatPromptTemplate
from pinecone import Pinecone
import json

app = Flask(__name__)
CORS(app)
chat_engine = None
existing_models = ["model_150", "s24_clean", "s25_clean"]
gpt_options = [
    "gpt-3.5-turbo",
    "gpt-4-turbo-preview",
]


pc = Pinecone(os.environ["PINECONE_API_KEY"])

TEXT_QA_SYSTEM_PROMPT = ChatMessage(
    content=(),
    role=MessageRole.SYSTEM,
)

TEXT_QA_PROMPT_TMPL_MSGS = [
    TEXT_QA_SYSTEM_PROMPT,
    ChatMessage(
        content=(),
        role=MessageRole.USER,
    ),
]

SYSTEM_PROMPT = ChatMessage(
    content=(
        "You are an AI-powered course discovery assistant for students at UW-Madison.\n"
        "Your primary goal is to help students explore and identify courses that align with their interests, preferences, and academic goals.\n"
        "When responding to student queries, use the provided context information from the UW-Madison course database, along with the student's preferences and interests, to offer tailored advice.\n"
        "If the query cannot be answered using the available information, gently explain that you don't have sufficient data to provide a complete answer.\n"
        "When discussing specific classes, provide detailed information about the course content, structure, and relevance to the student's interests. Always prioritize the student's needs and preferences when making recommendations.\n"
        "Adhere to the following guidelines:\n"
        "1. When recommending class options, suggest multiple relevant examples and ensure they fit the student's interests and academic background.\n"
        "2. Prioritize the student's needs, goals, and interests throughout the interaction.\n"
        "3. ALWAYS use the specific course information provided to you when giving resposnes.\n"
        "4. ALWAYS check prerequisites to ensure the student meets the requirements for recommended classes.\n"
        "5. ALWAYS format your responses using Markdown syntax for improved readability, including new lines where it makes sense.\n"
        "Remember, your role is to empower students to make informed decisions about their coursework by providing personalized insights and guidance based on their unique preferences and the available course information."
    ),
    role=MessageRole.SYSTEM,
)

PROMPT_TMPL_MSGS = [
    SYSTEM_PROMPT,
    ChatMessage(
        content=(
            "Course information from the UW-Madison database:\n"
            "---------------------\n"
            "{context_str}\n"
            "---------------------\n"
            "Given this and prior context information and the student's preferences and interests, provide a personalized answer to the query.\n"
            "If you don't have enough information to answer the query completely, explain what additional information would be helpful.\n"
            "Query: {query_str}\n"
            "Answer: "
        ),
        role=MessageRole.USER,
    ),
]

CHAT_TEXT_QA_PROMPT = ChatPromptTemplate(message_templates=PROMPT_TMPL_MSGS)


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

    llm = OpenAI(model=GPT_model, temperature=0, max_tokens=4096)
    Settings.llm = llm

    index_name = pc.Index(model_name.lower().replace("_", "-"))
    vector_store = PineconeVectorStore(index_name)
    memory = ChatMemoryBuffer.from_defaults(token_limit=50000)

    chat_engine = VectorStoreIndex.from_vector_store(vector_store).as_chat_engine(
        chat_mode="context",
        memory=memory,
        prompt_template=CHAT_TEXT_QA_PROMPT,
        system_prompt=(SYSTEM_PROMPT),
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
