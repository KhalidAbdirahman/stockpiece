import csv
import google.generativeai as genai
import json
import time  # To implement the waiting mechanism

# Configure the Gemini API
genai.configure(api_key='AIzaSyBgvGCupWUPSPQHElxpBA5wKxHJowmJY9Y')

# Setup for the generative model
generation_config = {
    "temperature": 2,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
)

# Read the CSV file
csv_file = 'ShanksVSKidd.csv'  # Path to your CSV file
comments = []

with open(csv_file, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        comment = row['text']
        comments.append({
            "text": comment
        })

# Function to process the comments in batches of 74
def process_comments_in_batches(comments, batch_size=74):
    total_comments = len(comments)
    current_batch = 0
    batch_count = (total_comments // batch_size) + (1 if total_comments % batch_size > 0 else 0)

    for i in range(0, total_comments, batch_size):
        batch = comments[i:i+batch_size]  # Slice the comments into batches
        current_batch += 1

        prompt = f"""
        For each comment below, analyze the sentiment towards each mentioned One Piece character. Sentiments should be categorized as either positive or negative based on the following rules:

        Positive Sentiment:
        - If the comment describes the character's actions or qualities without explicitly criticizing them, even if the actions are controversial or speculative, it should be considered positive. For example: “Blackbeard has been planning to take over the pirate world for so long” is positive because the character is mentioned in a non-negative light.
        - Descriptions of a character's plans, ambitions, or characteristics without negative wording should be counted as positive.

        Negative Sentiment:
        - If the comment explicitly criticizes the character, their actions, or motivations, it should be considered negative. For example: “Blackbeard is a coward who only fights when the odds are in his favor” is negative because it clearly criticizes the character.

        Return the results in JSON format with the following structure:

        [
          {{
            "comment_id": 1,
            "text": "The actual comment text here",
            "characters": [
              {{
                "name": "Character Name",
                "sentiment": "positive/negative",
                "score": decimal between -1 and 1
              }}
            ],
            "unrelated_or_bot": true/false
          }},
          ...
        ]

        Comments:
        {json.dumps(batch, indent=2)}
        """

        # Send the request to the API
        try:
            response = model.generate_content([prompt])
            output = response.text

            if not output.strip():
                print("Empty response from API!")
            else:
                try:
                    # Parse the response text as JSON
                    parsed_json = json.loads(output)

                    # Save the output to a JSON file
                    output_filename = f'sentiment_analysis_batch_{current_batch}.json'
                    with open(output_filename, 'w', encoding='utf-8') as outfile:
                        json.dump(parsed_json, outfile, ensure_ascii=False, indent=4)

                    print(f"Batch {current_batch} output saved to {output_filename}")

                except json.JSONDecodeError as e:
                    # Save the raw response to a separate JSON file if there's a decoding error
                    error_output_filename = f'sentiment_analysis_error_batch_{current_batch}.json'
                    with open(error_output_filename, 'w', encoding='utf-8') as errorfile:
                        errorfile.write(output)

                    print(f"Failed to decode JSON for batch {current_batch}: {e}")
                    print(f"Response saved to {error_output_filename}")

        except Exception as e:
            print(f"Error during API request for batch {current_batch}: {e}")

        # If there are more batches to process, wait for 60 seconds before sending the next one
        if current_batch < batch_count:
            print(f"Waiting 60 seconds before processing batch {current_batch + 1}...")
            time.sleep(60)

# Start processing comments in batches
process_comments_in_batches(comments)
