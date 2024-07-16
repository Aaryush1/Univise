#!/usr/bin/env python3
# rag_pipeline.py

import json
import os
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import cohere
from openai import OpenAI
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Configuration
COHERE_API_KEY = "your key"
OPENAI_API_KEY = "your key"
client = OpenAI(api_key=OPENAI_API_KEY)

EMBEDDINGS_CACHE_FILE = "embeddings_cache.pkl"
JSON_FILE = "data/s24_clean_with_grades.json"

# 1. Data Preprocessing
def preprocess_data(json_file):
    logging.info(f"Preprocessing data from {json_file}")
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    chunks = []
    for item in data:
        for course, details in item.items():
            chunk = f"Course: {course}\n"
            chunk += f"Name: {details['courseName']}\n"
            chunk += f"Title: {details['title']}\n"
            chunk += f"Description: {details['description']}\n"
            chunk += f"School: {details['school']}\n"
            chunk += f"Credits: {details['credits']}\n"
            chunks.append(chunk)
    
    logging.info(f"Preprocessed {len(chunks)} chunks")
    return chunks

# 2. Indexing
class Indexer:
    def __init__(self, chunks):
        logging.info("Initializing Indexer")
        self.chunks = chunks
        self.tfidf_vectorizer = TfidfVectorizer()
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(chunks)
        self.embeddings = self.load_or_create_embeddings(chunks)

    def load_or_create_embeddings(self, chunks):
        if os.path.exists(EMBEDDINGS_CACHE_FILE):
            logging.info("Loading embeddings from cache")
            with open(EMBEDDINGS_CACHE_FILE, 'rb') as f:
                cached_data = pickle.load(f)
            if cached_data['chunks'] == chunks:
                return cached_data['embeddings']
            else:
                logging.info("Cached chunks don't match current chunks. Recalculating embeddings.")

        logging.info("Calculating new embeddings")
        embeddings = self.get_openai_embeddings(chunks)
        self.save_embeddings(chunks, embeddings)
        return embeddings

    def save_embeddings(self, chunks, embeddings):
        logging.info("Saving embeddings to cache")
        with open(EMBEDDINGS_CACHE_FILE, 'wb') as f:
            pickle.dump({'chunks': chunks, 'embeddings': embeddings}, f)

    def get_openai_embeddings(self, texts):
        logging.info("Getting OpenAI embeddings")
        embeddings = []
        for i in range(0, len(texts), 100):  # Process in batches of 100
            batch = texts[i:i+100]
            response = client.embeddings.create(input=batch, model="text-embedding-ada-002")
            embeddings.extend([item.embedding for item in response.data])
        return np.array(embeddings)

    def bm25_search(self, query, top_k=10):
        logging.info(f"Performing BM25 search for query: {query}")
        query_vec = self.tfidf_vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.tfidf_matrix)[0]
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [(i, scores[i]) for i in top_indices]

    def knn_search(self, query, top_k=10):
        logging.info(f"Performing KNN search for query: {query}")
        query_embedding = self.get_openai_embeddings([query])[0]
        scores = np.dot(self.embeddings, query_embedding)
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [(i, scores[i]) for i in top_indices]

# 3. Retrieval
def reciprocal_rank_fusion(rankings, k=60):
    logging.info("Performing reciprocal rank fusion")
    fused_scores = {}
    for ranking in rankings:
        for rank, (doc_id, score) in enumerate(ranking):
            if doc_id not in fused_scores:
                fused_scores[doc_id] = 0
            fused_scores[doc_id] += 1 / (rank + k)
    return sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)

# 4. Rerank
def rerank(query, chunks, rankings, top_k=5):
    logging.info(f"Reranking for query: {query}")
    co = cohere.Client(COHERE_API_KEY)
    docs = [chunks[doc_id] for doc_id, _ in rankings[:top_k]]
    doc_ids = [doc_id for doc_id, _ in rankings[:top_k]]

    # Log the documents being sent to Cohere
    for i, doc in enumerate(docs):
        logging.info(f"Document {i}: {doc[:100]}...")  # Log first 100 chars of each document

    try:
        logging.info("Sending rerank request to Cohere API")
        results = co.rerank(
            model='rerank-english-v3.0',
            query=query,
            documents=docs,
            top_n=top_k
        )
        
        logging.info(f"Received rerank results. Number of results: {len(results.results)}")
        
        reranked = []
        for i, result in enumerate(results.results):
            logging.info(f"Processing result {i}: index={result.index}, relevance_score={result.relevance_score}")
            if result.index is not None and 0 <= result.index < len(doc_ids):
                reranked.append((doc_ids[result.index], result.relevance_score))
            else:
                logging.warning(f"Invalid index {result.index} for result {i}")
        
        logging.info(f"Reranking complete. Reranked results: {reranked}")
        return reranked
    except Exception as e:
        logging.exception(f"Error in reranking: {str(e)}")
        return [(doc_id, score) for doc_id, score in rankings[:top_k]]
    
