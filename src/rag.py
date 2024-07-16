import warnings
import os
from pprint import pprint

import pymongo
from sentence_transformers import SentenceTransformer
from langchain_google_genai import ChatGoogleGenerativeAI
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

warnings.filterwarnings("ignore")

client = pymongo.MongoClient("mongodb+srv://jljohnnicholas:pllm@cluster0.jgprxjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.wikipedia_chunks
collection = db.chunks

emodel = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def generate_embedding(text: str) -> list[float]:
    embedding = emodel.encode(text)
    return embedding.tolist()

def search_query_in_mongodb(query: str) -> str:
    query_vector = generate_embedding(query)

    results = collection.aggregate([
        {"$vectorSearch": {
            "queryVector": query_vector,
            "path": "content_embedding",
            "numCandidates": 100,
            "limit": 10,
            "index": "ChunksSemanticSearch",
        }}
    ])

    context = ""

    for document in results:
        context += document["content"]

    return context

os.environ["GOOGLE_API_KEY"] = "AIzaSyAGR3x6CU4459UogVvYMYxLOuTrUKG2_uU"

def generate_response(query: str) -> str:
    context = search_query_in_mongodb(query)
    # print(context)
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )

    messages = [
        (
            "system",
            "You are a helpful assistant that answers queries related to Indian Politics/ Psephology. If the query is not related to the mentioned topics then politely refuse to answer. Use the context provided to answer the query and also your own knowledge. Keep the answer brief.",
        ),
        ("human", f"Query: {query}. Context: {context}"),
    ]

    ai_msg = llm.invoke(messages)
    return ai_msg.content