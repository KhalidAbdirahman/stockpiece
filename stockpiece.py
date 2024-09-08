import firebase_admin
from firebase_admin import credentials, firestore
import googleapiclient.discovery
import pandas as pd

# Path to the Firebase Admin SDK JSON key (replace with your own key file path)
cred = credentials.Certificate("./firebase/firebase-adminsdk-key.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# YouTube API setup
dev = "AIzaSyDO3A8s0tnHPQmNMqvl0BeIRoe9ZMnphHE"
api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = dev

youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=DEVELOPER_KEY)

# Function to scrape YouTube comments for a video and store them in Firestore
def get_comments(video):
    # Initial API request
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video,
        maxResults=100
    )

    comments = []

    # Execute the request
    response = request.execute()

    # Process the first page of comments
    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']
        public = item['snippet']['isPublic']
        comment_data = {
            'author': comment['authorDisplayName'],
            'published_at': comment['publishedAt'],
            'like_count': comment['likeCount'],
            'text': comment['textOriginal'],
            'video_id': video,
            'public': public
        }
        comments.append(comment_data)

    # Store comments in Firestore using a batch write for efficiency
    batch_write_to_firestore(comments)

    # Handle pagination to get more comments if needed
    while 'nextPageToken' in response:
        nextPageToken = response['nextPageToken']
        request = youtube.commentThreads().list(
            part="snippet",
            videoId=video,
            maxResults=100,
            pageToken=nextPageToken
        )
        response = request.execute()

        for item in response['items']:
            comment = item['snippet']['topLevelComment']['snippet']
            public = item['snippet']['isPublic']
            comment_data = {
                'author': comment['authorDisplayName'],
                'published_at': comment['publishedAt'],
                'like_count': comment['likeCount'],
                'text': comment['textOriginal'],
                'video_id': video,
                'public': public
            }
            comments.append(comment_data)

        # Batch write the next page of comments to Firestore
        batch_write_to_firestore(comments)

    # Optionally convert to a DataFrame for further analysis
    df2 = pd.DataFrame(comments)
    return df2

# Function to batch write comments to Firestore
def batch_write_to_firestore(comments):
    batch = db.batch()
    for comment_data in comments:
        doc_ref = db.collection('youtube_comments').document()  # Auto-generate document ID
        batch.set(doc_ref, comment_data)
    
    # Commit the batch write
    batch.commit()

# Example usage: Fetch comments from multiple YouTube videos
videos = ['qI6Rj6VochM', 'XLtXEENlFBM', 'n-8k_ig0fiU']

for video in videos:
    get_comments(video)

print("Comments scraped and saved to Firebase Firestore.")