# 5. Context Assembly
def assemble_context(chunks, rankings, max_tokens=3000):
    logging.info("Assembling context")
    context = ""
    for doc_id, _ in rankings:
        chunk = chunks[doc_id]
        logging.info(f"Adding chunk for doc_id {doc_id}: {chunk[:100]}...")  # Log first 100 chars of each chunk
        if len(context) + len(chunk) > max_tokens:
            break
        context += chunk + "\n\n"
    logging.info(f"Assembled context (first 200 chars): {context[:200]}...")
    return context.strip()

# 6. Generation
def generate_response(query, context):
    logging.info("Generating response")
    system_message = """You are an AI assistant for a university course information system. Your role is to provide accurate and helpful information about courses based on the given context. Follow these guidelines:
    1. Answer the user's question using only the information provided in the context.
    2. If the context doesn't contain enough information to fully answer the question, say so and provide what information you can.
    3. Use a friendly, professional tone appropriate for a university setting.
    4. If asked about course recommendations, consider factors like course level, prerequisites, and relevance to the student's interests.
    5. Provide course codes and full course names when referencing specific courses.
    6. If relevant, mention key details such as credits, instructors, or course format (e.g., lecture, lab, seminar).
    7. Do not make up or assume information that isn't in the provided context.
    8. If the user asks about multiple courses or topics, address each part of their query.
    9. If appropriate, suggest related courses or areas of study based on the user's query and the available context.
    10. Keep your response concise and to the point, typically within 3-5 sentences unless more detail is necessary.

    Remember, your goal is to help students make informed decisions about their course selections."""

    user_message = f"""Context:
{context}

Question: {query}

    Please provide a response based on the above context and question, following the guidelines in your instructions."""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ]
    )
    return response.choices[0].message.content

# Query Preprocessing
def preprocess_query(query):
    logging.info(f"Preprocessing query: {query}")
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": """You are an AI assistant designed to optimize search queries for a course discovery system at UW-Madison. Your task is to transform user queries into more effective search terms that will yield relevant course information. Focus on the following:

             1. Identify key academic concepts, fields of study, or skills mentioned in the query.
             2. Include relevant course subject codes (e.g., CS for Computer Science, MATH for Mathematics) if applicable.
             3. Specify academic levels (e.g., introductory, advanced, graduate) if implied in the query.
             4. Add synonyms or related terms that might be used in course descriptions.
             5. Remove conversational language and focus on keywords and phrases.
             6. Limit the refined query to 2-3 short, concise sentences or phrases.
             
             Your goal is to create a query that will work well with keyword-based and semantic search algorithms."""},
            {"role": "user", "content": f"Original query: {query}\n\nPlease provide an optimized search query:"}
        ]
    )
    preprocessed_query = response.choices[0].message.content.strip()
    logging.info(f"Preprocessed query: {preprocessed_query}")
    return preprocessed_query

# Main RAG Pipeline
def rag_pipeline(query, indexer):
    logging.info(f"Starting RAG pipeline for query: {query}")
    
    # Preprocess query
    preprocessed_query = preprocess_query(query)
    
    # Perform searches
    bm25_results = indexer.bm25_search(preprocessed_query)
    knn_results = indexer.knn_search(preprocessed_query)
    
    # Fuse rankings
    fused_rankings = reciprocal_rank_fusion([bm25_results, knn_results])
    logging.info(f"Fused rankings: {fused_rankings[:5]}...")
    
    # Rerank
    try:
        reranked = rerank(preprocessed_query, indexer.chunks, fused_rankings)
        if not reranked:
            logging.warning("Reranking returned empty results. Falling back to fused rankings.")
            reranked = fused_rankings
    except Exception as e:
        logging.error(f"Reranking failed: {str(e)}. Falling back to fused rankings.")
        reranked = fused_rankings
    
    logging.info(f"Final rankings: {reranked[:5]}")
    
    # Assemble context
    context = assemble_context(indexer.chunks, reranked)
    
    # Generate response
    response = generate_response(preprocessed_query, context)
    logging.info("Generated response")
    
    return preprocessed_query, response

def main():
    print("Welcome to the Course Information System!")
    print("Ask questions about courses and their details.")
    print("Type 'exit' to quit the program.")
    
    # Initialize the indexer once
    chunks = preprocess_data(JSON_FILE)
    indexer = Indexer(chunks)
    
    while True:
        query = input("\nYour question: ")
        if query.lower() == 'exit':
            print("Thank you for using the Course Information System. Goodbye!")
            break
        
        try:
            preprocessed_query, response = rag_pipeline(query, indexer)
            print(f"\nPreprocessed Query: {preprocessed_query}")
            print(f"\nResponse: {response}")
        except Exception as e:
            logging.exception(f"An error occurred: {str(e)}")
            print("An error occurred while processing your question. Please try again or rephrase your question.")

if __name__ == "__main__":
    main()