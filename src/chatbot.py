from flask import Flask, request, jsonify
from flask_cors import CORS
import rag  # Replace with your actual script name

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in your Flask app

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    print("Received request at /api/chatbot")
    data = request.get_json()
    query = data['query']
    print(f"Received query: {query}")
    response = rag.generate_response(query)
    print(f"Generated response: {response}")
    return jsonify(response=response)

@app.route("/", methods=['GET'])
def hello():
    return jsonify({"message" : 'Hello'})

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
