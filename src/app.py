import os
import pandas as pd
from textblob import TextBlob
import json
from flask import Flask, request, jsonify
from flask_cors import CORS


from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI



app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Absolute path to the CSV file
<<<<<<< HEAD
csv_path = r'C:\Users\ridhi\OneDrive\Documents\Desktop\Psephology ORIGINAL\pllm\public\test.csv'
=======
csv_path = r'C:\Users\jammu\OneDrive\PROJECT-SCHOOL\FinalPro\PshelogistLLM\pllm\public\LokSabha_Election_2024_Tweets updated.csv'
>>>>>>> 376b05cfe85305b10af04a3a4a5de1abb947aec1

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
    json_string = json.dumps(data, indent=4)

    # Save the JSON string to a file
<<<<<<< HEAD
    json_path = r'C:\Users\ridhi\OneDrive\Documents\Desktop\Psephology ORIGINAL\pllm\src\sentiment_analysis_results.json'
=======
    json_path = r'C:\Users\jammu\OneDrive\PROJECT-SCHOOL\FinalPro\PshelogistLLM\pllm\src\sentiment_analysis_results.json'
>>>>>>> 376b05cfe85305b10af04a3a4a5de1abb947aec1
    try:
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
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
    # df.to_csv(csv_path, index=False)

    # Update sentiments after adding new tweets
    update_sentiments()

@app.route('/add_tweets', methods=['POST'])
def add_tweets_endpoint():
    if not request.json or 'tweets' not in request.json:
        return jsonify({'error': 'No tweets provided'}), 400

    new_tweets = request.json['tweets']

    # Check for relevant party mentions
    relevant_tweets = [tweet for tweet in new_tweets if any(party.lower() in tweet.lower() for party in parties)]
    if not relevant_tweets:
        return jsonify({'error': 'Only election party tweets are accepted. Please submit tweets related to election parties.'}), 400

    add_tweets(relevant_tweets)
    return jsonify({'message': 'Tweets added successfully'}), 200

@app.route('/get_sentiment_data', methods=['GET'])
def get_sentiment_data():
<<<<<<< HEAD
    json_path = r'C:\Users\ridhi\OneDrive\Documents\Desktop\Psephology ORIGINAL\pllm\src\sentiment_analysis_results.json'
=======
    json_path = r'C:\Users\jammu\OneDrive\PROJECT-SCHOOL\FinalPro\PshelogistLLM\pllm\src\sentiment_analysis_results.json'
>>>>>>> 376b05cfe85305b10af04a3a4a5de1abb947aec1
    if os.path.exists(json_path):
        try:
            with open(json_path, 'r') as f:
                data = json.load(f)
            return jsonify(data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify([]), 404

<<<<<<< HEAD
def clear_sentiment_data():
    json_path = r'C:\Users\ridhi\OneDrive\Documents\Desktop\Psephology ORIGINAL\pllm\src\sentiment_analysis_results.json'
    try:
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        with open(json_path, 'w') as f:
            f.write('[]')
        print(f"Sentiment data cleared in {json_path}.")
    except Exception as e:
        print(f"Error clearing sentiment data: {str(e)}")
=======











# CORS(app)
# app.config['UPLOAD_FOLDER'] = 'uploads'
# app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# key = "AIzaSyBEShS6L-BvBx0WZ78vg_qTO_aQ3z3pwlQ"
# llm = ChatGoogleGenerativeAI(model="gemini-pro-vision", google_api_key=key)

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# @app.route('/upload', methods=['POST'])
# def upload_image():
#     print("hello*******")
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     if file and allowed_file(file.filename):
#         filename = file.filename
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)

#         image_url = filepath

#         message = HumanMessage(
#             content=[
#                 {
#                     "type": "text",
#                     # "text": "describe the name of the political party shown in the image,describe in detail about the party like the founder,ruled years in government",
                
#                     "text":"Please provide the following detailed information about the political party shown in the image:Party NameFounderYear of EstablishmentYears in PowerNumber of Sitting Legislative MembersNumber of Parliamentary MembersPopular Schemes ImplementedCurrent Ministers from the PartyEnsure the information is well-organized with appropriate headings and subheadings."                
#                 },
#                 {"type": "image_url", "image_url": image_url},
#             ]
#         )
#         result = llm.invoke([message])
#         return jsonify({'result': result.content})

#     return jsonify({'error': 'File not allowed'}), 400






CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

key = "AIzaSyBEShS6L-BvBx0WZ78vg_qTO_aQ3z3pwlQ"
llm = ChatGoogleGenerativeAI(model="gemini-pro-vision", google_api_key=key)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/upload', methods=['POST'])
def upload_image():
    print("hllo*********")
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            filename = file.filename
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            image_url = filepath

            message = HumanMessage(
                content=[
                    {
                        "type": "text",
                        # "text": "Please provide the following detailed information about the political party shown in the image: Party Name, Founder, Year of Establishment, Years in Power, Number of Sitting Legislative Members, Number of Parliamentary Members, Popular Schemes Implemented, Current Ministers from the Party. Ensure the information is well-organized with appropriate headings and subheadings.If the image does not contain any information about the Indian political parties return It is not a political party in India"
                        "text":"Please extract and provide comprehensive details about the political party depicted in the image, including: Party Name, Founder, Year of Establishment, Years in Power, Number of Sitting Legislative Members, Number of Parliamentary Members, Popular Schemes Implemented, and Current Ministers from the Party. Ensure the information is well-organized with clear headings and subheadings for each section. If the provided image does not contain information related to  political parties and if the party doesnot belongs to india then output should be Not a indian party, output: 'It is not an Indian political party."






                    },
                    {"type": "image_url", "image_url": image_url},
                ]
            )
            result = llm.invoke([message])

            # Format result into a structured list
            output_list = result.content.strip().split('\n')

            return jsonify({'result': output_list})

        except Exception as e:
            print(f"Error processing file: {e}")
            return jsonify({'error': 'Error processing file'}), 500

    return jsonify({'error': 'File format not supported'}), 400





>>>>>>> 376b05cfe85305b10af04a3a4a5de1abb947aec1

if __name__ == '__main__':
    clear_sentiment_data()  # Clear the sentiment data when the server starts
    app.run(debug=True, host='0.0.0.0', port=5000)
