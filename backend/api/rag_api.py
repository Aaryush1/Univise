from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_pipeline import JSON_FILE, Indexer, preprocess_data, rag_pipeline
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # This allows all origins

# Initialize the indexer once when the server starts
chunks = preprocess_data(JSON_FILE)
indexer = Indexer(chunks)

# Set API keys
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
os.environ['COHERE_API_KEY'] = os.getenv('COHERE_API_KEY')

@app.route('/rag', methods=['POST'])
def run_rag():
    print("Received request to /rag endpoint")
    data = request.get_json(force=True)
    query = data.get('query')
    print(f"Received query: {query}")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    try:
        preprocessed_query, response = rag_pipeline(query, indexer)
        print(f"Preprocessed query: {preprocessed_query}")
        print(f"Response: {response}")
        return jsonify({"preprocessed_query": preprocessed_query, "response": response})
    except Exception as e:
        print(f"Error in rag_pipeline: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Flask server is running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)