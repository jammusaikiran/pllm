import os
import pandas as pd
from textblob import TextBlob
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Absolute path to the CSV file
csv_path = r'C:\Users\jammu\OneDrive\PROJECT-SCHOOL\FinalPro\PshelogistLLM\pllm\public\LokSabha_Election_2024_Tweets updated.csv'

# Check if the CSV file exists
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"CSV file not found at path: {csv_path}")

# Load the dataset
df = pd.read_csv(csv_path)

def get_sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'

df['sentiment'] = df['text'].fillna('').apply(get_sentiment)

def get_party_sentiment(party):
    party_df = df[df['text'].str.contains(party, case=False, na=False)]
    sentiment_counts = party_df['sentiment'].value_counts()
    return sentiment_counts.to_dict()

parties = ['BJP', 'Congress', 'AAP', 'TMC', 'SP', 'BSP', 'ShivSena', 'NCP', 'RJD', 'JD(U)']

def update_sentiments():
    party_sentiments = {party: get_party_sentiment(party) for party in parties}

    # Prepare data for JSON conversion
    data = []
    for party in parties:
        sentiment_counts = party_sentiments[party]
        data.append({
            "name": party,
            "positive": sentiment_counts.get("positive", 0),
            "neutral": sentiment_counts.get("neutral", 0),
            "negative": sentiment_counts.get("negative", 0)
        })

    # Convert to JSON string
    json_string = json.dumps(data)

    # Save the JSON string to a file
    json_path = r'C:\Users\ridhi\OneDrive\Documents\Desktop\Dummy\model\src\sentiment_analysis_results.json'
    try:
        with open(json_path, 'w') as f:
            f.write(json_string)
        print(f"Sentiment analysis completed. Results saved to {json_path}.")
    except Exception as e:
        print(f"Error saving sentiment analysis results: {str(e)}")

def add_tweets(new_tweets):
    global df
    new_df = pd.DataFrame(new_tweets, columns=['text'])
    new_df['sentiment'] = new_df['text'].fillna('').apply(get_sentiment)
    df = pd.concat([df, new_df], ignore_index=True)

    # Save the updated DataFrame to CSV
    df.to_csv(csv_path, index=False)

    # Update sentiments after adding new tweets
    update_sentiments()

@app.route('/add_tweets', methods=['POST'])
def add_tweets_endpoint():
    if not request.json or 'tweets' not in request.json:
        return jsonify({'error': 'No tweets provided'}), 400
    
    new_tweets = request.json['tweets']
    add_tweets(new_tweets)
    return jsonify({'message': 'Tweets added successfully'}), 200

@app.route('/get_sentiment_data', methods=['GET'])
def get_sentiment_data():
    json_path = r'C:\Users\jammu\OneDrive\PROJECT-SCHOOL\FinalPro\PshelogistLLM\pllm\src\sentiment_analysis_results.json'
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    else:
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
