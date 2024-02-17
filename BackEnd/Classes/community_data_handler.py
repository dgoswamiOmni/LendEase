import json
from fastapi import HTTPException
from Utils.auth_utils import validate_jwt_token
from Utils.mongo_utils import MongoUtils

class CommunityHandler:
    def __init__(self, db):
        self.db = db

    async def push_communities(self, event):
        try:
            token = event.get('headers', {}).get('Authorization', '').split('Bearer ')[-1]
            decoded_token = validate_jwt_token(token)

            if decoded_token:

                # Perform additional authentication checks if needed based on the decoded token

                # Your logic to push communities to the database goes here
                # For example, assuming communities are in the event['body'] as a JSON string
                communities_data = json.loads(event['body'])

                # Insert new communities data into MongoDB
                # Use your actual MongoDB collection name and connection logic
                db = MongoUtils().connect_to_database()
                result = await db.communities.insert_one(communities_data)

                return {"message": "Communities data inserted successfully", "community_id": str(result.inserted_id)}
            else:
                return {'statusCode': 401, 'body': json.dumps({'message': 'Invalid or expired token'})}
        except Exception as e:
            # Log the exception
            print(f"Exception in push_communities: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}

    async def get_communities(self, event):
        try:
            token = event.get('headers', {}).get('Authorization', '').split('Bearer ')[-1]
            decoded_token = validate_jwt_token(token)

            if decoded_token:

                # Perform additional authentication checks if needed based on the decoded token

                # Your logic to retrieve communities from the database goes here
                # Use your actual MongoDB collection name and connection logic
                db = MongoUtils().connect_to_database()
                # Assuming communities are stored in a collection called 'communities'
                communities_data = await db.communities.find().to_list(length=None)

                return {"communities_data": communities_data}
            else:
                return {'statusCode': 401, 'body': json.dumps({'message': 'Invalid or expired token'})}

        except Exception as e:
            # Log the exception
            print(f"Exception in get_communities: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}
